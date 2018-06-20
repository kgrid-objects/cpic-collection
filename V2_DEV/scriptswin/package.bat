@ECHO OFF
if not exist dist ( mkdir dist )
zip -r dist\%1.zip %1
