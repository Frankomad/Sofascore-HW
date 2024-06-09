import React from 'react'
import { Button } from '@kuma-ui/core'
import ArrowRight from './icons/ArrowRight'

interface CustomButtonProps {
  variant?: 'primary' | 'stroked' | 'unshielded' | 'icon'
  disabled?: boolean
  icon?: boolean
  children?: React.ReactNode
  left?: boolean
  onClick?: () => void
  [key: string]: any
}

const CustomButton: React.FC<CustomButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  variant = 'primary',
  disabled = false,
  icon = false,
  left = false,
  inverted = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <Button variant={variant} disabled={disabled} onClick={onClick} w="24px" h="24px" p={'0px'} {...props}>
      <>
        {children}
        {icon && <ArrowRight inverted={inverted} left={left} />}
      </>
    </Button>
  )
}

export default CustomButton
