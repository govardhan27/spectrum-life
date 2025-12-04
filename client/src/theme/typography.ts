export const typography = {
  fontFamily: {
    primary: '"DM Sans", -apple-system, system-ui, sans-serif', //  Main font
  },

  fontSize: {
    label: "14px",
    input: "16px",
    button: "16px",
    body: "16px",
    nav: "15px",
    heading: "22px",
    subheading: "24px",
  },

  fontWeight: {
    regular: 400,
    bold: 700,
    black: 900,
  },

  lineHeight: {
    label: "125%",
    input: "140%",
    button: "100%",
    heading: "125%",
    nav: "100%",
  },
} as const;
