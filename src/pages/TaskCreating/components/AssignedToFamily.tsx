import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { getUserFromFirebase, getFamilyFromFirebase } from '../../../shared';
import {
  Paper,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  List,
  ListItemText,
  LinearProgress,
  ListItem,
  IconButton,
  Zoom,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { UserTasksList } from '../../../shared';

export const AssignedToFamily = () => {
  const [inProgress, setInProgress] = useState(true);
  const [taskListsOfMembers, setTaskListsOfMembers] = useState<UserTasksList[]>(
    []
  );

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((userData: any) => {
      if (userData?.tasks_list && !userData?.family_id) {
        setTaskListsOfMembers((prev) => [
          ...prev,
          {
            assignedTo: userData.user_email,
            tasks_list: userData.tasks_list,
            id: Date.now(),
            first_name: userData.first_name,
          },
        ]);
        setInProgress(false);
      }

      // Get family members to set options to selector
      if (userData?.family_id) {
        getFamilyFromFirebase(userData.family_id).then((familyData) => {
          familyData?.family_members?.forEach(async (userEmail: string) => {
            const data = await getUserFromFirebase(userEmail);
            if (data && data.tasks_list) {
              setTaskListsOfMembers((prev) => [
                ...prev,
                {
                  assignedTo: userEmail,
                  tasks_list: data.tasks_list,
                  id: Date.now(),
                  first_name: data.first_name,
                },
              ]);
            }
            setInProgress(false);
          });
        });
      }
    });
  }, [auth.currentUser?.email]);

  return (
    <>
      <Paper elevation={1} sx={{ mb: 3 }}>
        <Box>{inProgress && <LinearProgress />}</Box>
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">Assigned to family members:</Typography>
        </Grid>
      </Paper>
      {taskListsOfMembers.map((user) => (
        <Box key={user.id} sx={{ mb: 3 }}>
          <Typography variant="h5">Tasks for: {user.first_name}</Typography>
          <Box
            component="div"
            sx={{
              mb: 3,
              pb: 3,
              pt: 3,
              display: 'flex',
              gap: '1em',
              overflowX: 'auto',
              minHeight: 400,
              scrollSnapType: 'x mandatory',
            }}
          >
            {user.tasks_list?.map((item) => (
              <Card
                key={item.id}
                sx={{
                  width: 'auto',
                  maxWidth: 300,
                  scrollSnapAlign: 'start',
                  flexShrink: 0,
                  aspectRatio: '3 / 2',
                  overflow: 'auto',
                }}
              >
                <CardHeader
                  title={item.listNameToUser}
                  subheader={`Author: ${item.author}`}
                />
                <CardContent>
                  <List
                    sx={{
                      width: '100%',
                      bgcolor: 'background.paper',
                      mb: 3,
                    }}
                  >
                    {item.tasks.map((task) => (
                      <Zoom in={true} key={task.task_name}>
                        <ListItem>
                          <ListItemText
                            sx={{ m: 0 }}
                            primary={task.task_name}
                            secondary={task.task_description}
                          />
                          <IconButton sx={{ textAlign: 'end' }}>
                            <AccessTimeIcon />
                          </IconButton>
                        </ListItem>
                      </Zoom>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );
};
