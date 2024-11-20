import { Page } from '../../components';
import { Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ThemeToggle } from '../../components';

export const Settings = () => {
  return (
    <Page isHomePage>
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
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <ThemeToggle />
        </Grid>
      </Paper>
    </Page>
  );
};
