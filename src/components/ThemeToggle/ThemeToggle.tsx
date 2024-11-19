import React from 'react';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { useColorScheme } from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';

export const ThemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }
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
        <FormLabel id="theme-toggle">Theme</FormLabel>
        <RadioGroup
          aria-labelledby="heme-toggle"
          name="theme-toggle"
          row
          value={mode}
          onChange={(event) =>
            setMode(event.target.value as 'system' | 'light' | 'dark')
          }
        >
          <FormControlLabel
            value="system"
            control={<Radio icon={<WysiwygIcon />} />}
            label="System"
          />
          <FormControlLabel
            value="light"
            control={<Radio icon={<LightModeIcon />} />}
            label="Light"
          />
          <FormControlLabel
            value="dark"
            control={<Radio icon={<NightlightIcon />} />}
            label="Dark"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
