import { Page } from '../../components';
import {
  Typography,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  LinearProgress,
  Box,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useProfile } from './Profile.hooks';

export const Profile = () => {
  const {
    userEmail,
    userState,
    handleChange,
    phoneInputStyle,
    bloodTypesOptions,
    inProgress,
  } = useProfile();

  return (
    <Page>
      <Typography variant="h4" color="primary" gutterBottom>
        Profile
      </Typography>

      <Paper elevation={1}>
        <Box sx={{ width: '100%' }}>
          {inProgress && (
            <LinearProgress
              sx={{ position: 'fixed', width: '100%', bottom: 0 }}
            />
          )}
        </Box>
        <Grid size={12} pt={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">Personal information</Typography>
        </Grid>
        <Grid
          size={12}
          pt={{ xs: 1, md: 2 }}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
        >
          <TextField
            label="Email"
            value={userEmail}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid container spacing={2} p={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="First name"
              value={userState['first_name']}
              onChange={(e) => handleChange('first_name', e)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Last name"
              variant="outlined"
              fullWidth
              value={userState['last_name']}
              onChange={(e) => handleChange('last_name', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Birthday"
              type="date"
              variant="outlined"
              fullWidth
              sx={phoneInputStyle}
              value={userState['birthday']}
              onChange={(e) => handleChange('birthday', e)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
          pb={{ xs: 2, md: 3 }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Phone"
              type="tel"
              variant="outlined"
              fullWidth
              sx={phoneInputStyle}
              value={userState['phone']}
              onChange={(e) => handleChange('phone', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Emergency phone"
              variant="outlined"
              fullWidth
              type="number"
              sx={phoneInputStyle}
              value={userState['emergency_phone']}
              onChange={(e) => handleChange('emergency_phone', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Address, City, State, ZIP/Postal"
              variant="outlined"
              fullWidth
              value={userState['address']}
              onChange={(e) => handleChange('address', e)}
            />
          </Grid>
        </Grid>

        <Grid size={12} pt={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">Medical information</Typography>
        </Grid>
        <Grid container spacing={2} p={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              name="Outlined"
              placeholder="Describe health conditions…"
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={userState['health_conditions']}
              onChange={(e) => handleChange('health_conditions', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel id="blood-type-select-helper-label">
                Blood type
              </InputLabel>
              <Select
                labelId="blood-type-select-helper-label"
                id="demo-simple-select-helper"
                value={userState['blood_type']}
                label="Blood type"
                onChange={(e) => handleChange('blood_type', e)}
              >
                {bloodTypesOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              name="Outlined"
              placeholder="Describe the medications you are taking…"
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={userState['medications']}
              onChange={(e) => handleChange('medications', e)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
          pb={{ xs: 2, md: 3 }}
        >
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              name="Outlined"
              placeholder="Describe your allergies or intolerance…"
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={userState['allergies']}
              onChange={(e) => handleChange('allergies', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              name="Outlined"
              label="Personal doctor`s phone"
              variant="outlined"
              fullWidth
              type="number"
              sx={phoneInputStyle}
              value={userState['doctors_phone']}
              onChange={(e) => handleChange('doctors_phone', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}></Grid>
        </Grid>
        <Grid size={12} pt={{ xs: 1, md: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">Personal Statement</Typography>
        </Grid>
        <Grid container spacing={2} p={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              name="Outlined"
              placeholder="Describe your goals or dreams…"
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={userState['goals_dreams']}
              onChange={(e) => handleChange('goals_dreams', e)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              name="Outlined"
              placeholder="Describe your lifestyle or hobbies…"
              variant="outlined"
              multiline
              fullWidth
              rows={2}
              value={userState['lifestyle_hobbies']}
              onChange={(e) => handleChange('lifestyle_hobbies', e)}
            />
          </Grid>
        </Grid>
      </Paper>
    </Page>
  );
};
