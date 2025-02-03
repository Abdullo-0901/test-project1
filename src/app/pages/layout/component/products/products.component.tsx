import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TablePagination,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import { Theme, useTheme } from "@mui/material/styles";
import { SetStateAction, useState } from "react";
import { GetProducts } from "../../../../../types/globalTypes";
import { ButtonComponent, CardProduct } from "../../../../../ui-component";
import SkeletonComponent from "../../../../../ui-component/card-skeleton/card-skeleton.component";
import ModalComponent from "../../../../../ui-component/modal/modal.component";
import { useDeleteProduct } from "../../../../hook/use-delete-product.hook";
import { useGetCategories } from "../../../../hook/use-get-categories.hook";
import { AddProduct } from "./add-product.component";
import { InfoProduct } from "./info-product.component";

export function Products(args: {
  products: GetProducts[] | undefined;
  isLoading: boolean;
  categories: string[];
  handleChangeCategoy: (event: SelectChangeEvent<string[]>) => void;
}) {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [modalType, setModalType] = useState<"add" | "delete" | "info">("add");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------

  const { data } = useGetCategories();
  const { mutate } = useDeleteProduct();

  const categoryName = data ? data.map((category) => category.name) : [];

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

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  // ---------------------------------------------------------------------------
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* --------------------------------------------------------------------------- */}
      {/* PAGINATION CONTAINER */}
      {/* --------------------------------------------------------------------------- */}

      <Grid
        size={{
          lg: 4,
          md: 4,
          sm: 6,
          xs: 12,
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
          rowsPerPageOptions={[4, 8, 12, 16, { label: "All", value: -1 }]}
        />
      </Grid>
      <Grid
        container
        spacing={4}
        height={50}
        alignItems={"center"}
        mb={5}
        sx={{
          height: "100%",
        }}
        columnSpacing={{ xs: 20, sm: 40, md: 50 }}
      >
        <Grid
          size={{
            lg: 4,
            md: 4,
            sm: 6,
            xs: 12,
          }}
        >
          <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
            <Select
              multiple
              displayEmpty
              value={args.categories}
              onChange={args.handleChangeCategoy}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Placeholder</em>;
                }

                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Placeholder</em>
              </MenuItem>
              {categoryName.map((name, index) => (
                <MenuItem
                  key={index}
                  value={name}
                  style={getStyles(name, args.categories, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid
          size={{
            lg: 6,
            md: 6,
            sm: 6,
            xs: 12,
          }}
          mt={2}
        >
          <ButtonComponent
            onClick={() => {
              setModalType("add");
              setOpen(true);
            }}
            title="Add product"
            variant="contained"
            size={"medium"}
            color="primary"
          />
        </Grid>
      </Grid>

      {args.products && args.products.length !== 0 ? (
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
                <Grid
                  key={id}
                  size={{
                    lg: 3,
                    md: 4,
                    sm: 6,
                    xs: 12,
                  }}
                >
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
                    size={{
                      lg: args.products?.length === 1 ? 6 : 3,
                      md: 4,
                      sm: 6,
                      xs: 12,
                    }}
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
      ) : (
        <Typography>Not found product🥺</Typography>
      )}
      <ModalComponent
        maxWidth={modalType === "delete" ? "sm" : "md"}
        open={open}
        setOpen={setOpen}
      >
        {modalType === "info" && (
          <InfoProduct setOpen={setOpen} productId={productId} />
        )}

        {modalType === "add" && <AddProduct setOpen={setOpen} />}

        {modalType === "delete" && (
          <DialogContent>
            <DialogTitle>Are you want delete this product</DialogTitle>
            <DialogActions>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <ButtonComponent
                  onClick={() => {
                    setOpen(false);
                    mutate(productId);
                  }}
                  title="Delete"
                  variant="contained"
                  size={"small"}
                  color="error"
                />
                <ButtonComponent
                  onClick={() => {
                    setOpen(false);
                  }}
                  title="Cance"
                  variant="contained"
                  size={"small"}
                  color="primary"
                />
              </Box>
            </DialogActions>
          </DialogContent>
        )}
      </ModalComponent>
    </Box>
  );
}
