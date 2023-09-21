import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ToyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { SET_FILTER_BY, SET_SORT_BY } from '../store/reducers/toy.reducer.js'


export function ToyIndex() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy, sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        return removeToy(toyId)
            .then(() => {
                console.log('removed toy:' + toyId)
            })
            .catch(() => {
                console.log('failed to remove toy:' + toyId)
                showErrorMsg(`failed to remove toy ${toyId}`)
            })
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    function onSetSortBy(sortBy) {
        dispatch({ type: SET_SORT_BY, sortBy })

    }

    console.log('toys:', toys)
    if (!toys) return <div>Loading...</div>
    return (
        <section>
            {!isLoading && <div>
                <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <ToySort sortBy={sortBy} onSetSortBy={onSetSortBy} />
                <ToyList toys={toys} onRemoveToy={onRemoveToy} />
                <button onClick={() => navigate('/toy/edit')}>Add Toy</button>
            </div>
            }

            {isLoading && <div>Loading...</div>}
        </section>
    )
}