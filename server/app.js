const {Server}=require("socket.io");
const io=new Server(8000,{
    cors: true
});

io.on("connection",(socket)=>{
    socket.emit("user",socket.id);
    console.log("user connected",socket.id);

    socket.on("disconnect",(reason)=>{
        socket.broadcast.emit("user-disconnected",socket.id);
    })

    socket.on("first:called",({to,from,name:callerName,signalData})=>{
        io.to(to).emit("second:ack",{from,name:callerName,signal:signalData});
    })

    socket.on("second:call-accepted",(data)=>{
        socket.to(data.to).emit("fisrt:ack",data.signal);
    });
})