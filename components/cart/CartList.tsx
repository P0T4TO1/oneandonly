import { FC, useContext } from 'react';
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
  Stack,
  Divider,
} from '@mui/material';

import { ItemCounter } from '../ui';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';

interface Props {
  editable?: boolean;
  products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
  const { cart, updateCartQuantity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  const productsToShow = products ? products : cart;

  return (
    <Box display="flex" flexDirection="column" sx={{ width: '100%' }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 2, width: '100%', display: { xs: 'none', lg: 'flex' } }}
      >
        <Grid item xs={3} lg={5.6} sx={{ marginLeft: '8px !important' }}>
          <Typography variant="subtitle1" component="h2">
            Producto
          </Typography>
        </Grid>
        <Grid item xs={4} lg={2} sx={{ marginLeft: '0 !important' }}>
          <Typography variant="subtitle1" component="h2">
            Precio
          </Typography>
        </Grid>
        <Grid item xs={2} sx={{ marginLeft: '10px !important' }}>
          <Typography variant="subtitle1" component="h2">
            Cantidad
          </Typography>
        </Grid>
      </Stack>

      {productsToShow.map((product) => (
        <Box key={product.slug + product.size}>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={4} lg={1.6}>
              <Link href={`/product/${product.slug}`}>
                <CardActionArea>
                  <CardMedia
                    image={product.image}
                    component="img"
                    sx={{
                      borderRadius: '5px',
                      height: { xs: 70, sm: 100, md: 120, lg: 150 },
                      width: { xs: 70, sm: 100, md: 120, lg: 150 },
                    }}
                  />
                </CardActionArea>
              </Link>
            </Grid>

            <Grid item xs={4}>
              <Box display="flex" flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4} lg={2}>
              <Typography
                variant="body2"
                sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}
              >
                Precio:
              </Typography>
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            </Grid>

            <Grid item xs={6} lg={2}>
              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  maxValue={10}
                  updatedQuantity={(value) =>
                    onNewCartQuantityValue(product as ICartProduct, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{' '}
                  {product.quantity > 1 ? 'productos' : 'producto'}
                </Typography>
              )}
            </Grid>

            <Grid
              item
              xs={5}
              lg={2}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              {editable && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeCartProduct(product as ICartProduct)}
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};
