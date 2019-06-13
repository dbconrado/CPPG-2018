$(document).ready(function () {

    document.title = 'Home - ' + document.title;
    $("#searchForm").submit(function (e) {
        $("#searchForm").submit();
    });

    $(window).scroll(function () {
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 100);
        $('a').toggleClass('scrolled', $(this).scrollTop() > 100);
    });
});