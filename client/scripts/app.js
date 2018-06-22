// YOUR CODE HERE:
let app = {};

app.init = () => {
  $('#main').on('click', '.username', (event) => this.handleUsernameClick());
};

app.send = (msg) => {
  $.ajax({
    url: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(msg),
    contentType: 'application/json',
    success: (data) => {
      console.log('chatterbox: Message sent');
    },
    error: (data) => {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = () => {
  $.ajax({
    location: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: (data) => {
      console.log('chatterbox: Messages retrieved');
    },
    error: (data) => {
      console.log('chatterbox: Failed to retrieve messages');
    }
  });
};

app.clearMessages = () => {
  $('#chats').html('');
};

app.renderMessage = (msg) => {
  $('#chats').append(`<div class='username'>${ msg.username }: ${ msg.text }</div>`); // TODO: escape msg here
};

app.renderRoom = (roomName) => {
  $('#roomSelect').append(`<option value='${roomName}'>${roomName}</option>`);
};

app.handleUsernameClick = () => {
  console.log('hi');
};