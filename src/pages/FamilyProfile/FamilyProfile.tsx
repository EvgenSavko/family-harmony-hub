import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Fab,
  Paper,
  LinearProgress,
  Collapse,
  Divider,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Page } from '../../components';
import { useFamilyProfile } from './useFamilyProfile';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export const FamilyProfile = () => {
  const {
    familyMembers,
    isFamilyOwner,
    handleAddMember,
    expandedIndex,
    handleExpandClick,
    inProgress,
  } = useFamilyProfile();

  return (
    <Page>
      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        pt={{ xs: 2, md: 0.5 }}
        pb={3}
      >
        Family overview
      </Typography>
      <Paper elevation={1}>
        <Grid size={12} pt={{ xs: 2 }} pb={{ xs: 2 }} pl={{ xs: 2, md: 3 }}>
          <Typography variant="h5">Information about family members</Typography>
        </Grid>
      </Paper>
      <Box sx={{ width: '100%' }}>{inProgress && <LinearProgress />}</Box>
      <Box sx={{ flexGrow: 1, pt: 2, pb: 2 }}>
        <Grid container spacing={2}>
          {familyMembers.map((user, index) => (
            <Grid
              key={user.user_email}
              minHeight={160}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
            >
              <Card>
                <CardContent sx={{ pb: 0 }}>
                  <Typography
                    variant="body1"
                    sx={(theme) => ({
                      color: theme.palette.primary.main,
                    })}
                  >
                    <strong>Email:</strong> {user.user_email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>First name:</strong> {user.first_name}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Partnership:</strong> {user.relationship}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Birthday:</strong> {user.birthday}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Phone:</strong> {user.phone}
                  </Typography>

                  <Typography variant="body1">
                    <strong>Address ZIP/Posta:</strong> {user.address}
                  </Typography>
                </CardContent>

                <CardActions sx={{ pt: 0, pb: 0 }}>
                  <ExpandMore
                    expand={!!expandedIndex[index]}
                    onClick={() => handleExpandClick(index)}
                    aria-expanded={!!expandedIndex[index]}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse
                  in={!!expandedIndex[index]}
                  timeout="auto"
                  unmountOnExit
                >
                  <CardContent sx={{ pt: 0 }}>
                    <Divider sx={{ margin: '0.5rem 0' }} />
                    <Typography variant="body1">
                      <strong>Emergency phone:</strong> {user.emergency_phone}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Health conditions:</strong>{' '}
                      {user.health_conditions}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Blood type:</strong> {user.blood_type}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Medications:</strong> {user.medications}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Allergies:</strong> {user.allergies}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Doctor`s phone:</strong> {user.doctors_phone}
                    </Typography>
                    <Divider sx={{ margin: '0.5rem 0' }} />
                    <Typography variant="body1">
                      <strong>Goals dreams:</strong> {user.goals_dreams}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Lifestyle hobbies:</strong>{' '}
                      {user.lifestyle_hobbies}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
          {isFamilyOwner && (
            <Grid
              minHeight={160}
              p={{ xs: 0, md: 1 }}
              size={{
                xs: 12,
                md: 6,
                lg: 4,
              }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Fab
                variant="extended"
                color="primary"
                aria-label="add-member"
                onClick={handleAddMember}
              >
                <AddIcon /> Add member
              </Fab>
            </Grid>
          )}
        </Grid>
      </Box>
    </Page>
  );
};
