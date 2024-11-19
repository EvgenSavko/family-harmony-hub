import { useState, KeyboardEvent, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useTheme } from '@mui/material/styles';

export const useSideBar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  return {
    theme,
    open,
    pathname,
    isOpenDrawer,
    handleDrawerOpen,
    handleDrawerClose,
    handleNavigateTo,
    handleSignOut,
    setIsOpenDrawer,
    toggleDrawer,
  };
};
