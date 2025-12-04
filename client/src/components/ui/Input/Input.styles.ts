import styled from "styled-components";

export const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  max-width: 526px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputContainer = styled.div<{ $hasError?: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.sizes.inputWidth};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.input};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? "#EF4444" : theme.colors.borderDefault};
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

export const Label = styled.label`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  left: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.label};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.label};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;

  padding-top: ${({ theme }) => theme.spacing["2xl"]};
  padding-bottom: 0;

  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.input};
  color: ${({ theme }) => theme.colors.textPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textPrimary};
    opacity: 0.4;
  }

  &:focus {
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-top: 4px;
`;
