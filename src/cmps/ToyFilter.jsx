
import { useEffect, useRef, useState } from "react"
import { ToyService } from "../services/toy.service"
import { utilService } from "../services/util.service.js"
import { isEqual } from 'lodash'
import Select from 'react-select'



export function ToyFilter({ filterBy, onSetFilterBy }) {


    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {

        if (isEqual(filterBy, filterByToEdit)) return

        onSetFilterBy.current(filterByToEdit)

    }, [filterByToEdit])


    const labelsOptions = [
        "On wheels",
        "Box game",
        "Art",
        "Baby",
        "Doll",
        "Puzzle",
        "Outdoor",
        "Battery Powered",
    ];


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

        setFilterByToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    const handleLabelChange = (selectedLabels) => {
        setFilterByToEdit((prevToyToEdit) => ({
          ...prevToyToEdit,
          labels: selectedLabels.map((option) => option.value),
        }));
      };

    return (
        <section className="toy-filter">
            <form >
                <label htmlFor="txt">Search :</label>
                <input type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="InStock">In stock :</label>
                <select name="InStock" id="InStock" value={filterByToEdit.InStock} onChange={handleChange}>
                    <option value="">All</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Out of stock</option>
                </select>

                <label htmlFor="labels">Labels :</label>
                <Select
                    isMulti
                    name="labels"
                    id="labels"
                    options={labelsOptions.map((label) => ({
                        value: label,
                        label: label,
                    }))}
                    value={labelsOptions
                        .filter((label) => filterByToEdit.labels.includes(label))
                        .map((label) => ({ value: label, label: label }))}
                    onChange={handleLabelChange}
                    placeholder="Select labels..."
                />
            </form>

        </section>
    )
}