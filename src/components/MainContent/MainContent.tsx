import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Contact, About } from '../../pages';
import { ThemeToggle, Header, Auth } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { Container, Paper, Link as UILink } from '@mui/material';

export const MainContent = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();

  return (
    <Router>
      <div className="App">
        <Paper elevation={0}>
          <Header />
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
          <Container maxWidth="xl">
            <>
              {isSignIn && (
                <nav style={{ float: 'inline-start' }}>
                  <ul>
                    <li>
                      <Link to="/">
                        <UILink>Login</UILink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/home">
                        <UILink>Home</UILink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        <UILink>About</UILink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        <UILink>Contact</UILink>
                      </Link>
                    </li>
                  </ul>
                </nav>
              )}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </>
          </Container>
          <ThemeToggle />
        </Paper>
      </div>
    </Router>
  );
};
