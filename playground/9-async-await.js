const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0) {
                reject('Cannot use negative numbers')
            }
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async () => {
    // throw new Error('error message') // Same as reject in Promise
    // return 'Name1' // Same as resolve

    const sum = await add(1, 9)
    const sum2 = await add(sum, -10)
    const sum3 = await add(sum2, 5)
    return sum3
}

doWork()
    .then(result => console.log('SUCCESS: ', result))
    .catch(error => console.log('ERROR: ', error))