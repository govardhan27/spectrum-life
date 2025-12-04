import React, { forwardRef } from "react";
import {
  InputWrapper,
  InputContainer,
  Label,
  StyledInput,
  ErrorMessage,
} from "./Input.styles";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, id, ...props }, ref) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

    return (
      <InputWrapper $fullWidth={fullWidth}>
        <InputContainer $hasError={!!error}>
          {label && <Label htmlFor={inputId}>{label}</Label>}

          <StyledInput
            ref={ref}
            id={inputId}
            aria-required={props.required}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </InputContainer>

        {error && (
          <ErrorMessage id={`${inputId}-error`} role="alert">
            {error}
          </ErrorMessage>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
