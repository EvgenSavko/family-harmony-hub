import React, { ReactNode } from 'react';
import { useRerenderOnAuthStateChanged } from '../../shared';
import { Box } from '@mui/material';

type PageProps = {
  isHomePage?: boolean;
  children: ReactNode;
};

export const Page = ({ isHomePage, children }: PageProps) => {
  const { isSignIn } = useRerenderOnAuthStateChanged();

  if (!isSignIn && !isHomePage) return <p>Please authorize</p>;

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 1, pl: { xs: 1, md: 3 } }}>
      {children}
    </Box>
  );
};
