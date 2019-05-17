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
        if ($(this).attr('id').indexOf(value) > -1) {
          $(this).fadeIn();
        } else {
          $(this).fadeOut();
        }
      });
      $('.filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    } else {
      $('tr').fadeIn();
      $('.filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    }
  });

  $('.research-filter').click(function () {
    var value = $(this).text();

    if (value != 'Todos') {
      $('tr[id*=researchWork]').each(function () {
          if ($(this).attr('id').indexOf(value) > - 1) {
            $(this).fadeIn();
          } else {
            $(this).fadeOut();
          }
        });
      $('.research-filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    } else {
      $('tr[id*=researchWork]').fadeIn();
      $('.research-filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    }
  });

  $('.proceeding-filter').click(function () {
    var value = $(this).text();

    if (value != 'Todos') {
      $('tr[id*=proceeding]').each(function () {
          if ($(this).attr('id').indexOf(value) > - 1) {
            $(this).fadeIn();
          } else {
            $(this).fadeOut();
          }
        });
      $('.proceeding-filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    } else {
      $('tr[id*=proceeding]').fadeIn();
      $('.proceeding-filter').removeClass('btn-success');
      $(this).addClass('btn-success');
    }
  });

});