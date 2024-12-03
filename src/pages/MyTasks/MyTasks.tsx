import { Page } from '../../components';
import { useState, SyntheticEvent } from 'react';
import { Typography, Box, Tabs, Tab, useMediaQuery } from '@mui/material';
import { InProcessTab, DoneTab } from './components';
export const MyTasks = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

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

      <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 1, mb: 0.5 }}>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          centered
          variant={isMobile ? 'scrollable' : undefined}
          sx={{
            paddingTop: '1rem',
          }}
        >
          <Tab label="In process" />
          <Tab label="Done" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <InProcessTab />}
      {tabIndex === 1 && <DoneTab />}
    </Page>
  );
};
