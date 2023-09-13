import React, { Children, useContext,useState } from 'react'
import {Button,TextField,Grid,Typography,Container,Paper} from "@mui/material"
import {CopyToClipboard} from "react-copy-to-clipboard"
import {Assignment,Phone,PhoneDisabled} from "@mui/icons-material"  

import { SocketContext } from './ProvideContext'

const Options = ({children}) => {
  const {myself,callAccepted,name,setName,callEnded,leaveCall,callUser} =useContext(SocketContext);
  const [idToCall,setIdToCall]=useState("");
  return (
    <Container>
      <Paper elevation={10}>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom> Account Info</Typography>
            <TextField label="Name" value={name} onChange={(e)=>setName(e.target.value)} fullWidth/>
            <CopyToClipboard text={myself}>
              <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large"/>}>
                Copy Your ID
              </Button>
            </CopyToClipboard>
          </Grid>
        </Grid>  
        <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom> Make A Call</Typography>
            <TextField label="ID to CallS" value={idToCall} onChange={(e)=>setIdToCall(e.target.value)} fullWidth/>
            {callAccepted && !callEnded ? (
              <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large"/>} fullWidth onClick={leaveCall} sx={{mt:3}}>
                Hang Up
              </Button>):(
              <Button variant="contained" color="primary" startIcon={<Phone fontSize="large"/>} fullWidth onClick={()=>callUser(idToCall)} sx={{mt:3}}>
                Call
              </Button>
              )}       
              </Grid>
      </form>
      {children}
      </Paper>
    </Container>
  )
}

export default Options