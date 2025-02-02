import Grid from "@mui/material/Grid2";
import { GetProducts } from "../../../../../types/globalTypes";
import SkeletonComponent from "../../../../../ui-component/card-skeleton/card-skeleton.component";
import { CardProduct } from "../../../../../ui-component";
import { SetStateAction, useState } from "react";
import { Box, TablePagination } from "@mui/material";

export function Products(args: {
  products: GetProducts[] | undefined;
  isLoading: boolean;
}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------
  function handleChangeRowsPerPage(event: { target: { value: string } }) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleChangePage(_: any, newPage: SetStateAction<number>) {
    setPage(newPage);
  }

  // ---------------------------------------------------------------------------
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* --------------------------------------------------------------------------- */}
      {/* PAGINATION CONTAINER */}
      {/* --------------------------------------------------------------------------- */}

      <TablePagination
        sx={{ fontSize: "1.1rem" }}
        component="div"
        count={args.products != null ? args.products.length : 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[4, 8]}
      />

      <Box>
        {/* --------------------------------------------------------------------------- */}
        {/* LOADING SKELETON */}
        {/* --------------------------------------------------------------------------- */}

        {args.isLoading ||
          (!args.products && (
            <Grid
              container
              spacing={4}
              height={450}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {Array.from({ length: 8 }).map((_, id) => (
                <Grid key={id} size={3}>
                  <SkeletonComponent />
                </Grid>
              ))}
            </Grid>
          ))}

        {/* --------------------------------------------------------------------------- */}
        {/* CARD AFTER SUCCES REQUES */}
        {/* --------------------------------------------------------------------------- */}

        {!args.isLoading && args.products && (
          <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {args.products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <Grid
                  key={product.id}
                  size={args.products?.length === 1 ? 6 : 3}
                >
                  <CardProduct {...product} />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
