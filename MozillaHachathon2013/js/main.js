$(function(){
  $("#install").on("click",function(){
    if(navigator.mozApps){
      // 現在のアプリに関する情報を取得する
      var app = navigator.mozApps.getSelf();
      app.onsuccess = function() {
        console.log(app.result);
        if (app.result) {
          // インストール済み
          console.log("installed.");
          return;
        } else {
          // 未インストール
          console.log("not install.")
          var request = navigator.mozApps.install("http://localhost:8888/MozillaHachathon2013/manifest.webapp");
          request.onsuccess = function() {
            console.log("Success!")
          };
          request.onerror = function() {
            console.log("Error!")
          };
        }
      };
      app.onerror = function() {
        alert('インストール状況の確認時にエラーが発生しました: ' + this.error.message);
      }
    }
  });

  var battery = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
  function updateBatteryStatus() {
    alert("Battery status: " + battery.level * 100 + " %");

    if (battery.charging) {
      alert("Battery is charging");
    }
  }
  $("#battery").on("click",updateBatteryStatus);


  var host = "ws://localhost:8889";
  var socket = new WebSocket(host);
  socket.onmessage = function(message){
    $("#receive").prepend("<p><img src='img/head05.png' alt='' /><span class='arrow_box'>" + message.data + "</span></p>")
    console.log(message.data);
  }
  $("#sendBtn").on("click",function(){
    message = $("#message").val()
    socket.send(message);
  });

})
