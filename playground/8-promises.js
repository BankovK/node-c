// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([1,2,3,4])
//         reject('Error msg')
//     }, 2000)
// })

// doWorkPromise
//     .then(data => {
//         console.log('SUCCESS', data)
//     })
//     .catch(error => console.log('ERROR', error))

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// add(1, 2)
//     .then((sum) => console.log(sum))
//     .catch(error => console.log(error))

add(1, 2)
    .then(sum => {
        console.log(sum)
        return add(sum, 4) // Chaining next promise
    })
    .then(sum2 => { // For second promise
        console.log(sum2)
    })
    .catch(error => console.log(error))