import type { NextPage, GetServerSideProps } from "next";
import { Typography, Box } from "@mui/material";

import { ShopLayout, ProductList } from "../../components";

import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"One & Only - Buscar"}
      pageDescription={"Encuentra los mejores productos de Teslo aquí"}
    >
      <Typography variant="h4" component="h1">
        Buscar productos
      </Typography>

      {foundProducts ? (
        <Typography variant="h5" sx={{ mb: 1 }} textTransform="capitalize">
          Término: {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún produto
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  // y no hay productos
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  // TODO: retornar otros productos
  if (!foundProducts) {
    // products = await dbProducts.getAllProducts();
    products = await dbProducts.getProductsByTerm("shirt");
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
