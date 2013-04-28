var ws = require("websocket.io");
var server = ws.listen(8889,
  function () {
    console.log("ws start");
  }
);

server.on("connection",
  function(socket) {
    socket.on("message",
      function(data) {
        console.log("message " + data);
        server.clients.forEach(
          function(client) {
            if(client){
              client.send(data);
            }
          }
        );
      }
    );
  }
);
