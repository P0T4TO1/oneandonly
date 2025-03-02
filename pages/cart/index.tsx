import { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  Stack,
} from "@mui/material";

import { CartContext } from "../../context";
import { ShopLayout, CartList, OrderSummary } from "../../components";
import { useRouter } from "next/router";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty").then();
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title="Carrito de compras - One & Only"
      pageDescription={"Carrito de compras de la tienda"}
    >
      <Typography variant="h4" component="h1">
        Carrito
      </Typography>

      <Box minWidth={{ xs: "100%", sm: "100%", md: 800, lg: 1200 }}>
        <Stack direction="row" spacing={2} sx={{ mt: 2, width: "100%" }}>
          <CartList editable />
        </Stack>

        <Stack direction="row-reverse" spacing={2} sx={{ mt: 2 }}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5">Orden</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Continuar con el pago
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </ShopLayout>
  );
};

export default CartPage;
