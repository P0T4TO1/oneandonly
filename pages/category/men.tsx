import type { NextPage } from "next";
import { Typography, Container } from "@mui/material";

import { ShopLayout, ProductList, FullScreenLoading } from "../../components";
import { useProducts } from "../../hooks";

const MenPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"One & Only - Hombres"}
      pageDescription={"Encuentra los mejores productos de Teslo para ellos"}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">Hombres</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Productos para ellos
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

export default MenPage;
