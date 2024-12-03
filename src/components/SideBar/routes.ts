import ContactPageIcon from '@mui/icons-material/ContactPage';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { SvgIconComponent } from '@mui/icons-material';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

interface Route {
  path: string;
  label: string;
  icon: SvgIconComponent;
  children?: Route[];
}

const routes: Route[] = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/profile', label: 'Profile', icon: ContactPageIcon },
  {
    path: '/family-profile',
    label: 'Family overview',
    icon: FolderSharedIcon,
    children: [
      {
        path: '/family-creating',
        label: 'Create & Assign',
        icon: NoteAddIcon,
      },
      {
        path: '/members-info',
        label: 'Members Info',
        icon: RecentActorsIcon,
      },
      {
        path: '/family-calendar',
        label: 'Shared Calendar',
        icon: EditCalendarIcon,
      },
    ],
  },
  {
    path: '/task-overview',
    label: 'Task overview',
    icon: FormatListNumberedIcon,
    children: [
      {
        path: '/task-creating',
        label: 'Create & Assign',
        icon: PlaylistAddIcon,
      },
      {
        path: '/my-tasks',
        label: 'My Tasks',
        icon: PlaylistAddCheckIcon,
      },
    ],
  },
  { path: '/settings', label: 'Settings', icon: SettingsSuggestIcon },
  { path: '/about', label: 'About', icon: InfoIcon },
];
const routes2: Route[] = [
  { path: '/contact', label: 'Contact', icon: SupportAgentIcon },
];

export { routes, routes2 };
