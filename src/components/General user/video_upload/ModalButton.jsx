import { Button } from '@mui/material'
import React from 'react'
import useFormContext from '../../../hooks/useFormContext';

function ModalButton({buttonText,type}) {
  
  const { page, setPage } = useFormContext();
  const handleNext = () => setPage(page + 1);

  let buttonClass = 'rounded px-12 py-3 font-bold';

  if (type === 'success') {
    buttonClass += ' bg-emerald-300 text-black';
  } else if (type === 'error') {
    buttonClass += ' bg-rose-400 text-white';
  } else if (type === 'primary') {
    buttonClass += ' bg-sky-500 text-white';
  } // Add more conditions for other types if needed type ==="success" ? 'bg-emerald-300 text-black' : 'bg-rose-400 text-white'} px-12 py-3  font-bold`

  return (
    <Button className={buttonClass} disableElevation onClick ={handleNext} >
        {buttonText}
    </Button>
  )
}

export default ModalButton