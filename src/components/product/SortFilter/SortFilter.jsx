import "./SortFilter.scss";

import { useState } from "react";
import Accordion from "../../ui/Accordion/Accordion";
// icons
import { XLg } from "react-bootstrap-icons";

// Data
import filterData from "../../../data/filterData.json";

const SortFilter = ({
    isFilterOpen,
    onClose,
    sortBy,
    onSortChange,
    filterBy,
    onFilterChange,
    onApply,
    actionReset,
}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const filters = filterData.filters;
    const toggleAccordion = (id) => {
        setActiveAccordion(prev => prev === id ? null : id);
    }

    const handleInputChanges = (key, value) => {
        if (key === "sortBy") {
            onSortChange(value);
            return
        }
        if (key === "price") {
            onFilterChange({
                ...filterBy,
                [key]: value
            });
            return
        }
        // Check whether this option is already selected.
        const isSelected = filterBy[key].includes(value);
        // console.log("checked value", value)
        // Build the updated array.
        let updatedValues = [];
        // add item into new array if the item is not in array
        if (isSelected) {
            updatedValues = filterBy[key].filter((item) => {
                return item !== value
            })
        } else {
            updatedValues = [...filterBy[key], value];
        }
        // update the value to parent state
        onFilterChange({
            ...filterBy,
            [key]: updatedValues
        });

    }

    const isOptionChecked = (key, value) => {
        switch (key) {
            case "sortBy":
                return sortBy === value;
            case "price":
                return filterBy[key] === value;
            case "colors":
                return filterBy[key].includes(value);
            case "sizes":
                return filterBy[key].includes(value);
            default:
                return false;
        }
    };


    return (
        <>
            <aside className={`filter-panel ${isFilterOpen ? "active" : ""}`}>
                <div className="filter-panel__header">
                    <div className="title">Filter and Sort</div>
                    <button onClick={onClose} className="btn button-filter-close">
                        <span className="label">Close</span>
                        <span className="icon"><XLg /></span>
                    </button>
                </div>

                <div className="filter-panel__body">
                    {filters.map(({ id, title, type, key, options }) => (
                        < Accordion
                            key={id}
                            title={title}
                            onToggle={() => toggleAccordion(id)}
                            isOpen={activeAccordion === id}>

                            <ul className="filter-options">
                                {options.map((option) => (
                                    <li key={option.id} className="filter-options__list">
                                        <div className="filter-input-group ">
                                            <label
                                                htmlFor={`${key}-${option.id}`}
                                                className="filter-input-group__label">
                                                {option.label}
                                            </label>
                                            <input
                                                type={type}
                                                value={option.value}
                                                id={`${key}-${option.id}`}
                                                checked={isOptionChecked(key, option.value)}
                                                onChange={() => {
                                                    handleInputChanges(key, option.value)
                                                }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Accordion>
                    ))}
                </div>

                <div className="filter-panel__footer">
                    <button
                        onClick={actionReset} Ÿ
                        className="btn">Reset</button>
                    <button
                        onClick={onApply}
                        className="btn btn--primary">Apply</button>
                </div>
            </aside >
            <div className={`filter-panel-backdrop ${isFilterOpen ? "active" : ""}`} onClick={onClose}></div>
        </>
    )
}
export default SortFilter