import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'
_createToys()

export const ToyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']



function query(filterBy = {}, sortBy = '') {
    const sortByFilterBy = { ...filterBy, sortBy }
    return httpService.get(BASE_URL, sortByFilterBy)

    // return storageService.query(STORAGE_KEY)
    //     .then(toys => {
    //         if (filterBy.txt) {
    //             const regExp = new RegExp(filterBy.txt, 'i')
    //             toys = toys.filter(toy => regExp.test(toy.name))
    //         }
    //         if (filterBy.InStock === "true") {
    //             console.log('filter InStock:')
    //             toys = toys.filter(toy => toy.inStock)
    //         }
    //         if (filterBy.InStock === "false") {
    //             console.log('filter NOT InStock:')
    //             toys = toys.filter(toy => !toy.inStock)

    //         }
    //         if (filterBy.labels && filterBy.labels.length > 0) {
    //             toys = toys.filter(toy => filterBy.labels.every(label => toy.labels.includes(label)));
    //         }

    //         if (sortBy === 'name') {
    //             toys = toys.sort((toy1, toy2) => {
    //                 return toy1.name.localeCompare(toy2.name)
    //             })
    //         } else if (sortBy === 'price') {
    //             toys = toys.sort((a, b) => a.price - b.price)
    //         } else if (sortBy === 'CreatedAt') {
    //             toys = toys.sort((a, b) => a.CreatedAt - b.CreatedAt)
    //         }



    //         return toys
    //     })
    //     .catch(err => console.log('err:', err))
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

    // return storageService.get(STORAGE_KEY, toyId)
    //     .then(toy => {
    //         return toy
    //     })
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)

    // return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {

    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }

    // if (toy.id) {
    //     return storageService.put(STORAGE_KEY, toy)
    // } else {
    //     return storageService.post(STORAGE_KEY, toy)
    // }
}

function getDefaultFilter() {
    return { txt: '', InStock: '', labels: [] }
}

function getEmptyToy(id = '', name = '', price = '', labels = [], createdAt = '', inStock = true) {
    return { id, name, price, labels, createdAt, inStock }
}


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: true
            },
            {
                _id: 't102',
                name: 'Dog Toy',
                price: 232,
                labels: ['Battery Powered'],
                createdAt: 1531031801011,
                inStock: true
            },
            {
                _id: 't103',
                name: 'City Puzzle',
                price: 444,
                labels: ['Puzzle'],
                createdAt: 1431031801011,
                inStock: true
            },
            {
                _id: 't104',
                name: 'Monopol',
                price: 111,
                labels: ['Box game', 'Art'],
                createdAt: 1444031801011,
                inStock: true
            },
            {
                _id: 't105',
                name: 'Car Toy',
                price: 555,
                labels: ['On wheels', 'Battery Powered'],
                createdAt: 1666031801011,
                inStock: false
            },


        ]

        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

// function query(filterBy = {}) {
//     return httpService.get(BASE_URL, filterBy)
//     // .then(cars => {
//     //     return cars.filter(car =>
//     //         regExp.test(car.vendor) &&
//     //         car.price <= filterBy.maxPrice
//     //     )
//     // })
// }

// function getById(carId) {
//     return httpService.get(BASE_URL + carId)
// }

// function remove(carId) {
//     // return Promise.reject('Oh no!')
//     return httpService.delete(BASE_URL + carId)
// }

// function save(car) {
//     if (car._id) {
//         return httpService.put(BASE_URL, car)
//     } else {
//         return httpService.post(BASE_URL, car)
//     }
// }

// function getEmptyCar() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//         speed: utilService.getRandomIntInclusive(50, 200),
//     }
// }


// function getDefaultFilter() {
//     return { txt: '', maxPrice: '' }
// }