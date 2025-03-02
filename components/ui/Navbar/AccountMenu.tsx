import { FC, useState, MouseEvent, useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  ListSubheader,
  Tooltip,
} from "@mui/material";

import {
  Person,
  PersonAdd,
  Logout,
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  CategoryOutlined,
  AdminPanelSettings,
} from "@mui/icons-material";

import { AuthContext } from "../../../context";

export const AccountMenu: FC = () => {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateTo = (url: string) => {
    handleClose();
    router.push(url).then();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title={"Menu de la cuenta"} placement="bottom-end">
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Person />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isLoggedIn ? (
          <Box>
            <MenuItem onClick={() => navigateTo("/profile")}>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              Mi cuenta
            </MenuItem>
            <MenuItem onClick={() => navigateTo("/orders/history")}>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              Mis pedidos
            </MenuItem>
            <Divider />
            <MenuItem onClick={logout} sx={{ mb: 1 }}>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Cerrar Sesión
            </MenuItem>
          </Box>
        ) : (
          <Box>
            <MenuItem
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              Iniciar Sesión
            </MenuItem>
            <MenuItem
              onClick={() => navigateTo(`/auth/register?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              Registrate
            </MenuItem>
          </Box>
        )}

        {user?.role === "admin" || user?.role === "SEO" ? (
          <Box>
            <Divider />
            <ListSubheader>Admin Panel</ListSubheader>
            <MenuItem onClick={() => navigateTo("/admin/")}>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              Dashboard
            </MenuItem>
            <MenuItem onClick={() => navigateTo("/admin/products")}>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              Productos
            </MenuItem>
            <MenuItem onClick={() => navigateTo("/admin/orders")}>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              Pedidos
            </MenuItem>

            <MenuItem onClick={() => navigateTo("/admin/users")}>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              Usuarios
            </MenuItem>
          </Box>
        ) : null}
      </Menu>
    </>
  );
};
