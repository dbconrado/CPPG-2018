import { changeActiveTabById } from '/CPPG/assets/js/navbar.js';

$(document).ready(function()
{
    changeActiveTabById("validarCertificado");
    
    $("#validateCertificateForm").on('submit', function(e)
    {
        e.preventDefault();

        var $inputs = $('#validateCertificateForm :input');

        var values = {};
        $inputs.each(function()
        {
            values[this.name] = $(this).val();
        });
        
        $.post('/CPPG/validateCertificate', { certificateHash: values.certificateHash},
            function(isCertificateValid)
            {
                var modalContent;
                if(isCertificateValid) modalContent = "<p class='lead text-success text-center'>Certificado Válido!</p>";
                else modalContent = "<p class='lead text-danger text-center'>Certificado inválido!</p>";
                $(".modal-body").html(modalContent);
                $("#validationResultsModal").modal('toggle');
            });
    });
});