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
import { appConfig } from "../config/appConfig";

export default function DashboardLayout() {
  const drawerWidth = 280;
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const userRole = user?.roles ?? [];

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

  const itemStyles = {
    transition: "background-color 0.25s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
    "&.Mui-selected": {
      backgroundColor: "#FFD700",
      color: "#00114d",
      "&:hover": {
        backgroundColor: "#FFD700",
      },
      "& .MuiListItemText-primary, & .MuiTypography-root, & .MuiIcon-root, & .material-icons":
        {
          color: "#00114d",
        },
    },
  };

  const drawer = (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Cabeçalho */}
      <Box
        sx={{
          background: "#00114d",
          color: "#f7f7f7",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            {appConfig.name}
          </Typography>
        </Toolbar>
        <Divider />
      </Box>

      {/* Menu que cresce */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          background: "#00114d",
          color: "#f7f7f7",
        }}
      >
        <List>
          {menuData
            .filter(
              (menu) =>
                !menu.accessLevel ||
                menu.accessLevel.some((role) => userRole.includes(role))
            )
            .map((menu) => (
              <Box key={menu.name}>
                {menu.submenus ? (
                  <>
                    <ListItemButton
                      onClick={() => toggleSubMenu(menu.name)}
                      selected={openMenus.includes(menu.name)}
                    >
                      <Icon
                        className="material-icons"
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
                              user?.roles &&
                              sub.accessLevel.some((role) =>
                                user.roles.includes(role)
                              )
                          )
                          .map((sub) => (
                            <ListItemButton
                              key={sub.name}
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
                    sx={{ ...itemStyles }}
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
      <Box
        sx={{
          background: "#00114d",
          color: "#f7f7f7",
        }}
      >
        <Divider />
        <List>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Icons.Logout sx={{ color: "#f7f7f7" }} />
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
          background: "#00114d",
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
          p: { xs: 1, sm: 1, md: 2, lg: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, sm: 8, md: 8, lg: 8 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
