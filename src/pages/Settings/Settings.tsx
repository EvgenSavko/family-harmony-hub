import { Page } from '../../components';
import { useState } from 'react';
import { Typography, Paper, Box, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ThemeToggle, ThemeColorEven } from '../../components';

export const Settings = () => {
  const [inProgress, setInProgress] = useState(true);
  return (
    <Page>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        pt={{ xs: 2, md: 0.5 }}
        pb={3}
      >
        Settings
      </Typography>

      <Paper elevation={1}>
        <Box>{inProgress && <LinearProgress />}</Box>
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <ThemeToggle />
        </Grid>
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <ThemeColorEven setInProgress={setInProgress} />
        </Grid>
      </Paper>
    </Page>
  );
};
