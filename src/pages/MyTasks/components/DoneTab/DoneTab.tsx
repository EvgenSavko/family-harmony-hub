import { auth } from '../../../../firebase';
import { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Box,
  IconButton,
  Card,
  CardHeader,
  Zoom,
  List,
  Alert,
  ListItemText,
  LinearProgress,
  ListItem,
  CardContent,
} from '@mui/material';
import {
  getUserFromFirebase,
  TaskState,
  TaskAssignment,
} from '../../../../shared';
import Grid from '@mui/material/Grid2';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';

export const DoneTab = () => {
  const [inProgress, setInProgress] = useState(true);
  const [taskLists, setTaskLists] = useState<TaskAssignment[]>([]);

  const authUserEmail = auth.currentUser?.email;

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((userData: any) => {
      if (userData?.tasks_list) {
        const filteredTasksLists = [...(userData?.tasks_list || [])].filter(
          (item) => {
            return item.tasks.every(
              (task: TaskState) => task.task_status === 'done'
            );
          }
        );
        setTaskLists(filteredTasksLists);
      }
      setInProgress(false);
    });

    // Get family members to set options to selector
  }, [authUserEmail]);

  return (
    <>
      <Paper elevation={1}>
        <Box>{inProgress && <LinearProgress />}</Box>
        <Grid size={12} p={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">List of tasks I have been done.</Typography>
        </Grid>
      </Paper>

      <Grid container mt={3} spacing={3}>
        {taskLists.length === 0 && (
          <Alert sx={{ mt: 1 }} severity="info">
            There are no completed task lists.
          </Alert>
        )}
        {taskLists.map((item) => (
          <Grid size={{ lg: 4, sm: 6, xs: 12 }} key={item.id}>
            <Card
              key={item.id}
              sx={{
                width: 'auto',
                // maxWidth: 300,
                maxHeight: 400,
                flexShrink: 0,
                overflow: 'auto',
                height: 'auto',
              }}
            >
              <CardHeader
                title={item.listNameToUser}
                subheader={`Author: ${item.author}`}
                sx={(theme) => ({
                  '& .MuiCardHeader-title': {
                    color: theme.palette.success.main,
                  },
                })}
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
                          sx={{
                            m: 0,
                          }}
                          primary={task.task_name}
                          secondary={task.task_description}
                        />
                        <IconButton
                          sx={{ textAlign: 'end', pointerEvents: 'none' }}
                        >
                          {task.task_status === 'done' ? (
                            <CheckCircleOutlineIcon color="success" />
                          ) : (
                            <PanoramaFishEyeIcon />
                          )}
                        </IconButton>
                      </ListItem>
                    </Zoom>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
