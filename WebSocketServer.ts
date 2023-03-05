import express from 'express';
import socketio, { Server } from 'socket.io';

const app = express();



//start express server
const server = app.listen(3000, () => {
  console.log('Server started on port 3000');
});



//initialize websocket server and attach express server to websocket server
const io = new Server(server, { cors: { origin: '*' } });


//dont need this rn
app.get("/", (req,res)=>{

  
})







//a socket is created for each client that connects
io.on('connect', (socket) => {

//---------these are done right when the socket is created (when client creates the socket)------//
  console.log("user connected")


  //each client has a unique socket id created. This is used to communicate with the client.
  console.log(socket.id)

  //join a lobby - in this case literally everyone who connects is in "lobby", but in a real case u add logic for what lobby they join
  socket.join("lobby");




//----under here is for events to listen to, the socket is specific to the client---//



    //listen for the event "sendMessage" the client HAS to send the same exact event name for the socket to recognize it
  socket.on('sendMessage', (data) => {

    //no logic for who to send it to yet u can work on that later, 
    //this sends it to everyone since EVERYONE who connects joins lobby (beginning of the connect it joins)
    //socket.broadcast.emit(event, data) can be used instead for this use case but i want to show joining lobbies


    io.to("lobby").emit('receiveMessage', { from: socket.id, message: data.message });
    //first it says .to "lobby", ya3ny everyone in "lobby" (literally everyone in our case)
    //then it emits 1. the event name, this event name HAS to be the same as the one the client is listening, casing and everything
    //the client will have a io.on for "receiveMessage" to accept this message/emition

  });




  //this listens for a "disconnect" event, this event is automatically sent by the user when they disconnect so u dont right this on the client side
  //web sockets has a lot of weird logic for when someone disconnects so read more about it
  socket.on('disconnect', () => {

    console.log(socket.id + ' disconnected');



  });





});
