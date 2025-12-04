import React from "react";
import { FooterContainer, FooterContent, PoweredByText } from "./Footer.styles";
import SpectrumLogo from "@assets/icons/spectrum-logo.svg?react";

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <PoweredByText>Powered by</PoweredByText>
        <SpectrumLogo />
      </FooterContent>
    </FooterContainer>
  );
};
