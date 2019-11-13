
set str=%cd:\=/%

java -jar activator/kgrid-activator-0.6.6.jar --server.port=8082 --kgrid.shelf.cdostore.url=filesystem:file:///%str%
