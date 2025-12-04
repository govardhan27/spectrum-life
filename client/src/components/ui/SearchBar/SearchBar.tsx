import React from "react";
import {
  SearchBarContainer,
  SearchIcon,
  SearchInput,
  GradientBar,
} from "./SearchBar.styles";
import Search from "@assets/icons/search.svg?react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search..",
  value = "",
  onChange,
}) => {
  return (
    <SearchBarContainer role="search" aria-label="search">
      <GradientBar aria-hidden="true" />
      <SearchIcon aria-hidden="true">
        <Search />
      </SearchIcon>
      <SearchInput
        type="text"
        id="search"
        aria-label="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </SearchBarContainer>
  );
};
