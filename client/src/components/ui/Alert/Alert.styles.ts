import styled from "styled-components";

export const AlertContainer = styled.div`
  width: 100%;
  max-width: 526px;
  background-color: ${({ theme }) => theme.colors.alertBg};
  border-radius: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const AlertHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const AlertTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 100%;
  color: ${({ theme }) => theme.colors.alertHeaderText};
  margin: 0;
  flex: 1;
`;

export const AlertContent = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.input};
  color: ${({ theme }) => theme.colors.textPrimary};

  p {
    margin: 0 0 ${({ theme }) => theme.spacing.md} 0;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
