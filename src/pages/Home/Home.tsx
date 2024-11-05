import React from 'react';
import { Auth, Page } from '../../components';

export const Home = () => {
  return (
    <Page isHomePage>
      <h3>Home</h3>
      <br />
      <Auth />
    </Page>
  );
};
