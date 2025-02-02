import styles from "./layout.module.css";
import { Container } from "@mui/material";
import { useMemo, useState } from "react";
import { Header } from "./component/header/header.component";
import { useGetProduct } from "../../hook/use-get-product.hook";
import { Products } from "./component/products/products.component";

export function Layout() {
  // ---------------------------------------------------------------------------
  // variables
  // ---------------------------------------------------------------------------
  const [query, setQuery] = useState("");

  // ---------------------------------------------------------------------------
  // hooks
  // ---------------------------------------------------------------------------

  const { data: product, isLoading } = useGetProduct({
    limit: 190,
    offset: 20,
  });
  console.log("isLoading", isLoading);
  // ---------------------------------------------------------------------------
  // memos
  // ---------------------------------------------------------------------------

  const productsFilter = useMemo(() => {
    if (query && product) {
      return product.filter((product) => {
        return product.title.toLowerCase().includes(query.toLowerCase());
      });
    } else {
      return product;
    }
  }, [product, query]);

  // ---------------------------------------------------------------------------
  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <Container className={styles.main}>
        <Products isLoading={isLoading} product={productsFilter} />
      </Container>
    </>
  );
}
