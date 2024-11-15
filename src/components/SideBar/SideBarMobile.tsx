import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Global } from '@emotion/react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
} from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import { routes, routes2 } from './routes';
import { Puller, StyledBox, Root, drawerBleeding } from './styles';
import { grey } from '@mui/material/colors';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export const SideBarMobile = (props: Props) => {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <Root>
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            borderTop: `1px solid ${grey[600]}`,
          }}
        >
          <Puller />
          <Typography
            sx={{ pt: 3, pb: 2, color: 'text.secondary', textAlign: 'center' }}
          >
            Menu
          </Typography>
        </StyledBox>
        <Box sx={{ overflow: 'scroll' }}>
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {routes2.map((route, index) => (
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
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Root>
  );
};
