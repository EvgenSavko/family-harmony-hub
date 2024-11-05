import React, { ReactNode } from 'react';
import { auth } from '../../firebase';

type PageProps = {
  isHomePage?: boolean;
  children: ReactNode;
};

export const Page = ({ isHomePage, children }: PageProps) => {
  if (!auth.currentUser?.email && !isHomePage) return <p>Please authorize</p>;
  return <div>{children}</div>;
};
