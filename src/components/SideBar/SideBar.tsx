import { useMediaQuery } from '@mui/material';
import { SideBarDesktop } from './SideBarDesktop';
import { SideBarMobile } from './SideBarMobile';

export const SideBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return <>{isMobile ? <SideBarMobile /> : <SideBarDesktop />}</>;
};
