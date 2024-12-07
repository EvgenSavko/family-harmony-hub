import {
  Zoom,
  Fab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Collapse,
  ListItemText,
} from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { routes, routes2 } from './routes';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSideBar } from './SideBar.hooks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const SideBarMobileV2 = () => {
  const {
    isOpenDrawer,
    handleSignOut,
    pathname,
    setIsOpenDrawer,
    toggleDrawer,
    handleNavigateTo,
    openNavCollapse,
    handleNavCollapse,
    menuPosition,
  } = useSideBar();

  const fabStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: menuPosition === 'right' ? '1.5rem' : 'auto',
    left: menuPosition === 'left' ? '1.5rem' : 'auto',
    zIndex: 1051,
  };

  return (
    <>
      <Zoom in={true}>
        <Fab
          color="primary"
          variant="extended"
          aria-label="navigation-menu"
          sx={fabStyle}
          onClick={() => setIsOpenDrawer(true)}
        >
          <MenuIcon /> <Box ml={1}>Menu</Box>
        </Fab>
      </Zoom>
      <Drawer
        anchor={menuPosition}
        open={isOpenDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {routes.map((route) => (
              <React.Fragment key={route.label}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    selected={pathname === route.path}
                    onClick={(event) => {
                      if (route.children) {
                        event.stopPropagation();

                        // Prevents the default action the browser would normally take
                        event.preventDefault();
                        handleNavCollapse(route.path);
                      } else {
                        handleNavigateTo(route.path);
                      }
                    }}
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                          mr: 2,
                        },
                      ]}
                    >
                      {<route.icon />}
                    </ListItemIcon>

                    <ListItemText primary={route.label} />
                    {route.children && (
                      <>
                        {openNavCollapse === route.path ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openNavCollapse === route.path}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {route.children?.map((childRoute) => (
                      <ListItem
                        key={childRoute.label}
                        disablePadding
                        sx={{ display: 'block' }}
                      >
                        <ListItemButton
                          selected={pathname === childRoute.path}
                          onClick={() => handleNavigateTo(childRoute.path)}
                          sx={[
                            {
                              minHeight: 48,
                              px: 2.5,
                              pl: 3.5,
                            },
                          ]}
                        >
                          <ListItemIcon
                            sx={[
                              {
                                minWidth: 0,
                                justifyContent: 'center',
                                mr: 2,
                              },
                            ]}
                          >
                            {<route.icon />}
                          </ListItemIcon>

                          <ListItemText primary={childRoute.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Collapse>
              </React.Fragment>
            ))}
          </List>
          <Divider />
          <List>
            {routes2.map((route) => (
              <React.Fragment key={route.label}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    selected={pathname === route.path}
                    onClick={(event) => {
                      if (route.children) {
                        event.stopPropagation();

                        // Prevents the default action the browser would normally take
                        event.preventDefault();
                        handleNavCollapse(route.path);
                      } else {
                        handleNavigateTo(route.path);
                      }
                    }}
                    sx={[
                      {
                        minHeight: 48,
                        px: 2.5,
                      },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        {
                          minWidth: 0,
                          justifyContent: 'center',
                          mr: 2,
                        },
                      ]}
                    >
                      {<route.icon />}
                    </ListItemIcon>

                    <ListItemText primary={route.label} />
                    {route.children && (
                      <>
                        {openNavCollapse === route.path ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
                <Collapse
                  in={openNavCollapse === route.path}
                  timeout="auto"
                  unmountOnExit
                >
                  <List>
                    {route.children?.map((childRoute) => (
                      <ListItem
                        key={childRoute.label}
                        disablePadding
                        sx={{ display: 'block' }}
                      >
                        <ListItemButton
                          selected={pathname === childRoute.path}
                          onClick={() => handleNavigateTo(childRoute.path)}
                          sx={[
                            {
                              minHeight: 48,
                              px: 2.5,
                              pl: 3.5,
                            },
                          ]}
                        >
                          <ListItemIcon
                            sx={[
                              {
                                minWidth: 0,
                                justifyContent: 'center',
                                mr: 2,
                              },
                            ]}
                          >
                            {<route.icon />}
                          </ListItemIcon>

                          <ListItemText primary={childRoute.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Collapse>
              </React.Fragment>
            ))}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleSignOut}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                      mr: 2,
                    },
                  ]}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
