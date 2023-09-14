import Peer from 'simple-peer';
import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io('http://localhost:8000');

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(); 
    const [myself, setMyself] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const userVideo = useRef();
    const myVideo = useRef();
    const connection=useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
            });

            socket.on("user",(id)=>{
                setMyself(id);
            })

            socket.on("callUser",({from,name:callerName,signal})=>{
                setCall({isReceivedCall:true,from,name:callerName,signal});
            });
    },[])

    const anserCall = () => {
        setCallAccepted(true);

        const peer=new Peer({
            initiator:false,
            trickle:false,
            stream
        })

        peer.on("signal",(data)=>{
            socket.emit("second:call-accepted",{signal:data,to:call.from});
        });

        peer.on("stream",(currentStream)=>{
            userVideo.current.srcObject=currentStream;
        })

        peer.signal(call.signal);

        connection.current=peer;
    }

    const callUser = (id) => { 
        const peer=new Peer({
            initiator:true,
            trickle:false,
            stream,
        })

        peer.on("signal",(data)=>{
            socket.emit("callUser",{
                to:id,
                from:myself,
                signalData:data,
                name
            });
        });

        peer.on("stream",(currentStream)=>{
            userVideo.current.srcObject=currentStream;

        })

        socket.on("fisrt:ack",(signal)=>{
            setCallAccepted(true);
            peer.signal(signal);
        })
        connection.current=peer;
    };

    const leaveCall = () => { 
        setCallEnded(true);
        connection.current.destroy();
        window.location.reload();
    };

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            myself,
            callUser,
            leaveCall,
            anserCall}}>
                {children}
            </SocketContext.Provider>        
    )    
}

export { ContextProvider, SocketContext };  