// YOUR CODE HERE:
let app = {};

app.init = function() {
  $('#main').on('click', '.username', this.handleUsernameClick);

  $('#send').on('submit', '.submit', this.handleSubmit);
};

app.send = function(msg) {
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

app.fetch = function() {
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

app.clearMessages = function() {
  $('#chats').html('');
};

app.renderMessage = function(msg) {
  $('#chats').append(`<div class='username'>${ msg.username }: ${ msg.text }</div>`); // TODO: escape msg here
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<option value='${roomName}'>${roomName}</option>`);
};

app.handleUsernameClick = function(event) {
  console.log('usernameClick');
};

app.handleSubmit = function(event) {
  console.log('handleSubmit');
  event.preventDefault();
};