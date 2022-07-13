import React from 'react'
import {Box} from '@mui/material'
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function Main() {
  return (
    <Box sx={{width:'65%',
    background:'rgba(33, 235, 255, 0.4)',
    m:5,
    pb:10,
    pt:10,
    borderRadius:'25px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'}}>

        <TextareaAutosize
        aria-label="empty textarea"
        placeholder="/* Paste your code here */"
        minRows={10}
        style={{  minWidth: '50%', maxWidth:'90%',mt:10, mb:10, borderRadius:'15px' }}
        />

    </Box>
  )
}
