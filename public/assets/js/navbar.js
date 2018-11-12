export function changeActiveTabById(pageId)
{
    $(".active").removeClass("active");
    $("#" + pageId).addClass("active");
}