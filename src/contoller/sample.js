// const customerData = require('./src/data/customerData.json')
// // console.log(typeof customerData)
// // console.log(customerData)

var fs = require('fs')

// var currentSearchResult = {
//     "id": 199,
//     "first_name": "Alice",
//     "last_name": "Smith",
//     "city": "New York",
//     "company": "Taiwan"
//   }

function one(){fs.readFile('../data/customerData.json', function (err, data) {
  console.log(JSON.parse(data))
    // var json = JSON.parse(data)
    // // console.log(json)
    // json.push(currentSearchResult)
    // // console.log(json)
    // fs.writeFile("./src/data/customerData.json", JSON.stringify(json), (err)=>{
    //     if (err) throw err;
    //   console.log('The "data to append" was appended to file!');
    // })
})}


// let d = [
//     {
//         "id": 1,
//         "first_name": "Alice",
//         "last_name": "Smith",
//         "city": "New York",
//         "company": "ABC Inc."
//       }
//   ]
// customerData.push(JSON.stringify(d))
one()