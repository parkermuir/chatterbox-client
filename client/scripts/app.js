// YOUR CODE HERE:
let app = {
  init: function() {
    console.log('init');
    $('#main').on('click', '.username', (event) => app.handleUsernameClick(event));
  
    $('#send').on('submit', '.submit', function(event) {
      event.preventDefault();
      app.handleSubmit(event);
    });
  },
  
  send: function(msg) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(msg),
      contentType: 'application/json',
      success: (data) => {
        console.log('chatterbox: Message sent', data);
      },
      error: (data) => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  
  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log('chatterbox: Messages retrieved');
      },
      error: (data) => {
        console.log('chatterbox: Failed to retrieve messages');
      }
    });
  },
  
  clearMessages: function() {
    $('#chats').html('');
  },
  
  renderMessage: function(msg) {
    $('#chats').append(`<div><span class='username'>${ msg.username }</span>: <span class='message'>${ msg.text }</span></div>`); // TODO: escape msg here
  },
  
  renderRoom: function(roomName) {
    $('#roomSelect').append(`<option value='${roomName}'>${roomName}</option>`);
  },
  
  handleUsernameClick: function(event) {
    $(this).css('font-weight', "Bold");
  },
  
  handleSubmit: function(event) {
    console.log('handleSubmit');
  }
};

$(document).ready(function() {
  app.server = 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages';

  app.init();
});
