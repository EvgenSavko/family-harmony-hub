import { useState, SyntheticEvent } from 'react';
import { Page } from '../../components';
import { Typography, Tabs, Tab, Box, useMediaQuery } from '@mui/material';
import { AssignedToFamily, CreatingTab, FamilyDoneTab } from './components';

export const TaskCreating = () => {
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
        Create and assign tasks
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
          <Tab label="Create tasks list" />
          <Tab label="Assigned to family" />
          <Tab label="Completed task lists" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <CreatingTab />}
      {tabIndex === 1 && <AssignedToFamily />}
      {tabIndex === 2 && <FamilyDoneTab />}
    </Page>
  );
};
