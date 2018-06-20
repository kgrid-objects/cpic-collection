@ECHO OFF
java -jar activator/kgrid-activator-0.5.8.jar --kgrid.shelf.cdostore.url=filesystem:file://. %*
