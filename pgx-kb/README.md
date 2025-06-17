## API Service
Run the API service using

```shell
node src/api-service.js
```

from the cpic-kb folder and access the api through swagger editor using `http://localhost:3000/api-docs` or send a post request to `http://localhost:3000/run`.

Here is a sample input
```json
{
    "patient": {
        "name": "Hank Hill",
        "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*1/*11",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  }

```

## Library Service
To use library service add and install the pgx-kb package as a dependency in your node.js app using

```batch
npm install /path/to/pgx-kb
```

Then import the initialize and run methods from pgx-kb package using

```javascript
const { run, initialize } = require('pgx-kb');
// or import {run, initialize} from 'pgx-kb';
```

Then initialize the package and run the service using

```javascript
await initialize();
let result = await run({
    "patient": {
        "name": "Hank Hill",
        "id": "1"
    },
    "diplotype": {
      "CYP2C19": "*1/*11",
      "CYP2C9": "",
      "CYP2D6": "*3/*3",
      "CYP3A5": "",
      "HLA-B": "*1/*1",
      "SLCO1B1": "",
      "TPMT": "",
      "UGT1A1": "*1/*1"
    },
    "prescriptions": "atazanavir codeine abacavir"
  }
);
```