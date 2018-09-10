@echo off
echo "Stopping KGrid Activator"
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8082') DO IF %%P NEQ 0 ( taskkill /PID %%P /F)
echo "Stopping KGrid Library"
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8081') DO IF %%P NEQ 0 ( taskkill /PID %%P /F)
echo "Stopping Http Server"
FOR /F "tokens=5 delims= " %%P IN ('netstat -a -n -o ^| findstr :8080') DO IF %%P NEQ 0 ( taskkill /PID %%P /F)

exit/b 0
