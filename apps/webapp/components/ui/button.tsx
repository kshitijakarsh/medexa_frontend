import { Button as ButtonComponent } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
}

const Button = ({
  children,
  className,
  variant = "default",
  ...props
}: ButtonProps) => {
  return (
    <ButtonComponent
      className={cn(
        variant === "default" &&
          "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md",
        "rounded-xl px-6 h-11 font-semibold",
        className
      )}
      variant={variant}
      {...props}
    >
      {children}
    </ButtonComponent>
  )
}

export default Button
