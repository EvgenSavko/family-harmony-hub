import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  Home,
  Contact,
  About,
  Profile,
  FamilyProfile,
  Settings,
} from '../../pages';
import { Header, Auth, SideBar } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { Container, Paper, Box, CssBaseline } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const MainContent = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();
  const theme = useTheme();

  return (
    <Router>
      <Paper
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === 'light' ? '#FAFBFB' : 'inherit',
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
        <Container maxWidth="xl">
          <>
            <Box sx={{ display: 'flex' }}>
              <CssBaseline />

              {isSignIn && <SideBar />}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/family-profile" element={<FamilyProfile />} />
                <Route
                  path="/family-profile-information"
                  element={<FamilyProfile />}
                />
              </Routes>
            </Box>
          </>
        </Container>
      </Paper>
    </Router>
  );
};
