# Deployment of CPIC Collection

This document provides the detailed instructions to deploy the CPIC collection to the KGrid Activator. Once activated, the KOs will be accessible through the web API service.

Deployment of the CPIC collection takes place after the KGrid Activator is installed and running.

If the KGrid Activator needs to be installed, please refer to [Quick Start](https://kgrid.org/guides/quickstart/) for the information on how to install and start the Kgrid Activator.


## Deploying the CPIC KOs

### Downloading KOs

With the KGrid Activator running, presumably on http://localhost:8080, deploy the CPIC collection of KOs using the manifest, a JSON object appearing below:

```
{
  "manifest": [
    "99999-cp4mc9723sd-v1.0.zip",
    "99999-cp4mc9723se-v1.0.zip",
    "99999-fk4058s74p-v1.0.zip",
    "99999-fk40k3kt35-v1.0.zip",
    "99999-fk44n0ds5c-v1.0.zip",
    "99999-fk45m7fn9t-v1.0.zip",
    "99999-fk47380j09-v1.0.zip",
    "99999-fk47h1x090-v1.0.zip",
    "99999-fk49z9gr7p-v1.0.zip",
    "99999-fk49z9gr7p-v1.1.zip",
    "99999-fk4bv8qb3r-v1.0.zip",
    "99999-fk4bz6hp15-v1.0.zip",
    "99999-fk4c83hw23-v1.0.zip",
    "99999-fk4cx5fm8f-v1.0.zip",
    "99999-fk4cz4fm8f-v1.0.zip",
    "99999-fk4d22836k-v1.0.zip",
    "99999-fk4d22836l-v1.0.zip",
    "99999-fk4d51vd1p-v1.0.zip",
    "99999-fk4d79nq4z-v1.0.zip",
    "99999-fk4fn2d721-v1.0.zip",
    "99999-fk4jw9m41b-v1.0.zip",
    "99999-fk4m91fj9z-v1.0.zip",
    "99999-fk4m95ek9z-v1.0.zip",
    "99999-fk4mc97w0h-v1.0.zip",
    "99999-fk4mc97w6m-v1.0.zip",
    "99999-fk4md04x9z-v1.0.zip",
    "99999-fk4mw3nw5p-v1.0.zip",
    "99999-fk4qc17m5z-v1.0.zip",
    "99999-fk4qj7sz2s-v1.0.zip",
    "99999-fk4qj7sz2t-v1.0.zip",
    "99999-fk4qz3fz89-v1.0.zip",
    "99999-fk4r225c4h-v1.0.zip",
    "99999-fk4rf6zx6d-v1.0.zip",
    "99999-fk4sf40t7f-v1.0.zip",
    "99999-fk4t167482-v1.0.zip",
    "99999-fk4t85em9x-v1.0.zip",
    "99999-fk4vq45s09-v1.0.zip",
    "99999-fk4w67pr0f-v1.0.zip"
  ]
}
```

Using a `POST` operation, send the manifest above as request body to the endpoint `{{url}}/kos/manifest`, e.g. `http://localhost:8080/kos/manifest`.

When the `POST` operation is run, the KGrid Activator will download all the zip files containing KOs in the manifest.

Examples of executing the POST operation with a manifest for downloading a single KO include:

For Linux/Mac

```
curl -X POST "http://localhost:8080/kos/manifest" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"manifest\":[\"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4w67pr0f-v0.3.0.zip\"]}"
```

For Windows, using Powershell

```
$headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
$headers.Add("Content-Type", "application/json")

$body = "{`"manifest`":[`"https://github.com/kgrid-objects/cpic-collection/releases/download/2.0.0/99999-fk4w67pr0f-v0.3.0.zip`"]}"

$response = Invoke-RestMethod 'http://localhost:8080/kos/manifest' -Method 'POST' -Headers $headers -Body $body
$response | ConvertTo-Json

```

Modify the command above by replacing the single-object manifest with the manifest for the whole collection shown above.

Other tools, such as [Postman](https://www.getpostman.com/), can be used to perform the needed POST operation.


### Activating KOs

For Linux/Mac

```
curl -X GET "http://localhost:8080/activate" -H "accept: application/json"
```

For Windows, using Powershell

```
Invoke-RestMethod 'http://localhost:8080/activate' -Method 'GET'
```

At this point, the CPIC KOs are activated and the endpoints they support are available for use.


## Trying the CPIC KOs

To try the CPIC KOs, use the activator and the freely-available Swagger Editor.

- In a browser, to list all the endpoints on the activator, open a page at `http://localhost:8080/endpoints`;
- Select an endpoint of interest, which will look like the endpoint shown below;
```
{
      "title": "CPIC doxepin Recommendations based on CYP2C19 and CYP2D6 phenotypes",
      "endpointPath": "99999/fk4sf40t7f/dosingrecommendation?v=v0.3.0",
      "servicePath": "99999/fk4sf40t7f/service",
      "activated": "2019-12-20T10:09:16.535285",
      "_links": {
        "self": {
          "href": "http://localhost:8080/endpoints/99999/fk4sf40t7f/dosingrecommendation?v=v0.3.0"
        },
        "swagger_editor": {
          "href": "https://editor.swagger.io?url=http://localhost:8080/kos/99999/fk4sf40t7f/service"
        }
      }
    }
```
- Copy the link for the `swagger_editor` into a browser;
- The selected `swagger_editor` link will open the KO's service description in Swagger Editor. ([More information on Swagger UI](https://swagger.io/tools/swagger-ui/))
- In the Swagger Editor, click on the green button for `POST`;
- Clicking on `Try it Out` will provide the UI to interact with the endpoint.

Congratulations! Your CPIC collection of KOs is deployed and working. You can now develop or integrate client applications that use the KOs as services powered by KGrid technology.
