=== Site da CPPG

Este é o código-fonte do site da CPPG do IFMG Sabará.
Desenvolvido pelos alunos José Luiz e Valtensir.

=== Notas sobre configuração

O site roda com o pm2. O site usa como baseurl /CPPG, portanto,
para rodar localmente é preciso configurar o servidor HTTP (Apache) para
direcionar essa baseurl para a porta em que o pm2 roda o site (normalmente 8000).

Precisa-se primeiro habilitar o proxy no Apache:

a2enmod proxy
a2enmod proxy_http
service apache2 restart

Criar um arquivo de configuração /etc/apache2/sites-available/cppg.conf.
Conteúdo do arquivo:

<VirtualHost *:80>
ServerName localhost

   ProxyRequests Off
   ProxyPreserveHost On
   ProxyVia Full
   <Proxy *>
      Require all granted
   </Proxy>

   <Location /CPPG>
      ProxyPass http://127.0.0.1:8000
      ProxyPassReverse http://127.0.0.1:8000
   </Location>

    #<Directory "/var/www/example.com/html">
    #AllowOverride All
    #</Directory>
</VirtualHost>

