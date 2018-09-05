$(document).ready(function()
{
    var allOptionsAreSelected = false;
    $('#selYear').on('changed.bs.select', function(e, clickedIndex)
    {
        var selectedOption = $(this).find('option').eq(clickedIndex).text();
        var nOptionsAvailable = $('#selYear > option').length;

        if($("#selYear").val() != null) var nOptionsSelected = $("#selYear").val().length;
        var hasNumber = /\d/;

        if(hasNumber.test(selectedOption) && (nOptionsSelected == nOptionsAvailable-1) && ($(this).val()[0] == 'Nenhuma das opções'))
        {
            var elements = document.getElementById("selYear").options;
            allOptionsAreSelected = false;
            elements[0].selected = false;
            $('#allOptions').text("Todos os anos");
            $(this).selectpicker("refresh");
        }

        if(selectedOption == 'Todos os anos')
        {
            allOptionsAreSelected = true;
            $(this).selectpicker('selectAll');
            $('#allOptions').text("Nenhuma das opções");
            $('#selYear').selectpicker('refresh');
        }
        else if(selectedOption == 'Nenhuma das opções')
        {
            allOptionsAreSelected = false;
            $(this).selectpicker('deselectAll');
            $('#allOptions').text("Todos os anos");
            $('#selYear').selectpicker('refresh');            
        }
            
    });
    
    $("#selTeacher").on('change', function()
    {
        var data = {};
        data.teacherInfo = $(this).val();
        
        $.ajax(
        {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/CPPG/gerarCertificado',
            success: function(data)
            {
                if(data.length != 0 || data != undefined)
                {
                    $('#selYear').empty();
                    $("#selYear").append("<option data-tokens= 'Todos os anos' id='allOptions'>Todos os anos</option>");
                    data.forEach(function(year)
                    {
                        $("#selYear").append("<option data-tokens= '" + year + "'> " + year + " </option>");	
                    });
                    $('.selectpicker').selectpicker('refresh');
                    $('#selectMinYear').show();
                }
            }
        });
    });
});