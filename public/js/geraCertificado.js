$(document).ready(function()
{
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
                    $('#selYearMin').empty();
                    for(var i = min; i<=max; i++)
                    {
                        $("#selYearMin").append("<option data-tokens= '" + i + "'> " + i + " </option>");	
                    }
                    $('.selectpicker').selectpicker('refresh');
                    $('#selectMinYear').show();
                }
            }
        });
    });
});