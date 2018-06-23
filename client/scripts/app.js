// YOUR CODE HERE:
$(document).ready(function() {
  console.log('ready');
  app.init();
})

let app = {
  server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
  friends: [],

};

app.init = function() {
  app.fetch();
    
  $('form').on('submit', function(event) {
    event.preventDefault();
    app.handleSubmit(event);
  });
}

app.send = function(msg) {
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
}

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    success: (data) => {
      console.log(data, 'data');
      _.each(data['results'], (result) => {
        this.renderMessage(result);
      });
      
      _.each(_.uniq(_.map(data['results'], (result) => {
        return result['roomname'];
      })), function(roomName) {
        app.renderRoom(roomName);
      });

      $('.username').on('click', (event) => app.handleUsernameClick(event));
      console.log('chatterbox: Messages retrieved', data);
    },
    error: (data) => {
      console.log('chatterbox: Failed to retrieve messages');
    }
  });
}

app.clearMessages = function() {
  $('#chats').html('');
},

app.renderMessage = function(msg) {
  $('#chats').append(`<div><span class='username ${ msg.username }'>${ msg.username }</span>: <span class='message'>${ msg.text }</span></div>`); // TODO: escape msg here
}

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<option value='${roomName}'>${roomName}</option>`);
}

app.handleUsernameClick = function(event) {
  $(`.${ event.target.textContent }`).addClass('friend');
  app.friends.push(event.target.textContent);
}

app.handleSubmit = function(event) {
  var msgUser = window.location.search.substring(10);
  var msgText = $('#message').val();
  var msgRoom = 
  console.log(msgUser);
  // app.send();
}
