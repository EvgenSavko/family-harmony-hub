import { useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { Page } from '../../components';
import { doc, updateDoc } from 'firebase/firestore';
import { Link as NavLnk } from 'react-router-dom';
import { db, auth } from '../../firebase';
import {
  Typography,
  Box,
  useTheme,
  Button,
  Paper,
  Snackbar,
  Dialog,
  LinearProgress,
  Link,
  DialogTitle,
  TextField,
  FormGroup,
  FormControlLabel,
  useMediaQuery,
  Checkbox,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { nationalEvents } from './data';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getUserFromFirebase, getFamilyFromFirebase } from '../../shared';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './FamilyCalendar.styles.scss';
import {
  red,
  teal,
  pink,
  purple,
  cyan,
  lightGreen,
  lime,
  yellow,
  amber,
  brown,
} from '@mui/material/colors';

moment.locale();
const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date | number;
  end: Date | number;
  desc?: string;
  author?: string;
}

interface SelectDate {
  start: Date;
  end: Date;
}

interface ColorEvent {
  author: string;
  color:
    | 'default'
    | 'cyan'
    | 'teal'
    | 'red'
    | 'pink'
    | 'purple'
    | 'lime'
    | 'yellow'
    | 'amber'
    | 'lightGreen'
    | 'brown';
}

