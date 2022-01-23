// setTimeout(() => {
//     console.log('Two')
// }, 2000)

// const names = ['Name1', 'Name2', 'N1']
// const shortName = names.filter((name) => name.length < 3)
// console.log(shortName)

// const geocode = (address, callback) => {
//     const data = {
//         latitude: 50,
//         longtitude: 40
//     }

//     setTimeout(() => {
//         callback(data)
//     }, 3000)
// }

// geocode('Moscow', (data) => console.log(data))

// const add = (a ,b, callback) => {
//     setTimeout(() => {
//         callback(a + b)
//     }, 2000)
// }

// add(1, 4, (sum) => {
//     console.log(sum) // Should print: 5
// })

//----------------------------
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('Error msg')
        callback(undefined, [1,2,3])
    }, 2000)
}

doWorkCallback((error, result) => {
    if (error) {
        console.log(error)
        return
    }

    console.log(result)
})