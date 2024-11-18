import ContactPageIcon from '@mui/icons-material/ContactPage';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

const routes = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/profile', label: 'Profile', icon: ContactPageIcon },
  { path: '/family-profile', label: 'Family profile', icon: FolderSharedIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
];
const routes2 = [{ path: '/contact', label: 'Contact', icon: ContactMailIcon }];

export { routes, routes2 };
