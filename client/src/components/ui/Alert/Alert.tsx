import React from "react";
import {
  AlertContainer,
  AlertHeader,
  AlertTitle,
  AlertContent,
} from "./Alert.styles";
import Warning from "@assets/icons/warning.svg?react";
import Close from "@assets/icons/close.svg?react";

export interface AlertProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const Alert: React.FC<AlertProps> = ({ title, children }) => {
  return (
    <AlertContainer role="alert" aria-live="polite">
      <AlertHeader>
        <Warning />
        <AlertTitle>{title}</AlertTitle>
        <Close />
      </AlertHeader>
      <AlertContent>{children}</AlertContent>
    </AlertContainer>
  );
};
