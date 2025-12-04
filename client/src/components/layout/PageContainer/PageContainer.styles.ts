import styled from "styled-components";
import { media } from "@theme/breakpoints";

export const StyledPageContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing["3xl"]} ${theme.spacing.lg}`};

  background-color: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (max-width: ${media.lg}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  }

  @media (max-width: ${media.md}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  }

  @media (max-width: ${media.sm}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  }
`;
