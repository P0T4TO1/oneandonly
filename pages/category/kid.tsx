import type { NextPage } from "next";
import { Typography, Container } from "@mui/material";

import { ShopLayout, ProductList, FullScreenLoading } from "../../components";
import { useProducts } from "../../hooks";

const KidPage: NextPage = () => {
  const { products, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"One & Only - Niños"}
      pageDescription={"Encuentra los mejores productos de Teslo para niños"}
    >
      <Container maxWidth="xl">
        <Typography variant="h4">Niños</Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Productos para niños
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

export default KidPage;
