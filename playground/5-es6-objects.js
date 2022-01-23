// Object property shorthand

const userName = 'Name1'
const userAge = 21
const user = {
    userName,
    userAge,
    location: 'Moscow'
}

console.log(user)

// Object destructuring

const product = {
    label: 'Product123',
    price: 200,
    stock: 33,
    salePrice: undefined
}

const { label: productLabel, price, stock = 10, rating: productRating = 10 } = product

console.log(productLabel)
console.log(price)
console.log(stock)
console.log(productRating)

const transaction = (type, { label, stock: productStock = 20 } = {}) => {
    console.log(label)
    console.log(productStock)
}

transaction('order', product)
