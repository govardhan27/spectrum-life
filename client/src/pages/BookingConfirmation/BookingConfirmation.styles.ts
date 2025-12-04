import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  max-width: 526px;
`;

export const Heading = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: 22px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.label};
  color: ${({ theme }) => theme.colors.headerBg};
  text-align: center;
  margin: 0;
`;

export const BodyText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  line-height: ${({ theme }) => theme.typography.lineHeight.input};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: center;
  margin: 0;
  max-width: 526px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 526px;
`;

export const AlertText = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.primary};
  font-size: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight};
  line-height: ${({ theme }) => theme.spacing.xl};
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;
