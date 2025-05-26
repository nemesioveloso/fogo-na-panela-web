import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Collapse,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import * as Icons from "@mui/icons-material";
import { menuData } from "../utils/menuData";
import { useAuth } from "../auth/AuthProvider";

export type Role = "admin" | "manager" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export default function DashboardLayout() {
  const drawerWidth = 280;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const userRole = user?.role as Role;

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const toggleSubMenu = (menuName: string) => {
    setOpenMenus((prev) =>
      prev.includes(menuName)
        ? prev.filter((m) => m !== menuName)
        : [...prev, menuName]
    );
  };

  const drawer = (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Cabeçalho */}
      <Box>
        <Toolbar>
          <Typography variant="h6" noWrap>
            BaseProject
          </Typography>
        </Toolbar>
        <Divider />
      </Box>

      {/* Menu que cresce */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {menuData
            .filter(
              (menu) => !menu.accessLevel || menu.accessLevel.includes(userRole)
            )
            .map((menu) => (
              <Box key={menu.name}>
                {menu.submenus ? (
                  <>
                    <ListItemButton onClick={() => toggleSubMenu(menu.name)}>
                      <Icon
                        sx={{
                          color: openMenus.includes(menu.name)
                            ? "primary.main"
                            : "inherit",
                        }}
                      >
                        {menu.icon}
                      </Icon>
                      <ListItemText
                        primary={menu.name}
                        sx={{
                          color: openMenus.includes(menu.name)
                            ? "primary.main"
                            : "inherit",
                        }}
                      />
                      {openMenus.includes(menu.name) ? (
                        <Icon>expand_less</Icon>
                      ) : (
                        <Icon>expand_more</Icon>
                      )}
                    </ListItemButton>
                    <Collapse
                      in={openMenus.includes(menu.name)}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {menu.submenus
                          .filter(
                            (sub) =>
                              user?.role !== undefined &&
                              sub.accessLevel.includes(user.role)
                          )
                          .map((sub) => (
                            <ListItemButton
                              key={sub.name}
                              sx={{ pl: 4 }}
                              onClick={() => navigate(sub.path)}
                              selected={isActive(sub.path)}
                            >
                              <ListItemText
                                primary={sub.name}
                                sx={{
                                  color: isActive(sub.path)
                                    ? "primary.main"
                                    : "inherit",
                                }}
                              />
                            </ListItemButton>
                          ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton
                    onClick={() => navigate(menu.path!)}
                    selected={isActive(menu.path)}
                  >
                    <Icon
                      sx={{
                        color: isActive(menu.path) ? "primary.main" : "inherit",
                      }}
                    >
                      {menu.icon}
                    </Icon>
                    <ListItemText
                      primary={menu.name}
                      sx={{
                        color: isActive(menu.path) ? "primary.main" : "inherit",
                      }}
                    />
                  </ListItemButton>
                )}
              </Box>
            ))}
        </List>
      </Box>

      {/* Rodapé - Logout */}
      <Box>
        <Divider />
        <List>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Icons.Logout />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
