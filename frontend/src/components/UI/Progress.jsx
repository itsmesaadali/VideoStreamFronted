import React from "react";

export const Progress = React.forwardRef(function Progress({ className = "", value = 0, ...props }, ref) {
  const clampedValue = Math.min(Math.max(value, 0), 100); // clamp between 0 and 100

  return (
    <div
      ref={ref}
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`.trim()}
      {...props}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
    >
      <div
        className="h-full bg-black transition-all"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
});
