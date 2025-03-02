import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';

import { CartContext, UiContext } from '../../../context';
import { AccountMenu } from './AccountMenu';

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`).then();
  };

  return (
    <AppBar>
      <Toolbar>
        <Tooltip title={'Página principal'}>
          <Link href="/" display="flex" alignItems="center">
            <Avatar
              src={'/assets/logo.png'}
              sx={{ width: 100, height: 50 }}
              className="logo"
            />
          </Link>
        </Tooltip>

        <Box flex={1} />

        <Box
          sx={{
            display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex' },
          }}
          className="fadeIn"
        >
          <Link
            href="/category/men"
            sx={
              asPath === '/category/men'
                ? { textDecoration: 'underline' }
                : { textDecoration: 'none' }
            }
          >
            <Button
              color={'primary'}
              sx={{ ':hover': { color: 'secondary.main' } }}
            >
              Hombres
            </Button>
          </Link>

          <Link
            href="/category/women"
            sx={
              asPath === '/category/women'
                ? { textDecoration: 'underline' }
                : { textDecoration: 'none' }
            }
          >
            <Button
              color={'primary'}
              sx={{ ':hover': { color: 'secondary.main' } }}
            >
              Mujeres
            </Button>
          </Link>
          <Link
            href="/category/kid"
            sx={
              asPath === '/category/kids'
                ? { textDecoration: 'underline' }
                : { textDecoration: 'none' }
            }
          >
            <Button
              color={'primary'}
              sx={{ ':hover': { color: 'secondary.main' } }}
            >
              Niños
            </Button>
          </Link>
        </Box>

        <Box flex={1} />

        {/* Pantallas grandes */}
        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: 'none', sm: 'flex' } }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            type="text"
            placeholder="Buscar..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <Tooltip title={'Buscar producto'}>
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <SearchOutlined />
            </IconButton>
          </Tooltip>
        )}

        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <Tooltip title={`Carrito de compras | ${numberOfItems}`}>
          <Link href="/cart">
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? '+9' : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </Tooltip>

        <AccountMenu />

        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <Button onClick={toggleSideMenu}>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
