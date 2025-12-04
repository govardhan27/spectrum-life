import { colors } from "./colors";
import { spacing, borderRadius, sizes } from "./spacing";
import { typography } from "./typography";

export const lightTheme = {
  colors,
  spacing,
  borderRadius,
  sizes,
  typography,
} as const;

export type Theme = typeof lightTheme;
