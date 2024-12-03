import { ChangeEvent, useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { getUserFromFirebase, getFamilyFromFirebase } from '../../../shared';
import {
  Paper,
  Box,
  Zoom,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  LinearProgress,
  TextField,
  SelectChangeEvent,
  useMediaQuery,
  Button,
  ListItemAvatar,
  ListItem,
  ListItemText,
  List,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { TaskState } from '../../../shared';

const defaultTaskState: TaskState = {
  task_name: '',
  task_description: '',
  task_status: 'pending',
};

export const CreatingTab = () => {
  const [inProgress, setInProgress] = useState(true);
  const [taskState, setTaskState] = useState<TaskState>(defaultTaskState);
  const [taskListState, setTaskListState] = useState<TaskState[]>([]);

  const [familyMembers, setFamilyMembers] = useState<string[]>([]);
  const [assignToUser, setAssignToUser] = useState('');
  const [listNameToUser, setListNameToUser] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleAddTask = () => {
    const newTask = { ...taskState };
    setTaskListState((prev) => [newTask, ...prev]);
    setTaskState(defaultTaskState);
  };

  const handleChange = (
    name: string,
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setTaskState((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleCreateAndSend = async () => {
    setInProgress(true);
    getUserFromFirebase(assignToUser).then(async (userData: any) => {
      const tasksListObj = {
        tasks: taskListState,
        assignToUser: assignToUser,
        listNameToUser: listNameToUser,
        author: auth.currentUser?.email,
        id: Date.now(),
      };

      const docUsersRef = doc(db, 'users', assignToUser);

      if (Array.isArray(userData.tasks_list)) {
        const tasksList = [...userData.tasks_list];
        await updateDoc(docUsersRef, {
          tasks_list: [tasksListObj, ...tasksList],
        });
      }

      if (!userData.tasks_list) {
        await updateDoc(docUsersRef, {
          tasks_list: [{}],
        });
      }
      setInProgress(false);
    });
    setListNameToUser('');
    setAssignToUser('');
    setTaskListState([]);
  };

  const handleDeleteTask = (name: string) => {
    const filteredArray = [...taskListState].filter(
      (item) => item.task_name !== name
    );
    setTaskListState(filteredArray);
  };

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((userData: any) => {
      // Set default state if user does not have family and tasks_list
      if (userData && !userData?.tasks_list && !userData?.family_id) {
        setAssignToUser(userData.user_email);
        setFamilyMembers([userData.user_email]);
        setInProgress(false);
      }

      if (userData?.tasks_list && !userData?.family_id) {
        console.log('userData?.tasks_list', userData?.tasks_list);
        setInProgress(false);
      }

      // Get family members to set options to selector
      if (userData?.family_id) {
        getFamilyFromFirebase(userData.family_id).then((familyData) => {
          setFamilyMembers(familyData?.family_members || []);
          setInProgress(false);
        });
      }
    });
  }, [auth.currentUser?.email]);

  return (
    <Paper elevation={1} sx={{ mb: 3 }}>
      <Box>{inProgress && <LinearProgress />}</Box>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} p={{ xs: 2, md: 3 }} direction={'column'}>
            <Grid
              size={{ xs: 12 }}
              sx={{
                maxHeight: '400px',
                overflow: 'auto',
              }}
            >
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <Zoom in={!taskListState.length}>
                  <ListItem
                    sx={{
                      height: !taskListState.length ? 'auto' : '0px',
                      padding: !taskListState.length ? 'auto' : '0px',
                    }}
                  >
                    <ListItemText primary="Create a new list of tasks" />
                  </ListItem>
                </Zoom>
                {taskListState.map((item) => (
                  <Zoom in={true} key={item.task_name}>
                    <ListItem>
                      <ListItemText
                        sx={{ m: 0 }}
                        primary={item.task_name}
                        secondary={item.task_description}
                      />
                      <ListItemAvatar>
                        <IconButton
                          onClick={() => handleDeleteTask(item.task_name)}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </ListItemAvatar>
                    </ListItem>
                  </Zoom>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2} p={{ xs: 2, md: 3 }} direction={'column'}>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="Outlined"
                placeholder="Type the task name..."
                variant="outlined"
                label="Task name"
                fullWidth
                value={taskState['task_name']}
                onChange={(e) => handleChange('task_name', e)}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="Outlined"
                placeholder="Describe the task..."
                variant="outlined"
                label="Task description"
                multiline
                fullWidth
                rows={2}
                value={taskState['task_description']}
                onChange={(e) => handleChange('task_description', e)}
              />
            </Grid>

            <Grid size={{ xs: 12 }} display="flex" justifyContent={'end'}>
              <Button
                size="medium"
                variant="contained"
                fullWidth={isMobile}
                onClick={handleAddTask}
                disabled={!taskState['task_name']}
              >
                <PlaylistAddIcon fontSize="small" />{' '}
                <Box ml={1}>Add task to list</Box>
              </Button>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel id="user-email-label">Select user</InputLabel>
                <Select
                  labelId="user-email-label"
                  id="user-email-select"
                  value={assignToUser}
                  label="Select user"
                  onChange={(e) => setAssignToUser(e.target.value)}
                >
                  {familyMembers.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                name="Outlined"
                placeholder="Type the list name..."
                variant="outlined"
                label="Task list name"
                fullWidth
                value={listNameToUser}
                onChange={(e) => setListNameToUser(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }} display="flex" justifyContent={'end'}>
              <Button
                size="medium"
                variant="contained"
                fullWidth={isMobile}
                onClick={handleCreateAndSend}
                disabled={
                  !assignToUser || !taskListState.length || !listNameToUser
                }
              >
                <Box ml={1}>Create and assign</Box>
                <SendIcon fontSize="small" sx={{ ml: 1.5 }} />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
