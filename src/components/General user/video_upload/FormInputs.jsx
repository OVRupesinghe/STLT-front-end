import Editor from './EditorDialog.jsx';
import ComplaintDialog from './ComplaintForm.jsx';
import UploadDialog from './UploadDialog.jsx';
import DeclarationForm from './DeclarationForm.jsx';
import useFormContext from  '../../../hooks/useFormContext';
import React from 'react';

export default function FormInputs() {
    const {page} = useFormContext();

    const display = {
       0: <UploadDialog />,
       1: <Editor/>,
       2: <ComplaintDialog />,
       3: <DeclarationForm />
    }

    return(
        <>
            {display[page]} 
        </>
    )
}