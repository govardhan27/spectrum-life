import React, { useState } from "react";
import { SearchBar } from "@components/ui";
import { Toggle } from "@components/ui/Toggle/Toggle";
import Hamburger from "@assets/icons/hamburger.svg?react";
import Calendar from "@assets/icons/calendar.svg?react";
import Notification from "@assets/icons/notification.svg?react";

import {
  HeaderContainer,
  LeftSection,
  RightSection,
  NavLinks,
  NavLink,
  IconButton,
  DarkModeToggleContainer,
  DarkModeLabel,
  GradientBar,
} from "./Header.styles";

export const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <HeaderContainer as="header" role="banner">
        <LeftSection>
          <IconButton aria-label="Open menu">
            <Hamburger aria-hidden="true" />
          </IconButton>
          <SearchBar value={searchValue} onChange={setSearchValue} />
          <NavLinks>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Service
            </NavLink>
          </NavLinks>
        </LeftSection>

        <RightSection>
          <IconButton aria-label="Calendar">
            <Calendar aria-hidden="true" />
          </IconButton>

          <IconButton aria-label="Notifications">
            <Notification aria-hidden="true" />
          </IconButton>

          <DarkModeToggleContainer>
            <DarkModeLabel>Dark Mode</DarkModeLabel>
            <Toggle
              checked={isDarkMode}
              onChange={setIsDarkMode}
              label="Toggle dark mode"
            />
          </DarkModeToggleContainer>
        </RightSection>
      </HeaderContainer>
      <GradientBar aria-hidden="true" />
    </>
  );
};
