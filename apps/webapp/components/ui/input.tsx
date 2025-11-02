import { Input as InputComponent } from "@workspace/ui/components/input"
import { cn } from "@workspace/ui/lib/utils"
import * as React from "react"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <InputComponent
        ref={ref}
        className={cn(
          "border-blue-400 focus-visible:border-blue-500 focus-visible:ring-blue-500/50",
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
