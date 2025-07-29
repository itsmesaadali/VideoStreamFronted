import React, { useState } from "react";

export const Avatar = React.forwardRef(function Avatar({ className = "", children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
});

export const AvatarImage = React.forwardRef(function AvatarImage({ className = "", src, alt, fallback, ...props }, ref) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => setHasError(true);

  if (hasError || !src) {
    // Show fallback content (could be initials or icon)
    return (
      <div
        ref={ref}
        className={`flex h-full w-full items-center justify-center rounded-full bg-gray-300 text-gray-600 select-none ${className}`.trim()}
        {...props}
      >
        {fallback || alt?.[0]?.toUpperCase() || "?"}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full object-cover ${className}`.trim()}
      onError={handleError}
      {...props}
    />
  );
});

export const AvatarFallback = React.forwardRef(function AvatarFallback({ className = "", children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-gray-300 ${className}`.trim()}
      {...props}
    >
      {children || "?"}
    </div>
  );
});
