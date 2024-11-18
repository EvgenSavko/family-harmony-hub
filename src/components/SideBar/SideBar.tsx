import { useMediaQuery } from '@mui/material';
import { SideBarDesktop } from './SideBarDesktop';
// import { SideBarMobile } from './SideBarMobile';
import { SideBarMobileV2 } from './SideBarMobileV2';

export const SideBar = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  return <>{isMobile ? <SideBarMobileV2 /> : <SideBarDesktop />}</>;
};
