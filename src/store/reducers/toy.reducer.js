import { ToyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
// export const TOY_UNDO = 'TOY_UNDO'


const initialState = {
    toys: [],
    // lastToys: [],
    // isCartShown: false,
    // shoppingCart: [],
    filterBy: ToyService.getDefaultFilter(),
    sortBy: '',
    isLoading: false
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    // let shoppingCart
    // let lastCars
    switch (action.type) {
        // Cars
        case SET_TOYS:
            // lastCars = [...action.cars]
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            // lastCars = [...state.cars]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        //FilterBy

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        case SET_SORT_BY:
            return { ...state, sortBy: action.sortBy }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state;
    }
}