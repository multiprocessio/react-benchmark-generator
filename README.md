# React Benchmark Generator

This script helps generate large files with custom React components
for the purposes of benchmarking React/JavaScript tooling.

It generates a random number of components with a random depth of
children. You can customize the caps of the randomness by passing
flags as demonstrated below.

## Run

```
yarn
node generate.js --outdir out
```

## Example

```javascript
$ node generate.js --outdir out --maxchildren 2 --maxcomponents 2 --nfiles 1
$ cat out/DoloresEtDeseruntRatione.jsx 
import React from "react";

function ExEosEt() {
  return (
    <span className="ea-eos-animi-aut-sequi">
      <div className="vel-adipisci-architecto-et" id="omnis-illo-veritatis-optio" title="provident">
        <p>
Cupiditate libero perferendis aut blanditiis at et totam enim. Et dolor a. Voluptas dicta consequatur fugit velit libero consequuntur voluptatibus molestiae ducimus. Ipsam officiis blanditiis sint exercitationem sint deserunt deleniti dolor harum. Officia voluptas quia quisquam omnis. Quasi recusandae voluptatibus commodi. Dolore est culpa est. Et aliquid molestiae et fugit est dolorum qui nobis. Cupiditate nostrum pariatur repudiandae rerum nam molestias consequuntur. Eveniet officiis accusamus temporibus. Sit animi sint. Dolor et eligendi et quia error consequuntur.
        </p>
      </div>
      <div className="suscipit-repudiandae-optio">
        <span className="architecto-culpa-corporis" id="non-nobis" title="omnis">
Magni harum placeat eum cumque laboriosam. Mollitia autem officiis velit sit ullam est dolorem quisquam. Doloribus odio aperiam ea et sit ut. Et explicabo quos aut necessitatibus ut perspiciatis saepe sit. Est consequatur earum harum iste sunt similique repellat. Soluta ex consequatur autem enim qui et aut officiis. Beatae unde architecto. Beatae facilis voluptatum magni eveniet inventore. Qui quia ut. Ipsam voluptatem repellat quibusdam explicabo sunt. Dolor ut nobis ex deserunt. Sequi reprehenderit voluptatem quas sed molestiae error qui. Aut numquam excepturi libero deserunt quae explicabo cum animi minima. Asperiores modi qui et necessitatibus est iusto libero harum. Cum minus aut doloribus ipsum labore adipisci qui. Quas pariatur aut officia velit qui quia nesciunt officia. Et temporibus est pariatur deserunt saepe fuga consequatur illum. Fugiat sed velit explicabo. Et eius amet natus facere veniam recusandae placeat. Ipsam labore delectus tenetur nobis sed laborum sed dicta.
        </span>
      </div>
    </span>
  );
}

export function DoloresEtDeseruntRatione() {
  return (
    <ExEosEt className="totam-alias-aspernatur" id="sit-quae-ipsa-quod-at">
Aliquid in aut velit repudiandae quisquam natus id neque aliquid. Veritatis voluptas veniam qui et velit qui repudiandae ut et. Optio tenetur quas sit. Assumenda fugiat commodi voluptatem unde occaecati et numquam deleniti. Aut voluptatem est non. Doloribus et vel nisi blanditiis et. Et est soluta dignissimos illum reprehenderit. Aliquid dicta et. Distinctio magni aut omnis saepe consequatur. Doloremque quibusdam accusantium quo occaecati quia.
    </ExEosEt>
  );
}
```