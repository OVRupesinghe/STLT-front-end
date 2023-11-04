import React from 'react';
import { Button } from '@mui/material';

function ModalButton({ buttonText, type }) {
  let buttonStyles = {
    borderRadius: '4px',
    padding: '8px 24px',
    fontWeight: 'bold',
  };

  if (type === 'success') {
    buttonStyles.backgroundColor = '#10B981';
    buttonStyles.color = 'black';
  } else if (type === 'error') {
    buttonStyles.backgroundColor = '#EF4444';
    buttonStyles.color = 'white';
  } else if (type === 'primary') {
    buttonStyles.backgroundColor = '#60A5FA';
    buttonStyles.color = 'white';
  }

  return (
    <Button sx={buttonStyles} disableElevation>
      {buttonText}
    </Button>
  );
}

export default ModalButton;
