import { Link, useNavigate } from "react-router-dom"


export function ToyPreview({ toy, onRemoveToy, onEditToy }) {
    const { _id, name, price, labels, inStock } = toy
    const navigate = useNavigate()

    return (
        <div className="toy-card">
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
            <button onClick={() => onRemoveToy(_id)}>Delete</button>
            <button><Link to={`/toy/edit/${_id}`}>Edit</Link></button>
            <button onClick={() => navigate(`/toy/${_id}`)}>Details</button>
        </div>
    )

}