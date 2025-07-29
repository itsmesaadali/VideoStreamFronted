import React from "react"

export const Card = React.forwardRef(function Card({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`rounded-lg border bg-white text-black shadow-sm ${className}`.trim()}
      {...props}
    />
  )
})

export const CardHeader = React.forwardRef(function CardHeader({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex flex-col space-y-1.5 p-6 ${className}`.trim()}
      {...props}
    />
  )
})

export const CardTitle = React.forwardRef(function CardTitle({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`.trim()}
      {...props}
    />
  )
})

export const CardDescription = React.forwardRef(function CardDescription({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`text-sm text-gray-500 ${className}`.trim()}
      {...props}
    />
  )
})

export const CardContent = React.forwardRef(function CardContent({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`p-6 pt-0 ${className}`.trim()}
      {...props}
    />
  )
})

export const CardFooter = React.forwardRef(function CardFooter({ className = "", ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className}`.trim()}
      {...props}
    />
  )
})
