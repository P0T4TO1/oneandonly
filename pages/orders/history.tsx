import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },

  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: 'orden',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <Link href={`/orders/${params.row.orderId}`} underline="always">
          Ver orden
        </Link>
      );
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  // const rows = ..
  // { id: indice + 1, paid: true, fullname: 'Fernando Herrera', orderId: 1283781237123 }
  const rows = orders.map((order, idx) => ({
    id: idx + 1,
    paid: order.isPaid,
    fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }));

  return (
    <ShopLayout
      title={'Historial de ordenes - One & Only'}
      pageDescription={'Historial de ordenes del cliente'}
    >
      <Typography variant="h4" component="h1" textAlign="center" pb={3}>
        Historial de ordenes
      </Typography>

      <Grid container className="fadeIn" minWidth={1250}>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session: any = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login?p=/orders/history',
        permanent: false,
      },
    };
  }

  const response = await fetch(
    `${process.env.HOST_NAME}api/user/orders/${session.user._id}`
  );
  const orders: IOrder[] = await response.json();

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
