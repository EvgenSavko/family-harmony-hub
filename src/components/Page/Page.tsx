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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 0, md: 1 },
        pt: { xs: 0, md: 3 },
        pl: { xs: 0, md: 3 },
        pr: { xs: 0, md: 3 },
      }}
    >
      {children}
    </Box>
  );
};
