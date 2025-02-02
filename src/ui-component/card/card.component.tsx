import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GetProducts } from "../../types/globalTypes";
import { Box, Typography } from "@mui/material";
import { ButtonComponent } from "../button/button.component";

export function CardProduct(product: GetProducts) {
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
            src={product.images[0]}
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: 1 / 1,
            }}
            alt={product.title}
          />
        </Box>

        {/* --------------------------------------------------------------------------- */}
        {/* CARD NAME */}
        {/* --------------------------------------------------------------------------- */}

        <Typography sx={{ color: "text.secondary", mb: 1.5, mt: 2 }}>
          {product.category.name}
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
            {product.title.slice(0, 24)}...
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "black", fontWeight: 700, fontFamily: "sans-serif" }}
          >
            {product.price}$
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
          {product.description.slice(0, 80)}...
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
            onClick={() => {}}
            title="Delete"
            variant="contained"
            size={"small"}
            color="error"
          />
          <ButtonComponent
            onClick={() => {}}
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
