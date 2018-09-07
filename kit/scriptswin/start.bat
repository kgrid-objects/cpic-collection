
echo "Starting library on http://localhost:8081"
start java -jar library/kgrid-library*.jar --server.port=8081 --kgrid.shelf.cdostore.url=filesystem:file://library/shelf

echo "Starting activator on http://localhost:8082"
start java -jar activator/kgrid-activator*.jar --server.port=8082 --kgrid.shelf.cdostore.url=filesystem:file://activator/shelf