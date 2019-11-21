echo off
cls
echo off
echo ****************************************************************************
echo ESPERE A JANELA ANTERIOR FECHAR PARA CONTINUAR!!!!
echo ****************************************************************************

cd backend
 
start dev.bat

cd ..\frontend

start iniciar.bat

exit