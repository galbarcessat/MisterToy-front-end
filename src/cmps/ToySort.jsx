

export function ToySort({ sortBy, onSetSortBy }) {


    return (
        <section className="sort-by-container">
            <span>Sort :</span>
            <select name="sortBySelect" value={sortBy} onChange={() => onSetSortBy(event.target.value)}>
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">CreatedAt</option>
            </select>
        </section>
    )
}
