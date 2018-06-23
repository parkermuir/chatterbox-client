// YOUR CODE HERE:
$(document).ready(function() {
  console.log('ready');
  app.init();
})

let app = {
  server: 'http://parse.nyc.hackreactor.com/chatterbox/classes/messages',
  friends: [],
  currRoom: undefined,
};

app.init = function() {
  app.fetch();
    
  $('form').on('submit', function(event) {
    event.preventDefault();
    app.handleSubmit(event);
  });

  $('select').on('change', function(event) {
    app.currRoom = $(this).val();
    app.fetch();
    console.log(app.currRoom);
  })

  $('#home').on('click', function(event) {
    app.currRoom = undefined;
    app.fetch();
  })
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
    data: { order: '-createdAt' },
    contentType: 'application/json',
    success: (data) => {
      console.log(data, 'data');
      $('#chats').html('');
      $('#roomSelect').html('');
      var renderMessages = data['results'];

      if (app.currRoom !== undefined) {
        renderMessages = _.filter(data['results'], (result) => {
          return result['roomname'] === app.currRoom;
        });
        console.log(renderMessages);
      }
      _.each(renderMessages, (result) => {
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
  $('#chats').append(`<div><span class='username ${ app._htmlProtect(msg.username) }'>${ app._htmlProtect(msg.username) }: ${ app._htmlProtect(msg.text) }</span></div>`); // TODO: escape msg here
}

app.renderRoom = function(roomName) {
  $('#roomSelect').append(`<option value='${ app._htmlProtect(roomName) }'>${ app._htmlProtect(roomName) }</option>`);
}

app.handleUsernameClick = function(event) {
  $(`.username:contains(${ event.target.textContent })`).addClass('friend');
  app.friends.push(event.target.textContent);
}

app.handleSubmit = function(event) {
  var msgUser = window.location.search.substring(10);
  var msgText = $('#message').val();
  var msgRoom = app.currRoom;
  app.send({
    username: msgUser,
    text: msgText,
    roomname: msgRoom
  });
  app.fetch();
}

app._htmlProtect = function(input) {
    var protected = new DOMParser().parseFromString(input, 'text/html');
    return protected.documentElement.textContent;
}
