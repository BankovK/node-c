const fs = require('fs')
// const book = {
//     title: 'Ego',
//     author: 'Ryan'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)

//-------------------------------------------------

// const dataBuffer = fs.readFileSync('1-json.json')
// const dataJson = dataBuffer.toString()
// const data = JSON.parse(dataJson);
// console.log(data.title)

//-------------------------------------------------

const buffer = fs.readFileSync('1-json.json')
const json = buffer.toString()
const data = JSON.parse(json)
data.name = 'God1'
data.age = 111
fs.writeFileSync('1-json.json', JSON.stringify(data))