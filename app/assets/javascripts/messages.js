$(document).on("turbolinks:load", function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= "${message.image}">` : "";
    var html = `<div class="chat-main__messages__message" data-message-id="${message.id}">
                  <div class="chat-main__messages__message__upper-info">
                    <p class="chat-main__messages__message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="chat-main__messages__message__upper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <div class="chat-main__messages__message__text">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    <div class="lower-message__image">
                      ${img}
                    </div>
                  </div>
                </div>`
  return html;
  }

  function scroll() {

    window.scroll(0,$(document).height());	    window.scroll(0,$(document).height());
  }	

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: window.location.href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html);
      $('#new_message')[0].reset();
      $('.chat-main__messages').animate({
        scrollTop: $('.chat-main__messages')[0].scrollHeight
      }, 'fast');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);//ここで解除している
    })
  })
  // 自動更新 
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-main__messages:last').data('message-id');
      console.log(last_message_id);
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data:{id: last_message_id},
        dataType: 'json'
      })

      .done(function(messages){
        messages.forEach(function(message){
          var insertHTML = buildHTML(message)
          $('#message').append(insertHTML)
        });
        $('.chat-main__messages').animate({
          scrollTop: $('.chat-main__messages')[0].scrollHeight
        }, 'fast');
      })

      .fail(function(){
        alert('error');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});