@ECHO OFF
java -jar activator/kgrid-activator-0.6.2.jar --kgrid.shelf.cdostore.url=filesystem:file://. %*
