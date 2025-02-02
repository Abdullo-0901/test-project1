export type ButtonProps = {
  size: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  title: string;
  variant?: "text" | "outlined" | "contained";
  loadingIndicatorTitle?: string;
  onClick: () => void;
};