export const FamilyCalendar = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [openEvent, setOpenEvent] = useState<Event | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openFullDialog, setOpenFullDialog] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDateStart, setEventDateStart] = useState<SelectDate | null>(null);
  const [inProgress, setInProgress] = useState(true);
  const [colorEventList, setColorEventList] = useState<ColorEvent[]>([]);
  const [startEvent, setStartEvent] = useState('');
  const [endEvent, setEndEvent] = useState('');
  const [withStartTime, setWithStartTime] = useState('date');
  const [withEndTime, setWithEndTime] = useState('date');

  const isMobile = useMediaQuery('(max-width:600px)');

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const numberOfColor = theme.palette.mode === 'light' ? 700 : 500;

  const colorState = {
    default: '',
    cyan: cyan[numberOfColor],
    teal: teal[numberOfColor],
    red: red[numberOfColor],
    pink: pink[numberOfColor],
    purple: purple[numberOfColor],
    lime: lime[numberOfColor],
    yellow: yellow[numberOfColor],
    amber: amber[numberOfColor],
    lightGreen: lightGreen[numberOfColor],
    brown: brown[numberOfColor],
  };

  useEffect(() => {
    if (openDialog) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0);
    }
  }, [openDialog]);

  const handleSelect = ({ start, end }: { start: Date; end: Date }) => {
    setOpenDialog(true);
    setEventDateStart({ start, end });
  };

  const handleSelectEvent = (event: Event) => {
    const author = eventsData.find((item) => item.id === event.id)?.author;
    setOpenEvent({ ...event, author });
  };

  const handleClose = () => {
    setOpenEvent(null);
  };

  const updateUsers = async (eventList: Event[]) => {
    if (auth.currentUser?.email) {
      const docUsersRef = doc(db, 'users', auth.currentUser?.email);

      await updateDoc(docUsersRef, {
        event_list: eventList,
      });
    }
  };

  const setEventToList = async (title: string) => {
    if (eventDateStart?.start) {
      const newEvent: Event = {
        id: Date.now(), // Generate a unique ID
        start: eventDateStart?.start,
        end: eventDateStart?.end,
        title,
        author: auth.currentUser?.email || '',
      };
      if (title) {
        setEventsData([...eventsData, newEvent]);
        const eventsWithTimeStamp: Event[] = [...eventsData, newEvent].map(
          (item) => ({
            ...item,
            start: moment(item.start).valueOf(),
            end: moment(item.end).valueOf(),
          })
        );
        const eventsWithTimeStampFiltered = [...eventsWithTimeStamp].filter(
          (item) => item.author === auth.currentUser?.email
        );
        await updateUsers(eventsWithTimeStampFiltered);
      }
      setEventName('');
      setEventDateStart(null);
    }
  };

  const handleCloseDialog = (inputValue: string, eventKey: string) => {
    if (eventKey === 'Enter') {
      setEventToList(inputValue);
    } else {
      setEventToList(eventName);
    }

    setOpenDialog(false);
    setOpenFullDialog(false);
  };

  const handleDelete = async () => {
    const newEventsData = [...eventsData].filter(
      (event) => event.id !== openEvent?.id
    );

    const newEventsDataForUser = [...eventsData].filter(
      (event) =>
        event.id !== openEvent?.id && event?.author === auth.currentUser?.email
    );

    setEventsData(newEventsData);

    const eventsWithTimeStamp: Event[] = newEventsDataForUser.map((item) => ({
      ...item,
      start: moment(item.start).valueOf(),
      end: moment(item.end).valueOf(),
    }));
    setOpenEvent(null);
    await updateUsers(eventsWithTimeStamp);
  };

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((userData) => {
      if (userData?.color_event && !userData?.family_id) {
        setColorEventList([
          { color: userData?.color_event, author: userData?.user_email },
        ]);
      }

      if (userData?.event_list && !userData?.family_id) {
        const eventsWithDate: Event[] = userData.event_list.map(
          (item: Event) => ({
            ...item,
            start: moment(item.start).toDate(),
            end: moment(item.end).toDate(),
          })
        );
        setEventsData(eventsWithDate);
        setInProgress(false);
      }

      if (userData?.family_id) {
        getFamilyFromFirebase(userData.family_id).then((familyData) => {
          familyData?.family_members?.forEach(async (userEmail: string) => {
            const data = await getUserFromFirebase(userEmail);
            if (data && data.event_list) {
              const eventsWithDate: Event[] = data.event_list?.map(
                (item: Event) => ({
                  ...item,
                  start: moment(item.start).toDate(),
                  end: moment(item.end).toDate(),
                })
              );
              setEventsData((prev: any) => [...prev, ...eventsWithDate]);
              const eventColorObj = {
                color: data?.color_event,
                author: data?.user_email,
              };

              setColorEventList((prev: any) => [...prev, eventColorObj]);
            }
            setInProgress(false);
          });
        });
      }
    });
  }, [auth.currentUser?.email]);

  const action = (
    <Box display={'flex'}>
      {openEvent?.author === auth.currentUser?.email && (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleDelete}
          sx={{ mr: 1.5 }}
        >
          Delete
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );

  const message = (
    <>
      <Typography variant="body1" gutterBottom>
        {openEvent?.title}
      </Typography>
      <Typography variant="body2">Author: {openEvent?.author}</Typography>
      {openEvent?.start && (
        <Typography variant="body2">
          Start: {moment(openEvent?.start).format('HH:mm DD/MM/YYYY')}
        </Typography>
      )}
      {openEvent?.end && (
        <Typography variant="body2">
          End: {moment(openEvent?.end).format('HH:mm DD/MM/YYYY')}
        </Typography>
      )}
    </>
  );

  const eventPropGetter = (event: any) => {
    const colorEvent: ColorEvent | undefined = colorEventList.find(
      (item) => item.author === event.author
    );
    const backgroundColor = colorState[colorEvent?.color || 'default'];
    return {
      style: { backgroundColor },
    };
  };

  return (
    <Page>
      <Snackbar
        open={!!openEvent}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        sx={{ '&.MuiPaper-root': { padding: '2rem' } }}
      />
      <Dialog onClose={handleCloseDialog} open={openDialog}>
        <DialogTitle>Set new event to calendar</DialogTitle>
        <Box pt={1} p={3}>
          <TextField
            label="Event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            variant="outlined"
            onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
              if (event.key === 'Enter') {
                const inputValue = (event.target as HTMLInputElement).value;
                handleCloseDialog(inputValue, 'Enter');
              }
            }}
            fullWidth
            inputRef={inputRef}
          />
        </Box>
      </Dialog>
      <Dialog open={openFullDialog} onClose={handleCloseDialog}>
        <Grid container pt={1} p={3}>
          <DialogTitle>Set new event to calendar</DialogTitle>
          <Grid size={12}>
            <TextField
              label="Event name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              variant="outlined"
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                  const inputValue = (event.target as HTMLInputElement).value;
                  handleCloseDialog(inputValue, 'Enter');
                }
              }}
              fullWidth
              inputRef={inputRef}
              sx={{ mb: 3 }}
            />
          </Grid>

          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 9 }}>
                <TextField
                  label="Start event"
                  type={withStartTime}
                  variant="outlined"
                  fullWidth
                  value={startEvent}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    setStartEvent(e.target.value);
                    setEventDateStart((prev: any) => ({
                      ...prev,
                      start: moment(e.target.value).toDate(),
                    }));
                  }}
                  sx={{ mb: 3 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withStartTime !== 'date'}
                        onChange={() =>
                          setWithStartTime((prev) =>
                            prev === 'date' ? 'datetime-local' : 'date'
                          )
                        }
                      />
                    }
                    label="With time"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 9 }}>
                <TextField
                  label="End event"
                  type={withEndTime}
                  variant="outlined"
                  fullWidth
                  value={endEvent}
                  onChange={(
                    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                  ) => {
                    setEndEvent(e.target.value);
                    setEventDateStart((prev: any) => ({
                      ...prev,
                      end: moment(e.target.value).toDate(),
                    }));
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 3 }}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withEndTime !== 'date'}
                        onChange={() =>
                          setWithEndTime((prev) =>
                            prev === 'date' ? 'datetime-local' : 'date'
                          )
                        }
                      />
                    }
                    label="With time"
                  />
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>

      <Typography
        variant="h4"
        color="primary"
        gutterBottom
        pt={{ xs: 2, md: 0.5 }}
        pb={3}
      >
        Family calendar
      </Typography>
      <Paper elevation={1} sx={{ padding: 2, mb: 2 }}>
        <NavLnk to="/settings">
          <Link>Change the color of your events</Link>
        </NavLnk>
      </Paper>

      <Box
        className={`family-calendar-wrapper family-calendar-${theme.palette.mode}-wrapper`}
      >
        <Box sx={{ width: '100%', position: 'relative' }}>
          {inProgress && (
            <LinearProgress sx={{ position: 'absolute', width: '100%' }} />
          )}
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Calendar
            views={['day', 'agenda', 'work_week', 'month']}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={[...eventsData, ...nationalEvents]}
            style={{ height: '100vh' }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelect}
            eventPropGetter={eventPropGetter}
          />
          <Button
            sx={{
              zIndex: 4,
              position: 'fixed',
              bottom: 30,
              left: isMobile ? '25%' : '50%',
            }}
            size="large"
            variant="contained"
            onClick={() => setOpenFullDialog(true)}
          >
            Add event to calendar
          </Button>
        </Box>
      </Box>
    </Page>
  );
};
