import { useState, KeyboardEvent, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Zoom,
  Fab,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { routes, routes2 } from './routes';
import ListItemIcon from '@mui/material/ListItemIcon';

const fabStyle = {
  position: 'fixed',
  bottom: '2rem',
  right: '1.5rem',
};

export const SideBarMobileV2 = () => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpenDrawer(open);
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
              <ListItem
                key={route.label}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  selected={pathname === route.path}
                  onClick={() => handleNavigateTo(route.path)}
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {routes2.map((route) => (
              <ListItem
                key={route.label}
                disablePadding
                sx={{ display: 'block' }}
              >
                <ListItemButton
                  selected={pathname === route.path}
                  onClick={() => handleNavigateTo(route.path)}
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
