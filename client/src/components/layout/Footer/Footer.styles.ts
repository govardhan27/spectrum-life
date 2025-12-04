import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.spacing["4xl"]};
  background-color: ${({ theme }) => theme.colors.bgWhite};
  padding-bottom: ${({ theme }) => theme.spacing["3xl"]};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

export const FooterContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PoweredByText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.label};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.textSecondary};
`;
