import styled from "styled-components";
import { media } from "@theme/breakpoints";

export const SearchBarContainer = styled.div`
  position: relative;
  width: ${({ theme }) => theme.sizes.searchBarWidth};
  height: ${({ theme }) => theme.sizes.searchBarHeight};
  background-color: ${({ theme }) => theme.colors.searchBarBg};
  border-radius: ${({ theme }) => theme.borderRadius.searchBar};
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 12px;

  @media (max-width: ${media.lg}) {
    width: 400px;
  }

  @media (max-width: 820px) {
    display: none;
  }
`;

export const GradientBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 10px;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.gradientStart} 0%,
    ${({ theme }) => theme.colors.gradientEnd} 100%
  );
`;

export const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize.input};
  font-weight: ${({ theme }) => theme.typography.fontWeight.regular};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;
