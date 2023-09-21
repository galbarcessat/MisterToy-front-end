

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ToyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        ToyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    const { _id, name, price, labels, inStock } = toy

    return (
        <section className="toy-details">
            <h1>Id : {_id}</h1>
            <h1>Name : {name}</h1>
            <h1>Price : {price}$</h1>
            <div>
                <strong>Labels : </strong>
                {labels.map(label => (
                    <span key={label}> {label}, </span>
                ))}
            </div>
            <h1>In stock : {inStock ? 'yes' : 'no'}</h1>
            <button>
                <Link to="/toy">Back</Link>
            </button>
        </section>
    )
}
