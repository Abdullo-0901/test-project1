export type ButtonProps = {
  size: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  title: string;
  variant?: "text" | "outlined" | "contained";
  color:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  loadingIndicatorTitle?: string;
  onClick: () => void;
};
