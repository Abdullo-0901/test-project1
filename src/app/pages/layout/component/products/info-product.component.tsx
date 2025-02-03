import { Box, Skeleton, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useGetProductById } from "../../../../hook/use-get-product-by-id.hook";
import { ButtonComponent } from "../../../../../ui-component";
import { SetStateAction } from "react";
import { useDeleteProduct } from "../../../../hook/use-delete-product.hook";

export function InfoProduct(args: {
  productId: number;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  // ---------------------------------------------------------------------------
  // hooks
  // ---------------------------------------------------------------------------
  const { data, isLoading } = useGetProductById({ id: args.productId });
  const { mutate } = useDeleteProduct();

  // ---------------------------------------------------------------------------
  return (
    <>
      {data && !isLoading ? (
        <Grid
          container
          spacing={4}
          height={450}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={6}>
            <img
              src={data.images[0]}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Grid>

          <Grid size={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Product name: </Typography>
                  <Typography>{data.title}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Product price: </Typography>
                  <Typography>{data.price}$</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Product category: </Typography>
                  <Typography>{data.category.name}</Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>Product description:</Typography>
                  <Typography>{data.description}</Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <ButtonComponent
                  onClick={() => {
                    mutate(args.productId);
                    args.setOpen(false);
                  }}
                  title="Delete"
                  variant="contained"
                  size={"small"}
                  color="error"
                />

                <ButtonComponent
                  onClick={() => {
                    args.setOpen(false);
                  }}
                  title="Cancel"
                  variant="contained"
                  size={"small"}
                  color="primary"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          spacing={4}
          height={450}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid size={6}>
            <Skeleton
              variant="rectangular"
              width={"100%"}
              height={"100%"}
              sx={{ borderRadius: 3 }}
            />
          </Grid>
          <Grid size={6}>
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
