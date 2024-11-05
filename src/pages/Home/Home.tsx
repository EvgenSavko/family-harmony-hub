import React from 'react';
import { Auth, Page, CreateFamily, MyFamily } from '../../components';

export const Home = () => {
  return (
    <Page isHomePage>
      <h3>Home</h3>
      <br />
      <Auth />
      <CreateFamily />
      <MyFamily />
    </Page>
  );
};
