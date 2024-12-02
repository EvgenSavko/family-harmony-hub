import { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserFromFirebase, getFamilyFromFirebase } from '../../../shared';
import {
  Paper,
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Alert,
  List,
  ListItemText,
  LinearProgress,
  ListItem,
  IconButton,
  Zoom,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UserTasksList } from '../../../shared';

export const AssignedToFamily = () => {
  const [inProgress, setInProgress] = useState(true);
  const [taskListsOfMembers, setTaskListsOfMembers] = useState<UserTasksList[]>(
    []
  );

  const authUserEmail = auth.currentUser?.email;

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
  }, [authUserEmail]);

  const handleDelete = async (userId: number, id: number) => {
    setInProgress(true);
    const findUser = taskListsOfMembers.find((item) => item.id === userId);
    const assignedTo = findUser?.assignedTo;

    const filteredTasksList = [...(findUser?.tasks_list || [])].filter(
      (item) => item.id !== id
    );
    console.log('filteredTasksList', assignedTo, filteredTasksList);

    //Update tasks_list of iser
    if (assignedTo) {
      const docUsersRef = doc(db, 'users', assignedTo);

      if (filteredTasksList) {
        await updateDoc(docUsersRef, {
          tasks_list: [...filteredTasksList],
        });
      }
    }

    //Update state of  component

    const updatedTaskListsOfMembers = taskListsOfMembers.map((item) => {
      if (item.id === userId) {
        return { ...item, tasks_list: [...filteredTasksList] };
      }
      return item;
    });
    setTaskListsOfMembers(updatedTaskListsOfMembers);
    setInProgress(false);
  };

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
          <Typography variant="h6">Tasks for: {user.first_name}</Typography>
          {user.tasks_list.length ? (
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
                    position: 'relative',
                  }}
                >
                  {authUserEmail === item.author && (
                    <IconButton
                      sx={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '0.8rem',
                      }}
                      color="error"
                      onClick={() => handleDelete(user.id, item.id)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  )}
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
                            <IconButton
                              sx={{ textAlign: 'end', pointerEvents: 'none' }}
                            >
                              {task.task_status === 'done' ? (
                                <CheckCircleOutlineIcon color="success" />
                              ) : (
                                <AccessTimeIcon />
                              )}
                            </IconButton>
                          </ListItem>
                        </Zoom>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Alert sx={{ mt: 3 }} severity="info">
              There are no task lists.
            </Alert>
          )}
        </Box>
      ))}
    </>
  );
};
