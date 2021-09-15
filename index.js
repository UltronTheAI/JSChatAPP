const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

var use = {};
var usedata = {};

app.set("view engine", "ejs");

app.get('/home', (req, res) => {
    res.render('home');
});

server.listen(3001, () => {
    console.log("Server running....");
});

io.on("connection", (socket) => {
    // console.log("User connected... user id = " + socket.id);

    socket.on("message", (data) => {
        // console.log("User id = {" + data[0] + "} send : " + data[1]);
        socket.broadcast.emit('message', data);
        if (data[1] == 'Join the chat...'){
            use[socket.id] = data[0];
        }
    });
    
    socket.on('disconnect', () =>{
        socket.broadcast.emit("message", [use[socket.id], "Leave the chat..."]);
    });
    
});