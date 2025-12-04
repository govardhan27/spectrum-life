import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
    width: 100%;
    max-width: ${({ theme }) => theme.sizes.formWidth};
  }
`;

export const Heading = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.heading};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.heading};
  color: ${({ theme }) => theme.colors.textPrimary};
  max-width: ${({ theme }) => theme.sizes.formHeader};
  margin-bottom: ${({ theme }) => theme.spacing["3xl"]};
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Error = styled.h3`
  padding: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.error};
`;
