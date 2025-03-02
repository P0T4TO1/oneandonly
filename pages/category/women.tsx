import type { NextPage } from "next";
import { Typography, Container } from "@mui/material";

import { ShopLayout, ProductList, FullScreenLoading } from "../../components";

import { useProducts } from "../../hooks";

const WomenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"One & Only - Mujeres"}
      pageDescription={"Encuentra los mejores productos de Teslo para ellas"}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">Mujeres</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Productos para ellas
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

export default WomenPage;
