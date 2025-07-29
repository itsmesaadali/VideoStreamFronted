import React from "react"

export const Input = React.forwardRef(function Input({ className = "", type = "text", ...props }, ref) {
  const defaultClasses = `
    flex h-10 w-full rounded-md border border-gray-300 bg-white
    px-3 py-2 text-base ring-offset-background
    placeholder:text-gray-400
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
  `

  return (
    <input
      type={type}
      className={`${defaultClasses} ${className}`.trim()}
      ref={ref}
      {...props}
    />
  )
})
