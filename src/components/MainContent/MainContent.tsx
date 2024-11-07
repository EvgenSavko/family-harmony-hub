import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Contact, About } from '../../pages';
import { ThemeToggle } from '../ThemeToggle';
import { Header } from '../Header';
import Container from '@mui/material/Container';

export const MainContent = () => {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="xl">
        <Router>
          <div>
            <nav style={{ float: 'inline-start' }}>
              <ul>
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router>
      </Container>
      <ThemeToggle />
    </div>
  );
};
