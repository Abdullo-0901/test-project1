import { Box, Container } from "@mui/material";
import logo from "../../../../.././app/public/images/logo.svg";
import styles from "./header.module.css";
import { Query } from "./type";

export function Header(args: Query) {
  return (
    <Box className={styles.header}>
      <Container className={styles.navbar}>
        <img src={logo} className={styles.logo} />
        <input
          className={styles.input}
          type="text"
          value={args.query}
          onChange={(e) => args.setQuery(e.target.value)}
          placeholder="Search Product"
        />
      </Container>
    </Box>
  );
}
