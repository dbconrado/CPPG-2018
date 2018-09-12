$(document).ready(function (){
    $("#searchForm").submit(function(e)
    {
        checked = $("input[type=checkbox]:checked").length;
        if(!checked)
        {
            $(".modal").modal('toggle');
            e.preventDefault();
        }
        else
        {
            $("#searchForm").submit();
        }
    });
});