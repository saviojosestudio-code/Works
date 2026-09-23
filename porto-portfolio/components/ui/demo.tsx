import React from "react";
import { Bars } from "@/components/ui/bars";

export default function BarsDemo() {
  return (
    <div className="flex min-h-[200px] items-center justify-center">
      <Bars className="h-8 w-8 text-primary" bars={3} />
    </div>
  );
}
