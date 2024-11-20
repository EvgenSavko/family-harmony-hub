import { Page } from '../../components';
import { useRerenderOnAuthStateChanged } from '../../shared';
import {
  Paper,
  Typography,
  Card,
  CardContent,
  Box,
  List,
  CardMedia,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import fhhFullSize from '../../shared/static/images/FHH_fullsize.png';

const listOfBenefits = [
  'Reduced Stress: "Less stress, more family time"',
  'Improved Communication: "Open and honest communication"',
  'Stronger Bonds: "Foster deeper connections"',
  'Organized Lifestyle: "A more organized and efficient family"',
];

export const Home = () => {
  const { isSignIn } = useRerenderOnAuthStateChanged();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  if (!isSignIn) return null;

  return (
    <Page isHomePage>
      <Typography variant="h4" gutterBottom color="primary">
        Home
      </Typography>

      <Paper elevation={1}>
        <Grid
          size={12}
          pt={2}
          pb={3}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
        >
          <Typography variant="h4">Harmonize Your Family Life:</Typography>
          <Typography pt={2} variant="h5">
            Simplify your family&apos;s life with our all-in-one platform.
          </Typography>
        </Grid>
      </Paper>

      <Box sx={{ margin: '2rem 0' }} />

      <Card sx={{ display: 'flex' }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                display: 'flex',
                height: '100%',
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}
              >
                <List>
                  {listOfBenefits.map((item) => (
                    <ListItem key={item}>
                      <ListItemIcon>
                        <AddReactionIcon color={'primary'} />
                      </ListItemIcon>
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
                <Button
                  sx={{ width: 'fit-content' }}
                  variant="contained"
                  onClick={() => navigate('/family-creating')}
                >
                  Get Started Today
                </Button>
              </CardContent>
            </Box>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={isMobile ? { order: -1 } : undefined}
          >
            <CardMedia
              component="img"
              sx={{ height: '100%', objectFit: 'cover', objectPosition: '40%' }}
              image={fhhFullSize}
              alt="Live from space album cover"
            />
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ margin: '2rem 0' }} />
      <Paper elevation={1}>
        <Grid
          size={12}
          pt={2}
          pb={2}
          pl={{ xs: 2, md: 3 }}
          pr={{ xs: 2, md: 3 }}
        >
          <Typography variant="h5">
            Quotes from{' '}
            <Box
              sx={(theme) => ({
                color: theme.palette.primary.main,
                display: 'inline',
              })}
            >
              <strong>satisfied</strong>
            </Box>{' '}
            users:
          </Typography>
        </Grid>
      </Paper>
    </Page>
  );
};
