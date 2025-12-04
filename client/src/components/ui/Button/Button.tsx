import React from "react";
import { StyledButton } from "./Button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $fullWidth={fullWidth}
      aria-busy={isLoading}
      aria-disabled={props.disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};
