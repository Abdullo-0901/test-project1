import Grid from "@mui/material/Grid2";
import { GetProducts } from "../../../../../types/globalTypes";
import SkeletonComponent from "../../../../../ui-component/card-skeleton/card-skeleton.component";
import { CardProduct } from "../../../../../ui-component";

export function Products(args: { product: GetProducts[]; isLoading: boolean }) {
  return (
    <>
      {args.isLoading ? (
        <Grid
          container
          spacing={4}
          height={450}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {Array.from({ length: 8 }).map((_, id) => (
            <Grid size={3}>
              <SkeletonComponent />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid
          container
          spacing={4}
          height={450}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {args.product.map((product) => {
            return (
              <Grid size={3}>
                <CardProduct {...product} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
}
