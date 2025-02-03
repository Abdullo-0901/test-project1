import styles from "./layout.module.css";
import { Container, SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";
import { Header } from "./component/header/header.component";
import { useGetProducts } from "../../hook/use-get-product.hook";
import { Products } from "./component/products/products.component";

export function Layout() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  // ---------------------------------------------------------------------------
  // hooks
  // ---------------------------------------------------------------------------

  const { data: product, isLoading } = useGetProducts({
    limit: 190,
    offset: 20,
  });

  const handleChange = (event: SelectChangeEvent<typeof categories>) => {
    const {
      target: { value },
    } = event;
    setCategories(typeof value === "string" ? value.split(",") : value);
  };

  // ---------------------------------------------------------------------------
  // memos
  // ---------------------------------------------------------------------------

  const productsFilter = useMemo(() => {
    if (!product) return [];
  
    return product.filter((product) => {
      const matchesQuery = query ? product.title.toLowerCase().includes(query.toLowerCase()) : true;
      const matchesCategory = categories.length
        ? categories.some((category) => category === product.category.name)
        : true;
  
      return matchesQuery && matchesCategory;
    });
  }, [product, query, categories]);
  

  // ---------------------------------------------------------------------------
  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <Container className={styles.main}>
        <Products
          isLoading={isLoading}
          products={productsFilter}
          categories={categories}
          handleChangeCategoy={handleChange}
        />
      </Container>
    </>
  );
}
