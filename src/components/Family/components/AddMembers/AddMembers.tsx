import {
  LinearProgress,
  Box,
  Typography,
  Zoom,
  TextField,
  Fab,
  FormControl,
  Select,
  MenuItem,
  Divider,
  InputLabel,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useAddMembers } from './AddMembers.hooks';

export const AddMembers = () => {
  const {
    handleChange,
    createFamily,
    handleDeleteMember,
    handleAddMember,
    isLoading,
    isMobile,
    rolesOptions,
    userState,
    membersV2,
  } = useAddMembers();

  if (isLoading)
    return (
      <Grid size={12} minHeight={'5.8rem'}>
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      </Grid>
    );

  return (
    <>
      <Grid
        size={12}
        pt={{ xs: 3, md: 2 }}
        pb={{ xs: 1, md: 1 }}
        pl={{ xs: 2, md: 3 }}
        mb={2}
      >
        <Typography variant="h5">Add new members to you family</Typography>
      </Grid>

      <Zoom in={!!membersV2.length}>
        <Grid size={12} pb={{ xs: 1, md: 1 }} pl={{ xs: 2, md: 3 }} mb={2}>
          <Typography variant="subtitle1">
            List of new family members
          </Typography>
        </Grid>
      </Zoom>

      {membersV2.map((user, index) => (
        <Zoom in={true} key={user.email}>
          <Grid
            container
            spacing={2}
            pl={{ xs: 2, md: 3 }}
            pr={{ xs: 2, md: 3 }}
            pb={3}
          >
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                label="Email"
                value={user.email}
                disabled
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <FormControl fullWidth>
                <InputLabel id="role-type-select-helper-label">Role</InputLabel>
                <Select
                  labelId="role-type-select-helper-label"
                  value={user.role}
                  label="Role"
                  disabled
                >
                  {rolesOptions.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <Fab
                color="error"
                aria-label="delete"
                onClick={() => handleDeleteMember(index)}
                variant={isMobile ? 'extended' : undefined}
                sx={isMobile ? { width: '100%' } : {}}
              >
                <DeleteIcon />
              </Fab>
            </Grid>
          </Grid>
        </Zoom>
      ))}
      <Divider />
      <Grid
        container
        spacing={2}
        pt={3}
        pl={{ xs: 2, md: 3 }}
        pr={{ xs: 2, md: 3 }}
        pb={3}
      >
        <Grid size={{ xs: 12, md: 5 }}>
          <TextField
            label="Email"
            value={userState['email']}
            onChange={(e) => handleChange('email', e)}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <FormControl fullWidth>
            <InputLabel id="role-type-select-helper-label">Role</InputLabel>
            <Select
              labelId="role-type-select-helper-label"
              value={userState['role']}
              label="Role"
              onChange={(e) => handleChange('role', e)}
            >
              {rolesOptions.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleAddMember}
            variant={isMobile ? 'extended' : undefined}
            sx={isMobile ? { width: '100%' } : {}}
            disabled={!userState['email'] || !userState['role']}
          >
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        pl={{ xs: 2, md: 3 }}
        pr={{ xs: 2, md: 3 }}
        pb={3}
        justifyContent={'center'}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <Button
            size={isMobile ? 'large' : 'medium'}
            variant="contained"
            fullWidth={isMobile}
            onClick={createFamily}
            disabled={membersV2.length === 0}
          >
            <GroupAddIcon fontSize="small" />{' '}
            <Box ml={1}>Add member{membersV2.length < 2 ? '' : 's'}</Box>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
