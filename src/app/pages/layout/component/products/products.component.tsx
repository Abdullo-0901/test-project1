import { Box, DialogTitle, TablePagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SetStateAction, useState } from "react";
import { GetProducts } from "../../../../../types/globalTypes";
import { ButtonComponent, CardProduct } from "../../../../../ui-component";
import SkeletonComponent from "../../../../../ui-component/card-skeleton/card-skeleton.component";
import ModalComponent from "../../../../../ui-component/modal/modal.component";
import { InfoProduct } from "./info-product.component";
import { AddProduct } from "./add-product.component";
import { EditProduct } from "./edit-product.component";

export function Products(args: {
  products: GetProducts[] | undefined;
  isLoading: boolean;
}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [modalType, setModalType] = useState<
    "add" | "delete" | "info" | "edit"
  >("add");

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
      <Box
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
        }}
      >
        <TablePagination
          sx={{ fontSize: "1.1rem" }}
          component="div"
          count={args.products != null ? args.products.length : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 16]}
        />

        <ButtonComponent
          onClick={() => {
            setModalType("add");
            setOpen(true);
          }}
          title="Add product"
          variant="contained"
          size={"small"}
          color="primary"
        />
      </Box>

      <Box>
        {/* --------------------------------------------------------------------------- */}
        {/* LOADING SKELETON */}
        {/* --------------------------------------------------------------------------- */}

        {(args.isLoading || !args.products) && (
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
        )}

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
                  <CardProduct
                    setModalType={setModalType}
                    setOpen={setOpen}
                    product={product}
                    setProductId={setProductId}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>

      <ModalComponent maxWidth="md" open={open} setOpen={setOpen}>
        {modalType === "info" && (
          <InfoProduct setOpen={setOpen} productId={productId} />
        )}
        {modalType === "add" && <AddProduct />}
        {modalType === "edit" && <EditProduct />}
        {modalType === "delete" && <DialogTitle>Delete</DialogTitle>}
      </ModalComponent>
    </Box>
  );
}
