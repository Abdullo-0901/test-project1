import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export function CardProduct() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <img  loading="lazy" />
      </CardContent>
    </Card>
  );
}
