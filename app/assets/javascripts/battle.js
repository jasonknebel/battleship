var message = function(text){
  $('.message').show().text(text);
}

var error = function(text){
  $('.error').show().text(text);
}


$(function(){
  $('.message').hide()
  $('.error').hide()
  
  $(document).on('click', function(){
    $('.message').hide()
    $('.error').hide()
  });
 
  $('form').on('submit', function(event){
      event.preventDefault();
    $.ajax({
      url: '/register',
      data: $(this).serialize(),
      type: 'POST',
      datatype: 'JSON',
      success: function(response){
        console.log(response)
        if(response.success){
          $("meta[name='csrf-token']").attr("content", response['csrfToken']);
          window.location = 'play';
          // alert('You just started a new game. The new ID is: ' + response.id)
        }
        else{
          alert(response.message || 'Unknown Error')
        }
      }
    })
    return false;
  });


   $('#enemy_board td').on('click', function(){

     var el = $(this);
     var x = el.index();
     var y = el.parent().index();
     console.log('clicked: ', x, y)
 
    $.ajax({
      url: '/nuke',
      data: {x: x, y: y},
      type: 'POST',
      datatype: 'JSON',
      success: function(response){
        console.log(response);
        if(response.success)
        {
          var target = $('#enemy_board tr').eq(y).find('td').eq(x)
          if(response.status=='hit'){
            target.addClass('hit');
          }
          else if(response.status=='miss'){
            target.addClass("miss");
          }

          if(response.sunk){
            message('Congrats! You just sunk the enemy ' + response.sunk);
          }

          if(response.game_status){
            message('The game has been ' + response.game_status +
              '. If you wish to play again, please reset the game.');
          }

          if(response.prize){
            message('You got the prize! ');
            console.log('Prize contains...', response.prize);
          }
 
          if (response.error){
            $('#game_over').show();
          }
 
        }
        else
        {
          error(response.message || 'Unknown Error');
        }
      }
    });

  });
});