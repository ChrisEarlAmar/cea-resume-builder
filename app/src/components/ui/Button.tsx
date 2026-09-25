import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: ButtonVariant
  size?: 'default' | 'small' | 'icon'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className = '',
    variant = 'secondary',
    size = 'default',
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`button button--${variant} button--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  )
})
