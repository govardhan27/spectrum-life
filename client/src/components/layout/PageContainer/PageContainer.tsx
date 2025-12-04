import React from "react";
import { StyledPageContainer } from "./PageContainer.styles";

interface PageContainerProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return <StyledPageContainer>{children}</StyledPageContainer>;
};
