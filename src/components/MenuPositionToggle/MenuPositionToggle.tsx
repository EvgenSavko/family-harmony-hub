import { useContext } from 'react';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { CoreContext } from '../../shared';

export const MenuPositionToggle = () => {
  const context = useContext(CoreContext);
  if (!context) {
    throw new Error('SomeComponent must be used within a CoreContextProvider');
  }

  const { state, setMenuPosition } = context;

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
        <FormLabel id="theme-toggle">Set menu button position</FormLabel>
        <RadioGroup
          aria-labelledby="heme-toggle"
          name="theme-toggle"
          row
          value={state.menuPosition}
          onChange={(event) =>
            setMenuPosition(event.target.value as 'left' | 'right')
          }
        >
          <FormControlLabel value="left" control={<Radio />} label="Left" />
          <FormControlLabel value="right" control={<Radio />} label="Right" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
