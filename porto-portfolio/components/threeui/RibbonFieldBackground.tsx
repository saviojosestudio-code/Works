"use client";

import { useEffect, useRef } from "react";
import { RIBBON_FIELD_FRAGMENT_SHADER, RIBBON_FIELD_VERTEX_SHADER } from "./ribbonFieldShaders";

export type RibbonFieldBackgroundProps = {
  speed?: number;
  pointerAmount?: number;
  smoothing?: number;
  brightness?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  className?: string;
};

export const RIBBON_FIELD_DEFAULTS = {
  speed: 1,
  pointerAmount: 1,
  smoothing: 0.035,
  brightness: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
} as const;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create Axiom shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Axiom shader compilation failed");
  }
  return shader;
}

/** Returns the effective device pixel ratio, capped to 1 on narrow mobile screens to halve GPU fill-rate. */
function effectiveDPR(): number {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
}

export function RibbonFieldBackground({ className = "", ...props }: RibbonFieldBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...RIBBON_FIELD_DEFAULTS, ...props });
  optionsRef.current = { ...RIBBON_FIELD_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    // Respect prefers-reduced-motion: skip WebGL animation when reduced motion is enabled.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    // Fragment shader always writes opaque alpha (1.0), so disable alpha/depth/stencil
    // buffers to cut GPU bandwidth and prevent backdrop-filter readback flicker during scroll.
    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    });
    if (!gl) return undefined;

    let vertex: WebGLShader | null = null;
    let fragment: WebGLShader | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let resolution: WebGLUniformLocation | null = null;
    let time: WebGLUniformLocation | null = null;
    let pointerUniform: WebGLUniformLocation | null = null;
    let contextLost = false;

    const initPipeline = () => {
      vertex = compile(gl, gl.VERTEX_SHADER, RIBBON_FIELD_VERTEX_SHADER);
      fragment = compile(gl, gl.FRAGMENT_SHADER, RIBBON_FIELD_FRAGMENT_SHADER);
      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? "Axiom program link failed");
      }
      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );
      const position = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      resolution = gl.getUniformLocation(program, "resolution");
      time = gl.getUniformLocation(program, "time");
      pointerUniform = gl.getUniformLocation(program, "pointer");
      return true;
    };

    if (!initPipeline()) return undefined;

    let mouseX = 0.72;
    let mouseY = 0.42;
    let targetX = 0.72;
    let targetY = 0.42;
    let frame = 0;
    let visible = true;
    let lastFrameTime = 0;

    // Throttle to ~20fps when battery is critically low (<=15% and discharging).
    let isLowBattery = false;
    let batteryCleanup: (() => void) | undefined;
    if ("getBattery" in navigator) {
      (
        navigator as Navigator & {
          getBattery(): Promise<{
            level: number;
            charging: boolean;
            addEventListener: (e: string, cb: () => void) => void;
            removeEventListener: (e: string, cb: () => void) => void;
          }>;
        }
      )
        .getBattery()
        .then((battery) => {
          const update = () => {
            isLowBattery = !battery.charging && battery.level <= 0.15;
          };
          update();
          battery.addEventListener("levelchange", update);
          battery.addEventListener("chargingchange", update);
          batteryCleanup = () => {
            battery.removeEventListener("levelchange", update);
            battery.removeEventListener("chargingchange", update);
          };
        })
        .catch(() => {
          /* Battery API unsupported silently */
        });
    }

    const startedAt = performance.now();
    const TARGET_FPS_LOW = 1000 / 20;

    const drawFrame = (now: number) => {
      if (contextLost || gl.isContextLost()) return;
      const options = optionsRef.current;
      mouseX += (targetX - mouseX) * options.smoothing;
      mouseY += (targetY - mouseY) * options.smoothing;
      gl.uniform1f(time, (now - startedAt) * 0.001 * options.speed);
      gl.uniform2f(pointerUniform, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const scheduleNext = () => {
      if (visible && !document.hidden && !contextLost && !reducedMotion.matches) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const startLoop = () => {
      if (!frame && visible && !document.hidden && !contextLost && !reducedMotion.matches) {
        frame = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const pointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX =
        0.72 +
        ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.72) *
          optionsRef.current.pointerAmount;
      targetY =
        0.42 +
        (1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.42) *
          optionsRef.current.pointerAmount;
    };

    const resize = (force = false) => {
      if (contextLost || gl.isContextLost()) return;
      const bounds = host.getBoundingClientRect();
      const ratio = effectiveDPR();
      const nextWidth = Math.max(1, Math.floor(bounds.width * ratio));
      const nextHeight = Math.max(1, Math.floor(bounds.height * ratio));

      // Avoid reassigning canvas.width/height when unchanged (which wipes the WebGL buffer
      // and causes blank-frame flicker during mobile/desktop viewport scroll events).
      if (!force && canvas.width === nextWidth && canvas.height === nextHeight) {
        return;
      }

      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, nextWidth, nextHeight);
      gl.uniform2f(resolution, nextWidth, nextHeight);

      // Immediately redraw synchronously after buffer reallocation so no blank frame is ever presented.
      drawFrame(performance.now());
    };

    const render = (now: number) => {
      frame = 0;
      if (isLowBattery && now - lastFrameTime < TARGET_FPS_LOW) {
        scheduleNext();
        return;
      }
      lastFrameTime = now;
      drawFrame(now);
      scheduleNext();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        lastFrameTime = performance.now();
        startLoop();
      }
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      stopLoop();
    };

    const handleContextRestored = () => {
      contextLost = false;
      if (initPipeline()) {
        resize(true);
        startLoop();
      }
    };

    const resizeObserver = new ResizeObserver(() => resize(false));
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) startLoop();
      else stopLoop();
    });

    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) stopLoop();
      else startLoop();
    };

    reducedMotion.addEventListener("change", onMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    resizeObserver.observe(host);
    intersection.observe(host);
    host.addEventListener("pointermove", pointer, { passive: true });
    resize(true);
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersection.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      host.removeEventListener("pointermove", pointer);
      batteryCleanup?.();
      if (!gl.isContextLost()) {
        if (buffer) gl.deleteBuffer(buffer);
        if (vertex) gl.deleteShader(vertex);
        if (fragment) gl.deleteShader(fragment);
        if (program) gl.deleteProgram(program);
      }
    };
  }, []);

  const options = optionsRef.current;
  // Omit CSS filter when at identity defaults to avoid an extra full-screen GPU
  // compositing pass and prevent backdrop-filter readback flicker while scrolling.
  const hasFilter =
    options.hue !== 0 || options.saturation !== 1 || options.brightness !== 1;
  const canvasStyle: React.CSSProperties = {
    opacity: options.opacity,
    transform: "translate3d(0, 0, 0)",
    backfaceVisibility: "hidden",
    ...(hasFilter
      ? {
          filter: `hue-rotate(${options.hue}deg) saturate(${options.saturation}) brightness(${options.brightness})`,
        }
      : {}),
  };

  return (
    <div
      ref={hostRef}
      className={`threeui-background ribbon-field${className ? ` ${className}` : ""}`}
      style={{ contain: "strict", transform: "translate3d(0, 0, 0)" }}
    >
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
}
