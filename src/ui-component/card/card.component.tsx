import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ButtonComponent } from "../button/button.component";
import { CardProps } from "./card-type";

export function CardProduct(args: CardProps) {


  // ----------------------------------------------------------------------------------
  return (
    <Card sx={{ minWidth: 175 }}>
      <CardContent>
        {/* --------------------------------------------------------------------------- */}
        {/*CARD IMAGE CONTAINER */}
        {/* --------------------------------------------------------------------------- */}

        <Box sx={{ height: 150, width: "100%" }}>
          <img
            loading="lazy"
            src={args.product.images[0]}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1 / 1,
            }}
            alt={args.product.title}
          />
        </Box>

        {/* --------------------------------------------------------------------------- */}
        {/* CARD NAME */}
        {/* --------------------------------------------------------------------------- */}

        <Typography sx={{ color: "text.secondary", mb: 1.5, mt: 2 }}>
          {args.product.category.name}
        </Typography>

        {/* --------------------------------------------------------------------------- */}
        {/* CARD PRICE AND TITLE CONTAINER  */}
        {/* --------------------------------------------------------------------------- */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "black", fontWeight: 700, fontFamily: "sans-serif" }}
          >
            {args.product.title.slice(0, 24)}...
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "black", fontWeight: 700, fontFamily: "sans-serif" }}
          >
            {args.product.price}$
          </Typography>
        </Box>

        {/* --------------------------------------------------------------------------- */}
        {/* CARD DESCRIPTION */}
        {/* --------------------------------------------------------------------------- */}

        <Typography
          variant="body2"
          sx={{
            color: "black",
            fontWeight: 500,
            fontFamily: "sans-serif",
            mt: 2,
          }}
        >
          {args.product.description.slice(0, 80)}...
        </Typography>

        {/* --------------------------------------------------------------------------- */}
        {/* CARD BUTTON */}
        {/* --------------------------------------------------------------------------- */}

        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ButtonComponent
            onClick={() => {
              args.setOpen(true);
              args.setModalType("delete");
              args.setProductId(args.product.id);
            }}
            title="Delete"
            variant="contained"
            size={"small"}
            color="error"
          />
          <ButtonComponent
            onClick={() => {
              args.setOpen(true);
              args.setModalType("info");
              args.setProductId(args.product.id);
            }}
            title="Info"
            variant="contained"
            size={"small"}
            color="success"
          />
        </Box>
      </CardContent>
    </Card>
  );
}
