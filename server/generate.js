//
// This recipe to generate test data using Faker.js is from
// techdiaries.com/angular-11-tutorial-example-rest-crud-http-get-httpdclient
// The command to install Faker.js is: npm install faker --save
//
// Faker.js is at: https://github.com/marak/Faker.js
//
// If you save this file as, "server/generate.js," in the top-level project
// directory, then you should update the, "scripts," section of package.json
// to look like this:
//
//  "scripts": {
//      "ng": "ng",
//      "start": "ng serve",
//      "build": "ng build",
//      "test": "ng test",
//      "lint": "ng lint",
//      "e2e": "ng e2e",
//      "generate": "node ./server/generate.js > ./server/database.json",
//      "server": "json-server --watch ./server/database.json"
//  },
//

//
// generate.js
//

var faker = require ("faker");
var database = { cities: [] };

for (var i = 1; i <= 100; i++) {
    database.cities.push ({ city: faker.address.city () });
}

console.log (JSON.stringify(database));
