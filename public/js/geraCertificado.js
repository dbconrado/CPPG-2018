$(document).ready(function()
{
    $('#selYear').on('changed.bs.select', function(e, clickedIndex)
    {
        var selectedOption = $(this).find('option').eq(clickedIndex).text();
        var nOptionsAvailable = $('#selYear > option').length;
        var nOptionsSelected = $("#selYear").val().length;

        if(selectedOption == 'Todos os anos')
        {
            $(this).selectpicker('selectAll');
            $('#allOptions').text("Nenhuma das opções");
            $('#selYear').selectpicker('refresh');
        }
        else if(selectedOption == 'Nenhuma das opções')
        {
            $(this).selectpicker('deselectAll');
            $('#allOptions').text("Todos os anos");
            $('#selYear').selectpicker('refresh');            
        }
            
    });
    
    $("#selTeacher").on('change', function()
    {
        var data = {};
        data.teacherName = $(this).val();
        
        $.ajax(
        {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/CPPG/gerarCertificado',
            success: function(data)
            {
                var min = data[0];
                var max = data[1];
                
                if(min)
                {
                    $('#selYear').empty();
                    $("#selYear").append("<option data-tokens= 'Todos os anos' id='allOptions'>Todos os anos</option>");
                    for(var i = min; i<=max; i++)
                    {
                        $("#selYear").append("<option data-tokens= '" + i + "'> " + i + " </option>");	
                    }
                    $('.selectpicker').selectpicker('refresh');
                    $('#selectMinYear').show();
                }
            }
        });
    });
});