import {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Box,
  FormLabel,
  FormControlLabel,
  FormControl,
  useTheme,
  Radio,
  RadioGroup,
} from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { auth, db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserFromFirebase } from '../../shared';
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

interface ThemeColorEvenProps {
  setInProgress: Dispatch<SetStateAction<boolean>>;
}

export const ThemeColorEven = ({ setInProgress }: ThemeColorEvenProps) => {
  const [color, setColor] = useState('default');
  const theme = useTheme();

  const numberOfColor = theme.palette.mode === 'light' ? 700 : 500;

  const colorList = [
    { label: 'Cyan', color: cyan[numberOfColor], value: 'cyan' },
    { label: 'Teal', color: teal[numberOfColor], value: 'teal' },
    { label: 'Red', color: red[numberOfColor], value: 'red' },
    { label: 'Pink', color: pink[numberOfColor], value: 'pink' },
    { label: 'Purple', color: purple[numberOfColor], value: 'purple' },
    { label: 'Lime', color: lime[numberOfColor], value: 'lime' },
    { label: 'Yellow', color: yellow[numberOfColor], value: 'yellow' },
    { label: 'Amber', color: amber[numberOfColor], value: 'amber' },
    {
      label: 'LightGreen',
      color: lightGreen[numberOfColor],
      value: 'lightGreen',
    },
    { label: 'brown', color: brown[numberOfColor], value: 'brown' },
  ];

  const updateUserColorEvent = async (color: string) => {
    if (auth.currentUser?.email) {
      const docUsersRef = doc(db, 'users', auth.currentUser?.email);

      await updateDoc(docUsersRef, {
        color_event: color,
      });
    }
  };

  const handleToggler = async (event: ChangeEvent<HTMLInputElement>) => {
    setColor(
      event.target.value as
        | 'default'
        | 'red'
        | 'lightGreen'
        | 'brown'
        | 'teal'
        | 'pink'
        | 'purple'
        | 'lime'
        | 'amber'
        | 'yellow'
    );
    await updateUserColorEvent(event.target.value);
  };

  useEffect(() => {
    setInProgress(true);
    getUserFromFirebase().then((userData) => {
      if (userData?.color_event) {
        setColor(userData?.color_event);
      }
      setInProgress(false);
    });
  }, [auth.currentUser?.email]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'start',
        color: 'text.primary',
        borderRadius: 1,
      }}
    >
      <FormControl>
        <FormLabel id="theme-color-event">Select color event</FormLabel>
        <RadioGroup
          aria-labelledby="theme-color-event"
          name="theme-color-event"
          row
          value={color}
          onChange={handleToggler}
        >
          <FormControlLabel
            value="default"
            control={
              <Radio
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                })}
                icon={<ColorLensIcon />}
              />
            }
            label="Default"
            sx={(theme) => ({
              color: theme.palette.primary.main,
            })}
          />
          {colorList.map((colorItem) => (
            <FormControlLabel
              key={colorItem.value}
              value={colorItem.value}
              control={
                <Radio
                  sx={{
                    color: colorItem.color,
                    '&.Mui-checked': {
                      color: colorItem.color,
                    },
                  }}
                  icon={<ColorLensIcon />}
                />
              }
              label={colorItem.label}
              sx={{
                color: colorItem.color,
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
