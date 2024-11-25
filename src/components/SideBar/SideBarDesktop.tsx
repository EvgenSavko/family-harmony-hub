import React from 'react';
import {
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  ListItemText,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import { Drawer, AppBar, DrawerHeader } from './styles';
import { routes, routes2 } from './routes';
import { useSideBar } from './SideBar.hooks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const SideBarDesktop = () => {
  const {
    theme,
    open,
    pathname,
    handleDrawerOpen,
    handleDrawerClose,
    handleNavigateTo,
    handleSignOut,
    openNavCollapse,
    handleNavCollapse,
  } = useSideBar();

  return (
    <>
      <AppBar
        open={open}
        sx={[
          {
            width: '65px',
            left: 'auto',
            right: 'auto',
            top: 'auto',
          },
          open && { display: 'none' },
        ]}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ position: 'relative' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {routes.map((route) => (
            <React.Fragment key={route.label}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  selected={pathname === route.path}
                  onClick={() => {
                    if (route.children) {
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
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: 'auto',
                          },
                    ]}
                  >
                    {<route.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
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
                      key={childRoute.path}
                      disablePadding
                      sx={{ display: 'block' }}
                    >
                      <ListItemButton
                        selected={pathname === childRoute.path}
                        onClick={() => handleNavigateTo(childRoute.path)}
                        sx={[
                          {
                            ml: 0,
                            minHeight: 48,
                            px: 2.5,
                          },
                          open
                            ? {
                                justifyContent: 'initial',
                              }
                            : {
                                justifyContent: 'center',
                              },
                        ]}
                      >
                        <ListItemIcon
                          sx={[
                            {
                              minWidth: 0,
                              justifyContent: 'center',
                            },
                            open
                              ? {
                                  mr: 3,
                                  pl: 1,
                                }
                              : {
                                  mr: 'auto',
                                  pl: 0,
                                },
                          ]}
                        >
                          {<childRoute.icon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={childRoute.label}
                          sx={[
                            open
                              ? {
                                  opacity: 1,
                                }
                              : {
                                  opacity: 0,
                                },
                          ]}
                        />
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
                  onClick={() => {
                    if (route.children) {
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
                    open
                      ? {
                          justifyContent: 'initial',
                        }
                      : {
                          justifyContent: 'center',
                        },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                      },
                      open
                        ? {
                            mr: 3,
                          }
                        : {
                            mr: 'auto',
                          },
                    ]}
                  >
                    {<route.icon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={route.label}
                    sx={[
                      open
                        ? {
                            opacity: 1,
                          }
                        : {
                            opacity: 0,
                          },
                    ]}
                  />
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
                      key={childRoute.path}
                      disablePadding
                      sx={{ display: 'block' }}
                    >
                      <ListItemButton
                        selected={pathname === childRoute.path}
                        onClick={() => handleNavigateTo(childRoute.path)}
                        sx={[
                          {
                            ml: 0,
                            minHeight: 48,
                            px: 2.5,
                          },
                          open
                            ? {
                                justifyContent: 'initial',
                              }
                            : {
                                justifyContent: 'center',
                              },
                        ]}
                      >
                        <ListItemIcon
                          sx={[
                            {
                              minWidth: 0,
                              justifyContent: 'center',
                            },
                            open
                              ? {
                                  mr: 3,
                                  pl: 2,
                                }
                              : {
                                  mr: 'auto',
                                  pl: 0,
                                },
                          ]}
                        >
                          {<childRoute.icon />}
                        </ListItemIcon>
                        <ListItemText
                          primary={childRoute.label}
                          sx={[
                            open
                              ? {
                                  opacity: 1,
                                }
                              : {
                                  opacity: 0,
                                },
                          ]}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
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
                open
                  ? {
                      justifyContent: 'initial',
                    }
                  : {
                      justifyContent: 'center',
                    },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: 'center',
                  },
                  open
                    ? {
                        mr: 3,
                      }
                    : {
                        mr: 'auto',
                      },
                ]}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Sing out"
                sx={[
                  open
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
