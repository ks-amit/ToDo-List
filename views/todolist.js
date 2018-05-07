$(document).ready(function(){

  $('#myform').on('submit', function(){

      var item = $('#item1').val();
      var dead = $('#item2').val();
      //console.log(item);
      $.ajax({
        type: 'POST',
        url: '/todo',
        data: {item, dead},
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $(".tablerow").on('click', function(){
      var item = $(this).children("#text1").text();
      var dead = $(this).children("#text2").text();
      $.ajax({
        type: 'DELETE',
        url: '/todo',
        data: {item, dead},
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;
  });

});