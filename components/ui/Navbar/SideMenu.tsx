import { useContext, useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  EscalatorWarningOutlined,
  FemaleOutlined,
  MaleOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import { UiContext } from "../../../context";
import { useRouter } from "next/router";

export const SideMenu = () => {
  const router = useRouter();
  const { asPath } = router;
  const url = asPath.split("/");
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url).then();
  };

  return (
    <Drawer
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={toggleSideMenu}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {url[1] !== "admin" && (
            <Box>
              <ListItemButton
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={() => navigateTo("/category/men")}
              >
                <ListItemIcon>
                  <MaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Hombres"} />
              </ListItemButton>

              <ListItemButton
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={() => navigateTo("/category/women")}
              >
                <ListItemIcon>
                  <FemaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mujeres"} />
              </ListItemButton>

              <ListItemButton
                sx={{ display: { xs: "", sm: "none" } }}
                onClick={() => navigateTo("/category/kid")}
              >
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <ListItemText primary={"Niños"} />
              </ListItemButton>
            </Box>
          )}

          {url[1] === "admin" && (
            <Box>
              <ListItemButton onClick={() => navigateTo("/category/men")}>
                <ListItemIcon>
                  <MaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Hombres"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/category/women")}>
                <ListItemIcon>
                  <FemaleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mujeres"} />
              </ListItemButton>

              <ListItemButton onClick={() => navigateTo("/category/kid")}>
                <ListItemIcon>
                  <EscalatorWarningOutlined />
                </ListItemIcon>
                <ListItemText primary={"Niños"} />
              </ListItemButton>
            </Box>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
