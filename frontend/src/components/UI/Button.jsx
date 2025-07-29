import React from "react"

export const Button = React.forwardRef(function Button(
  {
    children,
    className = "",
    variant = "default",
    size = "default",
    ...props
  },
  ref
) {
  // Variant styles
  const variantStyles = {
    default: "bg-red-600 text-white hover:bg-red-700",
    destructive: "bg-red-700 text-white hover:bg-red-800",
    outline: "border border-gray-300 bg-white text-black hover:bg-gray-100",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-black",
    link: "text-red-600 underline-offset-4 hover:underline",
  }

  // Size styles
  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10 p-2",
  }

  // Combine all classes manually
  const combinedClasses = `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md text-sm font-medium
    transition-colors focus:outline-none focus:ring-2
    focus:ring-red-500 focus:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none
    ${variantStyles[variant] || variantStyles.default}
    ${sizeStyles[size] || sizeStyles.default}
    ${className}
  `

  return (
    <button ref={ref} className={combinedClasses.trim()} {...props}>
      {children}
    </button>
  )
})
