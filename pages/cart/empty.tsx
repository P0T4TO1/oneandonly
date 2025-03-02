import { RemoveShoppingCartOutlined } from '@mui/icons-material';
import { Box, Link, Typography } from '@mui/material';
import { ShopLayout } from '../../components';

const EmptyPage = () => {
  return (
    <ShopLayout
      title="Carrito vació - One & Only"
      pageDescription="No hay artículos en el carrito de compras"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>Su carrito está vació</Typography>
          <Link href="/" typography="h4" color="secondary">
            Regresar
          </Link>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
