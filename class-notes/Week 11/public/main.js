window.onload = () =>{
    const socket = io();

    const form = document.getElementById('form')
    const input = document.getElementById('input')

    form.addEventListener('submit', (event)=> {
        // emit sends a piece of data to our server
        event.preventDefault()
        /*
            1st Param : Name of the event we are sending. Whatever we want other than connect or disconnect
            2nd Param: The data we are sending
        */
        socket.emit('message', input.value);

        input.value = ''; //Removes the input text after submission

    })

    socket.on('Server sent data', (dataFromServer) => {
        // do something on the page with the new message
        const item = document.createElement('p');
        item.textContent = dataFromServer;
        const messages = document.getElementById('all-messages');
        messages.appendChild(item);
    });
}