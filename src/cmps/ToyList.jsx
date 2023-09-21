
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <section className="toys-container">
            {toys.map(toy => (
                <ToyPreview key={toy._id} toy={toy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} />
            ))}
        </section>
    )
}
