import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { SetStateAction, useState } from "react";
import { ButtonComponent } from "../../../../../ui-component";
import { useForm } from "../../../../hook";
import { useGetCategories } from "../../../../hook/use-get-categories.hook";
import { usePostProduct } from "../../../../hook/use-post-product.hook";

type Product = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
};

export function AddProduct({
  setOpen,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  // ---------------------------------------------------------------------------
  // varables
  // ---------------------------------------------------------------------------
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [category, setCategory] = useState("1");

  // ---------------------------------------------------------------------------
  // hooks
  // ---------------------------------------------------------------------------
  const { mutate } = usePostProduct();
  const { data } = useGetCategories();

  const { values, handleChange } = useForm<Product>({
    initialValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: category,
    },
  });

  // ---------------------------------------------------------------------------
  // functions
  // ---------------------------------------------------------------------------

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input.files) {
      setFileName(input.files[0].name);
      setFile(input.files[0]);
    }
  };

  async function onSend() {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://api.escuelajs.co/api/v1/files/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      mutate({
        ...values,
        price: Number(values.price),
        categoryId: Number(values.categoryId),
        images: [data.location],
      });
      setOpen(false);
    }
  }

  function handleChangeCategory(event: SelectChangeEvent) {
    setCategory(event.target.value);
  }

  // ---------------------------------------------------------------------------
  return (
    <form>
      <Box sx={{ mb: 2, alignItems: "center" }}>
        <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid size={2}>
            <Box sx={{ height: "33px", alignItems: "center", display: "flex" }}>
              <label htmlFor="price">Price</label>
            </Box>
          </Grid>
          <Grid size={10}>
            <Box>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "30px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "2px solid #11a850",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2, alignItems: "center" }}>
        <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid size={2}>
            <Box sx={{ height: "33px", alignItems: "center", display: "flex" }}>
              <label htmlFor="price">Title</label>
            </Box>
          </Grid>
          <Grid size={10}>
            <Box>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                style={{
                  width: "100%",
                  height: "20px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "2px solid #11a850",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2, alignItems: "center" }}>
        <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid size={2}>
            <Box sx={{ height: "33px", alignItems: "center", display: "flex" }}>
              <label htmlFor="description">Description</label>
            </Box>
          </Grid>

          <Grid size={10}>
            <Box>
              <textarea
                id="description"
                name="description"
                style={{
                  width: "100%",
                  height: "20px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: "2px solid #11a850",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                }}
                value={values.description}
                onChange={handleChange}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid size={2}>
            <Box>
              <label htmlFor="categoryId">Category ID</label>
            </Box>
          </Grid>

          <Grid size={10}>
            <FormControl sx={{ width: "100%" }}>
              <Select
                value={category}
                onChange={handleChangeCategory}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                {data &&
                  data.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      <em>{category.name}</em>
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        <Grid size={2}>
          <Box>
            <label htmlFor="images">Images</label>
          </Box>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <label
            htmlFor="images"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              border: "2px dashed #4f46e5",
              borderRadius: "8px",
              cursor: "pointer",
              backgroundColor: "#f8fafc",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <input
              required
              type="file"
              id="images"
              name="images"
              onChange={handleFileChange}
              style={{
                display: "none",
              }}
            />
            <span
              style={{
                backgroundColor: "#4f46e5",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Select file
            </span>
            <span style={{ fontSize: "14px", color: "#333" }}>
              {fileName || "No file selected"}
            </span>
          </label>
        </Box>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          mt: 2,
          alignItems: "center",
        }}
      >
        <ButtonComponent
          onClick={onSend}
          title="Add"
          variant="contained"
          size={"small"}
          color="primary"
        />

        <ButtonComponent
          onClick={() => {
            setOpen(false);
          }}
          title="Cancel"
          variant="contained"
          size={"small"}
          color="primary"
        />
      </Box>
    </form>
  );
}
