import React, { useContext } from "react";
import { Grid, Typography, Paper } from "@mui/material";
// import {makeStyles} from "@mui/styles"

import { SocketContext } from "./ProvideContext";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  return (
    <Grid container>
      {stream && (
        <Paper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}{" "}
            </Typography>
            <video playsInline muted ref={myVideo} autoPlay className={null} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}{" "}
            </Typography>
            <video playsInline ref={userVideo} autoPlay className={null} />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
