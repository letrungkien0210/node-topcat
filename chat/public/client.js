$(document).ready(function() {
    var socket = new WebSocket("ws://192.168.1.231:8086");

    socket.onmessage = function(msg) {
        console.log(msg);
        var data = JSON.parse(msg.data);

        switch(data.type) {
            case 'status':
                $("#status").text(data.text);
                break;
            case 'chat':
                $("#chat main").append(`<p><strong class="nick">${data.nick}</strong>: ${data.text}</p>`);
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

        $('input[name="message"]').val('')
    });
});