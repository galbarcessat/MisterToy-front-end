
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { ToyService } from "../services/toy.service.js"
import { UPDATE_TOY } from "../store/reducers/toy.reducer.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function ToyEdit() {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    const [toyToEdit, setToyToEdit] = useState(ToyService.getEmptyToy())

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])


    function loadToy() {
        ToyService.getById(params.toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issued in toy edit:', err);
                navigate('/toy')
                showErrorMsg('Todo not found!')
            })
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }


    function onSaveToy(ev) {
        ev.preventDefault()
        ToyService.save(toyToEdit)
            .then(() => {
                dispatch({ type: UPDATE_TOY, toy: toyToEdit })
                navigate('/toy')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot save toy', err)
            })
    }


    const { name, price, labels, inStock } = toyToEdit
    console.log('inStock:', inStock)
    return (
        <section className="toy-edit-container">
            <h2>Toy Edit</h2>
            <section className="toy-edit">
                <form onSubmit={onSaveToy} >
                    <label htmlFor="name">Name:</label>
                    <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                    <label htmlFor="price">Price:</label>
                    <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                    <label htmlFor="inStock">In stock :</label>
                    <input onChange={handleChange} checked={inStock} type="checkbox" name="inStock" id="inStock" />

                    <button>Save</button>
                </form>
                <button>
                    <Link to="/toy">Back</Link>
                </button>
            </section>
        </section>
    )
}








