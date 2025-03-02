import { FC, JSX, ReactNode } from 'react';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { AdminNavbar } from '../admin';

import { SideMenu } from '../ui';

interface Props {
  title: string;
  subTitle: string;
  icon?: JSX.Element;
  children: ReactNode;
}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
  return (
    <>
      <Head>
        <title>{`Admin | ${title}`}</title>
        <meta name="description" content={subTitle} />
      </Head>

      <nav>
        <AdminNavbar />
      </nav>

      <SideMenu />

      <main
        style={{
          margin: '80px auto',
          maxWidth: '100%',
          padding: '0px 30px',
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h4" component="h1">
            {icon} {title}
          </Typography>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {subTitle}
          </Typography>
        </Box>

        <Box className="fadeIn">{children}</Box>
      </main>
    </>
  );
};
