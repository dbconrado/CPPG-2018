$(document).ready(function () {

  $('.star').on('click', function () {
    $(this).toggleClass('star-checked');
  });

  $('.ckbox label').on('click', function () {
    $(this).parents('tr').toggleClass('selected');
  });

  $('.btn-filter').on('click', function () {
    var $target = $(this).data('target');
    if ($target != 'all') {
      $('.table tr').css('display', 'none');
      $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
    } else {
      $('.table tr').css('display', 'none').fadeIn('slow');
    }
  });

  $('.filter').click(function () {
    var value = $(this).text();

    if (value != 'Todos') {
      $('tr').each(function () {
        if ($(this).attr('id').indexOf(value)>-1) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      });
      $('.filter').css('box-shadow','none');
      $(this).css('box-shadow','0 0 0 .2rem rgba(0,123,255,.25)');
    } else {
      $('tr').fadeIn();
      $('.filter').css('box-shadow','none');
      $(this).css('box-shadow','0 0 0 .2rem rgba(0,123,255,.25)');
    }
  });

});