import { useContext } from 'react';

import { AppBar, Avatar, Box, Button, Link, Toolbar } from '@mui/material';

import { UiContext } from '../../context';
import { AccountMenu } from '../ui';

export const AdminNavbar = () => {
  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <Link href="/" display="flex" alignItems="center">
          <Avatar
            src={'/assets/logo.png'}
            sx={{ width: 100, height: 50 }}
            className="logo"
          />
        </Link>

        <Box flex={1} />
        <AccountMenu />
        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
