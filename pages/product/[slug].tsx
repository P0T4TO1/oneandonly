import { useState, useContext, SyntheticEvent, ComponentType } from 'react';
import { NextPage, GetServerSideProps } from 'next';

import {
  Box,
  Button,
  Chip,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Slide,
  SlideProps,
  Container,
} from '@mui/material';

import { CartContext } from '../../context';

import {
  ShopLayout,
  ProductSlideshow,
  SizeSelector,
  ItemCounter,
} from '../../components';

import { IProduct, ICartProduct, ISize } from '../../interfaces';

interface Props {
  product: IProduct;
}

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
  return <Slide {...props} direction="left" />;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [transition, setTransition] = useState<
    ComponentType<TransitionProps> | undefined
  >(undefined);

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const { addProductToCart } = useContext(CartContext);

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const selectedSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const onAddProduct = (Transition: ComponentType<TransitionProps>) => {
    if (!tempCartProduct.size) {
      return;
    }
    setTransition(() => Transition);
    setOpen(true);
    addProductToCart(tempCartProduct);
  };

  return (
    <ShopLayout
      title={`${product.title} - One & Only`}
      pageDescription={product.description}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={7}>
            <ProductSlideshow images={product.images} />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
              {/* titulos */}
              <Typography variant="h4">{product.title}</Typography>
              <Typography
                variant="h6"
                component="h2"
              >{`$${product.price}`}</Typography>

              {/* Cantidad */}
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle2">Cantidad</Typography>
                <ItemCounter
                  currentValue={tempCartProduct.quantity}
                  updatedQuantity={onUpdateQuantity}
                  maxValue={product.inStock > 10 ? 10 : product.inStock}
                />
                <SizeSelector
                  // selectedSize={ product.sizes[2] }
                  sizes={product.sizes}
                  selectedSize={tempCartProduct.size}
                  onSelectedSize={selectedSize}
                />
              </Box>

              {/* Agregar al carrito */}
              {product.inStock > 0 ? (
                <Button
                  color="secondary"
                  className="circular-btn"
                  onClick={() => onAddProduct(TransitionLeft)}
                >
                  {tempCartProduct.size
                    ? 'Agregar al carrito'
                    : 'Seleccione una talla'}
                </Button>
              ) : (
                <Chip
                  label="No hay disponibles"
                  color="error"
                  variant="outlined"
                />
              )}

              {/* Descripción */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Descripción</Typography>
                <Typography variant="body2">{product.description}</Typography>
              </Box>

              {/* Etiquetas */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2">Etiquetas</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                  {product.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      color="primary"
                      variant="outlined"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={transition}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
          variant="filled"
        >
          Producto agregado al carrito
        </Alert>
      </Snackbar>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const hostName = process.env.HOST_NAME;
  if (!hostName) {
    throw new Error('HOST_NAME environment variable is not defined');
  }

  const { slug = '' } = params as { slug: string };
  const response = await fetch(`${hostName}api/products/${slug}`);

  if (!response.ok) {
    console.error(`Failed to fetch product data: ${response.statusText}`);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const responseText = await response.text();

  try {
    const product = JSON.parse(responseText);

    if (!product) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Failed to parse product data: ${error.message}`);
    } else {
      console.error('Failed to parse product data:', error);
    }
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
};

export default ProductPage;
