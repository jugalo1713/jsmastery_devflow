import { ThemeProvider, ThemeProviderProps } from "next-themes";

const Theme = ({ children, ...props }: ThemeProviderProps) => {
  return <ThemeProvider {...props}>{children}</ThemeProvider>;
};
export default Theme;
