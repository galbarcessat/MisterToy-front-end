import { ToyService } from "../../services/toy.service.js";
import { ADD_TOY, REMOVE_TOY, SET_IS_LOADING, SET_TOYS, UPDATE_TOY } from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export function loadToys(filterBy, sortBy) {
    // const { filterBy } = store.getState().toyModule

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return ToyService.query(filterBy, sortBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys: toys })
            return toys
            console.log('toys loaded :):')
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}


//CHANGE TO OPTIMISTIC REMOVE!
export function removeToy(toyId) {
    return ToyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return ToyService.save(toy)
        .then(toyToSave => {
            store.dispatch({ type, toy: toyToSave })
            return toyToSave
        })
        .catch(err => {
            console.log('toy action -> Cannot save toy', err)
            throw err
        })
}

export function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}