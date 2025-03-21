import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Grid, Link } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components';
import { IProduct } from '../../interfaces';

const columns: GridColDef[] = [
  {
    field: 'img',
    headerName: 'Foto',
    disableColumnMenu: true,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/product/${row.slug}`} target="_blank" rel="noreferrer">
          <CardMedia
            component="img"
            alt={row.title}
            className="fadeIn"
            image={row.img}
          />
        </a>
      );
    },
  },
  {
    field: 'title',
    headerName: 'Nombre',
    width: 350,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <Link href={`/admin/products/${row.slug}`} underline="always">
          {row.title}
        </Link>
      );
    },
  },
  { field: 'gender', headerName: 'Género', width: 150 },
  { field: 'type', headerName: 'Tipo', width: 140 },
  { field: 'inStock', headerName: 'Inventario' },
  { field: 'price', headerName: 'Precio' },
  { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsPage = () => {
  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if (!data && !error) return <></>;

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Productos (${data?.length})`}
      subTitle={'Mantenimiento de productos'}
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button
          startIcon={<AddOutlined />}
          color="secondary"
          href="/admin/products/new"
        >
          Crear producto
        </Button>
      </Box>

      <Grid
        container
        className="fadeIn"
        minWidth={{ xs: '100%', sm: '100%', md: 800, lg: 1200 }}
      >
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default ProductsPage;
