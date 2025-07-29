import React from "react"

export const Label = React.forwardRef(function Label({ className = "", ...props }, ref) {
  const defaultClasses = `
    text-sm font-medium leading-none
    peer-disabled:cursor-not-allowed peer-disabled:opacity-70
  `

  return (
    <label
      ref={ref}
      className={`${defaultClasses} ${className}`.trim()}
      {...props}
    />
  )
})
