$(document).ready(function (){
    $("#btnSearch").on('click', function()
    {
        checked = $("input[type=checkbox]:checked").length;
        if(!checked && $("#searchTextBox").val())
        {
            $("#searchForm").submit(function(e){
                e.preventDefault();
            });

            $(".modal").modal('toggle');
        }
    });
});