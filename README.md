Just pass any data to it, it will format JSON for you.

# install
```
$ npm install formate-json
```

Usage
``` javascript
const fj = require('formate-json');

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
``` javascript
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
   "someDate": "2017-09-12T07:57:03.980Z",
   "someNull": null
}
```