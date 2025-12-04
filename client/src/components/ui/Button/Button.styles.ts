import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  $variant: ButtonVariant;
  $fullWidth?: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  height: ${({ theme }) => theme.sizes.buttonHeight};
  padding: 0 ${({ theme }) => theme.spacing["2xl"]};
  min-width: ${({ theme }) => theme.sizes.buttonWidth};

  font-size: ${({ theme }) => theme.typography.fontSize.button};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.button};

  border-radius: ${({ theme }) => theme.borderRadius.button};
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.15s ease,
    box-shadow 0.2s ease;

  border: none;
  outline: none;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background-color: ${theme.colors.buttonPrimary};
          color: ${theme.colors.buttonPrimaryText};

          &:hover:not(:disabled) {
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `
      : css`
          border: 1px solid ${theme.colors.buttonSecondaryBorder};
          color: ${theme.colors.buttonSecondaryBorder};
          background-color: ${theme.colors.buttonPrimaryText};

          &:hover:not(:disabled) {
            background-color: ${theme.colors.bgGray};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline-offset: 2px;
  }
`;
