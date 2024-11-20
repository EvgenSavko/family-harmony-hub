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
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { routes, routes2 } from './routes';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useSideBar } from './SideBar.hooks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const fabStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '1.5rem',
  zIndex: 1051,
};

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
  } = useSideBar();

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
      <Drawer anchor="right" open={isOpenDrawer} onClose={toggleDrawer(false)}>
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
              <>
                <ListItem
                  key={route.label}
                  disablePadding
                  sx={{ display: 'block' }}
                >
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
              </>
            ))}
          </List>
          <Divider />
          <List>
            {routes2.map((route) => (
              <>
                <ListItem
                  key={route.label}
                  disablePadding
                  sx={{ display: 'block' }}
                >
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
              </>
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
