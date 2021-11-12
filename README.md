# React Benchmark Generator

This script helps generate large files with custom React components
for the purposes of benchmarking React/JavaScript tooling.

## Run

```
yarn
node generate.js --outdir out
```

## Example

```javascript
$ node generate.js --outdir out --nrootchildren 1 --ncomponents 1 --nfiles 1
$ cat out/QuiRepellendusAccusamusPerferendisSuscipit.jsx 
import React from "react";


export function QuiRepellendusAccusamusPerferendisSuscipit() {
  return (
    <span>
Temporibus natus laborum maxime non illo aut quod enim temporibus. Magni ea et facere ratione neque sapiente quam corrupti. Laborum ea aut. Similique modi maxime quas ipsum corporis. Quo reprehenderit recusandae molestiae. Nesciunt voluptate omnis dolorem eum aut rerum laudantium nostrum enim.
    </span>
  );
}
```