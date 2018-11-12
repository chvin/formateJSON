Just pass any data to it, it will format JSON for you.

# install
```
$ npm install formatter-json
```

# Usage
``` javascript
const fj = require('formatter-json');

const testObj = {
    msg: '',
    success: true,
    deepData: {
        author: 'Chvin',
        github: 'https://github.com/chvin',
        address: 'China',
        age: 0,
        favorite: [
            'run', 'movie', 'coding', {eat: 'rice'}
        ]
    },
    someReg: /hello world/g,
    someDate: new Date,
    someNull: null,
    someUndefined: undefined,
    someSymbol: Symbol()
};

const strTestObj = JSON.stringify(testObj);

console.log(fj(testObj));

console.log(fj(strTestObj));

```

You will get the same result.
``` json
{
  "msg": "",
  "success": true,
  "deepData": {
    "author": "Chvin",
    "github": "https://github.com/chvin",
    "address": "China",
    "age": 0,
    "favorite": [
      "run",
      "movie",
      "coding",
      {
        "eat": "rice"
      }
    ]
  },
  "someReg": {},
  "someDate": "2018-11-12T02:48:28.156Z",
  "someNull": null
}
```

## Set indentation
``` javascript
const fj = require('formatter-json');
const strTestObj = JSON.stringify(testObj, 4); // default 2
```

You will get:
``` json
{
    "msg": "",
    "success": true,
    "deepData": {
        "author": "Chvin",
        "github": "https://github.com/chvin",
        "address": "China",
        "age": 0,
        "favorite": [
            "run",
            "movie",
            "coding",
            {
                "eat": "rice"
            }
        ]
    },
    "someReg": {},
    "someDate": "2018-11-12T02:51:37.590Z",
    "someNull": null
}
```


## Any type of result
``` javascript
const fj = require('formatter-json');

console.log(fj(1)); // '1'

console.log(fj(null)); // 'null'

console.log(fj(undefined)); // undefined

console.log(fj('abc')); // '"abc"'

console.log(fj(/reg/)); // '{}'

console.log(fj(new Date)); // '2017-09-12T09:09:49.460Z'

console.log(fj(Symbol())); // undefined

console.log(fj({a: 'a', b: 'b'}));
/*
`
{
  "a": "a",
  "b": "b"
}
`
*/

console.log(fj([1, 2, 3]));
/*
`
[
  1,
  2,
  3
]
`
*/
```