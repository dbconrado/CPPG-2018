$(document).ready(function()
{
    $("#selYear").on('change', function()
    {
        console.log($('#selYear:checked'));
        if ($('#selYear:checked').length == $('#selYear').length)
        {
            console.log("cai22");
        }

        var id = $(this).find("option:selected").attr("id");
        console.log(id);
        if(id == "allOptions")
        {
            var allSelected = $("#selectID option:not(:selected)").length == 1;
            console.log(allSelected);
            if(allSelected)
            {
                console.log("cai1");
                $('#idSelect option').attr("selected",false);
                $('#idSelect').selectpicker('refresh');
            }
            else
            {
                console.log("cai2");
                $('#selYear option').attr("selected","selected");
                $('#allOptions').text("Nenhuma das opções")
                $('#selYear').selectpicker('refresh');
            }
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