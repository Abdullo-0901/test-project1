import Button from "@mui/material/Button";
import { ButtonProps } from "./types";

export function ButtonComponent(args: ButtonProps) {
  return (
    <Button
      size={args.size}
      loading={args.loading}
      disabled={args.disabled}
      variant={args.variant}
      loadingIndicator={args.loadingIndicatorTitle}
      onClick={args.onClick}
      color={args.color}
    >
      {args.title}
    </Button>
  );
}
