import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const cardVariants = cva("w-full relative", {
  variants: {
    variant: {
      gradient: ["relative mx-auto w-full", "px-4 sm:px-6 md:px-8"],
    },
  },
  defaultVariants: {
    variant: "gradient",
  },
})

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string
  description?: string
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {props.children}
  </div>
))
CardContent.displayName = "CardContent"

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, title, description, children, ...props }, ref) => {

const GradientLines = () => (
  <>
    {/* Top Line */}
    <div
      className="absolute left-0 top-4 -z-0 h-px w-full 
      bg-gradient-to-l from-gray-100 via-gray-200 to-gray-300
      dark:from-gray-700 dark:via-gray-600 dark:to-gray-500
      sm:top-6 md:top-8"
    />

    {/* Bottom Line */}
    <div
      className="absolute bottom-4 left-0 z-0 h-px w-full 
      bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300
      dark:from-gray-700 dark:via-gray-600 dark:to-gray-500
      sm:bottom-6 md:bottom-8"
    />

    {/* Side Borders */}
    <div className="relative w-full border-x border-transparent">
      <div
        className="absolute inset-y-0 left-0 w-px 
        bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
      />
      <div
        className="absolute inset-y-0 right-0 w-px 
        bg-gradient-to-t from-gray-100 via-gray-200 to-gray-300
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-500"
      />

      <div className="relative z-20 mx-auto py-8">{content}</div>
    </div>
  </>
);


const InnerContent = () => {
      if (variant === "gradient") return <GradientLines />
      return null
}

const content = (
      <CardContent>
        {title && (
          <h3 className="text-lg font-bold mb-1 text-blue-900 dark:text-gray-100">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
        )}
        {children}
      </CardContent>
)


if (variant === "gradient") {
      return (
        <div
          ref={ref}
          className={cn(cardVariants({ variant, className }))}
          {...props}
        >
          <GradientLines />
        </div>
      )
}

return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        <InnerContent />
        {content}
      </div>
    )
  },
)
Card.displayName = "Card"

export { Card, CardContent, cardVariants }
