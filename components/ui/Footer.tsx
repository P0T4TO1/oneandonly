import { FC } from 'react';

import {
  Container,
  Stack,
  Box,
  Avatar,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export const Footer: FC = () => {
  return (
    <Box sx={{ backgroundColor: 'grey.900' }}>
      <Container sx={{ justifyContent: 'flex-end', display: 'flex' }}>
        <Stack direction="row" spacing={2} sx={{ p: 2 }}>
          <Link
            href={'https://www.facebook.com'}
            target="_blank"
            sx={{ height: '50%' }}
          >
            <Avatar>
              <Facebook />
            </Avatar>
          </Link>

          <Link
            href={'https://www.twitter.com'}
            target="_blank"
            sx={{ height: '50%' }}
          >
            <Avatar>
              <Twitter />
            </Avatar>
          </Link>

          <Link
            href={'https://www.instagram.com'}
            target="_blank"
            sx={{ height: '50%' }}
          >
            <Avatar>
              <Instagram />
            </Avatar>
          </Link>
        </Stack>
      </Container>
      <Divider />
      <Box
        sx={{
          color: 'primary.main',
          pt: 3,
          pb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 5, sm: 10, md: 13, lg: 15 }}
          >
            <Stack spacing={2} maxWidth={300}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  alt="Logo"
                  src="/assets/logo.png"
                  className={'logo'}
                  sx={{ width: 100, height: 50 }}
                />
                <Typography
                  variant="h5"
                  gutterBottom
                  component="div"
                  sx={{ mt: 'auto', mb: 'auto' }}
                >
                  One & Only
                </Typography>
              </Stack>
              <Typography variant="subtitle1" component="p">
                One & Only es una tienda de ropa de alta calidad
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Stack spacing={2}>
                <Typography variant="h6" gutterBottom component="div">
                  Servicios
                </Typography>
                <Link href={'/'}>Inicio</Link>

                <Link href={'/'}>Tienda</Link>

                <Link href={'/about'}>Acerca de</Link>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom component="div">
                Cuenta
              </Typography>

              <Link href={'/auth/login'}>Iniciar sesión</Link>

              <Link href={'/auth/register'}>Registrarse</Link>
              <Link href={'/cart'}>Carrito</Link>
            </Stack>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom component="div">
                Contacto
              </Typography>
              <Typography variant="subtitle1" component="p">
                1234 Main St, Anytown, CA 12345
              </Typography>
              <Typography variant="subtitle1" component="p">
                +1 234 567 8900
              </Typography>

              <Link href={'/contact'}>Contacto</Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};
