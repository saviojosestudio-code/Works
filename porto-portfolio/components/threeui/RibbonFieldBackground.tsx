"use client";

import { useEffect, useRef } from "react";
import { RIBBON_FIELD_FRAGMENT_SHADER, RIBBON_FIELD_VERTEX_SHADER } from "./ribbonFieldShaders";

export type RibbonFieldBackgroundProps = { speed?: number; pointerAmount?: number; smoothing?: number; brightness?: number; opacity?: number; hue?: number; saturation?: number; className?: string };
export const RIBBON_FIELD_DEFAULTS = { speed: 1, pointerAmount: 1, smoothing: 0.035, brightness: 1, opacity: 1, hue: 0, saturation: 1 } as const;
function compile(gl: WebGLRenderingContext, type: number, source: string) { const shader = gl.createShader(type); if (!shader) throw new Error("Unable to create Axiom shader"); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) ?? "Axiom shader compilation failed"); return shader; }

/** Returns the effective device pixel ratio, capped to 1 on narrow mobile screens to halve GPU fill-rate. */
function effectiveDPR(): number {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  return Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
}

export function RibbonFieldBackground({ className = "", ...props }: RibbonFieldBackgroundProps) {
  const hostRef = useRef<HTMLDivElement>(null), canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef({ ...RIBBON_FIELD_DEFAULTS, ...props }); optionsRef.current = { ...RIBBON_FIELD_DEFAULTS, ...props };

  useEffect(() => {
    const host = hostRef.current, canvas = canvasRef.current;
    if (!host || !canvas) return undefined;

    // ── Accessibility / power gate ─────────────────────────────────────────
    // Respect prefers-reduced-motion: if the user has requested reduced motion,
    // skip the WebGL animation entirely (canvas stays hidden).
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return undefined;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) return undefined;

    const vertex = compile(gl, gl.VERTEX_SHADER, RIBBON_FIELD_VERTEX_SHADER),
      fragment = compile(gl, gl.FRAGMENT_SHADER, RIBBON_FIELD_FRAGMENT_SHADER),
      program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "Axiom program link failed");
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution"),
      time = gl.getUniformLocation(program, "time"),
      pointerUniform = gl.getUniformLocation(program, "pointer");
    let mouseX = 0.72, mouseY = 0.42, targetX = 0.72, targetY = 0.42,
      frame = 0, visible = true, lastFrameTime = 0;

    // ── Battery API throttle ───────────────────────────────────────────────
    // When battery is low (≤15%) or discharging slowly, drop to ~20fps to
    // conserve power. Falls back gracefully on browsers without Battery API.
    let isLowBattery = false;
    let batteryCleanup: (() => void) | undefined;
    if ("getBattery" in navigator) {
      (navigator as Navigator & { getBattery(): Promise<{ level: number; charging: boolean; addEventListener: (e: string, cb: () => void) => void; removeEventListener: (e: string, cb: () => void) => void }> })
        .getBattery().then((battery) => {
          const update = () => { isLowBattery = !battery.charging && battery.level <= 0.15; };
          update();
          battery.addEventListener("levelchange", update);
          battery.addEventListener("chargingchange", update);
          batteryCleanup = () => {
            battery.removeEventListener("levelchange", update);
            battery.removeEventListener("chargingchange", update);
          };
        }).catch(() => { /* Battery API unsupported silently */ });
    }

    const startedAt = performance.now();
    const TARGET_FPS_LOW = 1000 / 20; // ~20fps when throttled

    const pointer = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      targetX = 0.72 + (((event.clientX - bounds.left) / Math.max(bounds.width, 1)) - 0.72) * optionsRef.current.pointerAmount;
      targetY = 0.42 + ((1 - (event.clientY - bounds.top) / Math.max(bounds.height, 1)) - 0.42) * optionsRef.current.pointerAmount;
    };

    const resize = () => {
      const bounds = host.getBoundingClientRect(), ratio = effectiveDPR();
      canvas.width = Math.max(1, Math.floor(bounds.width * ratio));
      canvas.height = Math.max(1, Math.floor(bounds.height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      // Throttle to ~20fps when on low battery to conserve power
      if (isLowBattery && now - lastFrameTime < TARGET_FPS_LOW) {
        frame = visible && !document.hidden ? requestAnimationFrame(render) : 0;
        return;
      }
      lastFrameTime = now;

      const options = optionsRef.current;
      mouseX += (targetX - mouseX) * options.smoothing;
      mouseY += (targetY - mouseY) * options.smoothing;
      gl.uniform1f(time, (now - startedAt) * 0.001 * options.speed);
      gl.uniform2f(pointerUniform, mouseX, mouseY);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = visible && !document.hidden ? requestAnimationFrame(render) : 0;
    };

    // Pause when off-screen (IntersectionObserver) or tab hidden (document.hidden check in render)
    const resizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    });

    // Also pause/resume on prefers-reduced-motion change at runtime
    const onMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) { if (frame) { cancelAnimationFrame(frame); frame = 0; } }
      else { if (visible && !frame) frame = requestAnimationFrame(render); }
    };
    reducedMotion.addEventListener("change", onMotionChange);

    resizeObserver.observe(host);
    intersection.observe(host);
    host.addEventListener("pointermove", pointer, { passive: true });
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      reducedMotion.removeEventListener("change", onMotionChange);
      host.removeEventListener("pointermove", pointer);
      batteryCleanup?.();
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteProgram(program);
    };
  }, []);

  const options = optionsRef.current;
  return (
    <div ref={hostRef} className={`threeui-background ribbon-field${className ? ` ${className}` : ""}`}>
      <canvas
        ref={canvasRef}
        style={{ opacity: options.opacity, filter: `hue-rotate(${options.hue}deg) saturate(${options.saturation}) brightness(${options.brightness})` }}
      />
    </div>
  );
}
