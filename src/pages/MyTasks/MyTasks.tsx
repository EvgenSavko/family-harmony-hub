import { Page } from '../../components';
import { useState } from 'react';
import { Typography, Paper, Box, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const MyTasks = () => {
  const [inProgress, setInProgress] = useState(true);

  setTimeout(() => setInProgress(false), 1000);
  return (
    <Page>
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        pt={{ xs: 2, md: 0.5 }}
        pb={3}
      >
        My tasks
      </Typography>

      <Paper elevation={1}>
        <Box>{inProgress && <LinearProgress />}</Box>
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          Lists of my tasks
        </Grid>
      </Paper>
    </Page>
  );
};
