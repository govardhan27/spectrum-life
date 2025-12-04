import styled from "styled-components";

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`;

export const LoadingSpinner = styled.div`
  width: ${({ theme }) => theme.spacing["3xl"]};
  height: ${({ theme }) => theme.spacing["3xl"]};
  border: 3px solid ${({ theme }) => theme.colors.bgGray};
  border-top-color: ${({ theme }) => theme.colors.buttonPrimary};
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.span`
  margin-left: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.body};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
