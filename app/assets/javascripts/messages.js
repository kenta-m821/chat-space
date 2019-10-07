$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="chat-main__messages__message" data-id="${message.id}">
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
                    <div class="lower-message__image">
                      ${img}
                  </p>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
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
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.submit-btn').prop('disabled', false);　//ここで解除している
    })
  })
})