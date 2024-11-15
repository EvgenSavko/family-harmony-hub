import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Card,
  CardActions,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useLocalStorage } from '../../shared';
import firstStepPC from '../../shared/static/images/install_step_1_PC.png';
import secondtStepPC from '../../shared/static/images/install_step_2_PC.png';
import firstStepBobile from '../../shared/static/images/step_1_mob_safari.jpg';
import secondStepBobile from '../../shared/static/images/step_1_mob_chrome.jpg';
import thirdStepBobile from '../../shared/static/images/step_2_mob.jpg';
import { grey } from '@mui/material/colors';

const color = grey[600];

const stepsMobile = [
  {
    description:
      'If you use Safari, please click on this sharing icon below the address bar of the web browser',
    imagePath: firstStepBobile,
  },
  {
    description:
      'If you use Chrome, please click on this sharing icon in the address bar of the web browser',
    imagePath: secondStepBobile,
  },
  {
    description:
      'Type the "Send to the desk top" option to start the installation on your desktop',
    imagePath: thirdStepBobile,
  },
];

const stepsPC = [
  {
    description:
      'Please click on this install icon in the address bar of your web browser',
    imagePath: firstStepPC,
  },
  {
    description:
      "Click the 'Install' button to start the installation on your desktop",
    imagePath: secondtStepPC,
  },
];

export const InstallGuide = () => {
  const [isDisplayInstallGuide, setIsDisplayInstallGuide] =
    useLocalStorage<boolean>('install_guide', true);

  const [isOpen, setIsOpen] = useState(isDisplayInstallGuide);
  const [stepIndex, setStepIndex] = useState(0);

  const isMobile = useMediaQuery('(max-width:600px)');
  const steps = isMobile ? stepsMobile : stepsPC;

  useEffect(() => {
    setStepIndex(0);
  }, [isMobile]);

  const handleClose = () => {
    setIsOpen(false);
    setStepIndex(0);
  };

  const handleCloseForLocalSession = () => {
    setIsDisplayInstallGuide(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Install guide</DialogTitle>
      <DialogContent>
        <Card>
          <Typography variant="body2" sx={{ padding: '2rem 1rem' }}>
            {steps[stepIndex].description}
          </Typography>
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              objectFit: 'contain',
              border: '1px solid',
              borderColor: color,
              boxSizing: 'border-box',
            }}
            image={steps[stepIndex].imagePath}
          />
          <CardActions
            sx={{
              justifyContent: 'center',
              padding: '2rem 0',
            }}
          >
            {stepIndex > 0 && (
              <Button
                variant="text"
                size="small"
                onClick={() => setStepIndex((prev) => prev - 1)}
              >
                Prev
              </Button>
            )}
            {stepIndex < steps.length - 1 && (
              <Button
                variant="contained"
                size="small"
                onClick={() => setStepIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            )}
            {stepIndex === steps.length - 1 && (
              <Button variant="contained" size="small" onClick={handleClose}>
                Close
              </Button>
            )}
          </CardActions>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseForLocalSession}>
          Don`t show it again
        </Button>
      </DialogActions>
    </Dialog>
  );
};
