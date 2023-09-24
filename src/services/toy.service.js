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


}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)

}

function save(toy) {

    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }

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
