$(document).ready(function() {
    var socket = new WebSocket("ws://localhost:8081");

    socket.onmessage = function(msg) {
        console.log(msg);
        var data = JSON.parse(msg.data);

        switch(data.type) {
            case 'status':
                $("#message").text(data.text);
                break;
            case 'chat':
                $("#chat").prepend(`<p><strong>${data.nick}</strong> ${data.text}</p>`);
                break;
            default:
                console.log(msg);
        }
    };

    $('form').on('submit', function(e) {
        e.preventDefault();

        let message = JSON.stringify({
            type: 'chat',
            nick: $('input[name="nick"]').val(),
            text: $('input[name="message"]').val()
        });

        console.log(message)

        socket.send(message);
    });
});