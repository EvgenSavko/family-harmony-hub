import ContactPageIcon from '@mui/icons-material/ContactPage';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';

const routes = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/profile', label: 'Profile', icon: ContactPageIcon },
  { path: '/family-profile', label: 'Family profile', icon: FolderSharedIcon },
  { path: '/settings', label: 'Settings', icon: SettingsSuggestIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
];
const routes2 = [
  { path: '/contact', label: 'Contact', icon: SupportAgentIcon },
];

export { routes, routes2 };
