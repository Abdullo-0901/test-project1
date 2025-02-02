import { useEffect, useState } from "react";
import { Header } from "./component/header/header.component";
import { Sidebar } from "./component/sidebar/sidebar.component";
import { Products } from "./component/products/products.component";
import { Container } from "@mui/material";
import styles from "./layout.module.css";
export function Layout() {
  useEffect(() => {
    get();
  }, []);

  async function get() {
    const response = await fetch(import.meta.env.VITE_BASE_ULR);
    console.log(response.json());
  }

  const [query, setQuery] = useState("");

  return (
    <>
      <Header query={query} setQuery={setQuery} />
      <Container className={styles.main}>
        <Sidebar />
        <Products />
      </Container>
    </>
  );
}
