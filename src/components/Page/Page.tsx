import React, { ReactNode } from 'react';
import { useRerenderOnAuthStateChanged } from '../../shared';

type PageProps = {
  isHomePage?: boolean;
  children: ReactNode;
};

export const Page = ({ isHomePage, children }: PageProps) => {
  const { isSignIn } = useRerenderOnAuthStateChanged();

  if (!isSignIn && !isHomePage) return <p>Please authorize</p>;
  return <div>{children}</div>;
};
