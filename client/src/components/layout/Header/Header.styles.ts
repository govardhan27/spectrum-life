import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import { media } from "@theme/breakpoints";

export const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.headerBg};
  height: ${({ theme }) => theme.sizes.headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing["3xl"]};
  position: relative;

  @media (max-width: ${media.lg}) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }

  @media (max-width: ${media.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  @media (max-width: ${media.md}) {
    gap: 0;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${media.md}) {
    display: none;
  }
`;

export const NavLinks = styled.nav`
  display: none;
  gap: 48px;

  @media (min-width: ${media.md}) {
    display: flex;
  }
`;

export const NavLink = styled(RouterNavLink)<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.nav};
  font-weight: ${({ theme }) => theme.typography.fontWeight.black};
  line-height: ${({ theme }) => theme.typography.lineHeight.nav};
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: opacity 0.2s;
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.headerText};

  &:hover {
    opacity: 0.8;
  }

  svg {
    width: ${({ theme }) => theme.spacing.xl};
    height: ${({ theme }) => theme.spacing.xl};
  }
`;

export const DarkModeToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const DarkModeLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.nav};
  font-weight: ${({ theme }) => theme.typography.fontWeight.black};
  line-height: ${({ theme }) => theme.typography.lineHeight.nav};
  color: ${({ theme }) => theme.colors.headerText};
`;

export const GradientBar = styled.div`
  height: ${({ theme }) => theme.sizes.gradientHeight};
  width: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gradientStart} 0%,
    ${({ theme }) => theme.colors.gradientEnd} 100%
  );
`;
