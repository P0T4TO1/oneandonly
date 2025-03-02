import type { NextPage } from "next";
import { Typography, Container } from "@mui/material";

import { ShopLayout, ProductList, FullScreenLoading } from "../components";

import { useProducts } from "../hooks";

const HomePage: NextPage = () => {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"One & Only - Inicio"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">Tienda</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Todos los productos
        </Typography>

        {isLoading ? (
          <FullScreenLoading />
        ) : (
          <ProductList products={products} />
        )}
      </Container>
    </ShopLayout>
  );
};

export default HomePage;
