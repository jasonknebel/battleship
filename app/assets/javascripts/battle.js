$(function(){

  $('#enemy_board td').on('click', function(){
    var el = $(this);
    var x = el.index();
    var y = el.parent().index();
    console.log('clicked: ', x, y)

    $('#enemy_board tr').eq(y).find('td').eq(x).toggleClass('hit');



  });



});