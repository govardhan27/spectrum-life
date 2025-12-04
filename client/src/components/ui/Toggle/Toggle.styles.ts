import styled from "styled-components";

export const ToggleContainer = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ToggleTrack = styled.div<{ $checked: boolean }>`
  width: 50.86px;
  height: 28.51px;
  border-radius: ${({ theme }) => theme.borderRadius.toggle};
  border: 2px solid ${({ theme }) => theme.colors.headerText};
  background-color: ${({ theme }) => theme.colors.toggleBg};
  position: relative;
  transition: all 0.3s ease;
`;

export const ToggleKnob = styled.div<{ $checked: boolean }>`
  width: ${({ theme }) => theme.spacing.lg};
  height: ${({ theme }) => theme.spacing.lg};
  border-radius: 50%;
  background: linear-gradient(90deg, #604aff 0%, #3a2c99 100%);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  left: ${({ $checked }) => ($checked ? "calc(100% - 24px)" : "4px")};
`;
