import "./ProductFilters.scss";
// React Core
import { useEffect, useState } from "react";
// Data
import filterList from "../../data/filters.json";
// icons
import {
    ChevronDown,
    ChevronRight,
    XLg
} from "react-bootstrap-icons";
// Component Binding
import Checkbox from "../ui/FormComponents/Checkbox/Checkbox";
import RadioButton from "../ui/FormComponents/RadioButton/RadioButton";

const ProductFilters = ({
    filters,
    setFilters,
    setAppliedFilters,
    sortOption,
    setSortOption,
    isFilterOpen,
    openFilterPanel,
    closeFilterPanel
}) => {
    const filterConfig = filterList.filters;

    //-----------------------------------------
    // Handle changes from filter controls 
    // (sort, colors, sizes, etc.)
    //-----------------------------------------
    const handleChange = (event) => {
        const type = event.target.type;
        const name = event.target.name;
        const value = event.target.value;
        const isChecked = event.target.checked;

        // Update the selected sorting option
        if (type === "radio" && name === "sort") {
            setSortOption({
                value: value
            });
            return;
        }

        // Add or remove values from checkbox-based filters
        if (type === "checkbox") {
            if (isChecked) {
                setFilters(prev => {
                    const newValues = [...prev[name], value];

                    return {
                        ...prev,
                        [name]: newValues
                    };
                });
            } else {
                setFilters(prev => {
                    const newValues = prev[name].filter(item => item !== value);

                    return {
                        ...prev,
                        [name]: newValues
                    };
                });
            }
        }
    }

    // Log filter changes during development
    useEffect(() => {
    }, [filters]);

    //-----------------------------------------
    // Render InputField
    //-----------------------------------------
    const renderFilterInput = (filterType, option, filter) => {
        if (filterType === "checkbox") {
            return (
                <Checkbox
                    key={option.id}
                    id={option.id}
                    name={filter.id}
                    label={option.label}
                    value={option.value}
                    checked={filters[filter.id].includes(option.value)}
                    onChange={handleChange}
                />
            );
        }

        if (filterType === "radio") {
            return (
                <RadioButton
                    key={option.id}
                    id={option.id}
                    name={filter.id}
                    label={option.label}
                    value={option.value}
                    checked={sortOption.value === option.value}
                    onChange={handleChange}
                />
            );
        }

        return null;
    };

    //-----------------------------------------
    // Expand Panel
    //-----------------------------------------
    const [expandedPanel, setExpandedPanel] = useState(null);
    const togglePanel = (panelId) => {
        setExpandedPanel((prev) => {
            if (prev === panelId) {
                return null;
            }
            return panelId;
        });
    };

    //-----------------------------------------
    // Get Selected Filter Count
    //-----------------------------------------
    // Returns the number of selected options
    // for each filter.
    // Example:
    // Color (01)
    // Size (02)
    //-----------------------------------------
    const updateFilterCount = (filter) => {

        // Count selected colors.
        if (filter.id === "colors") {
            return filters.colors.length;
        }

        // Count selected sizes.
        if (filter.id === "sizes") {
            return filters.sizes.length;
        }

        // Return 0 when the filter does not
        // have a selected option.
        return 0;
    };

    //-----------------------------------------
    // Apply Selected Filters
    //-----------------------------------------
    // Copies the temporary filters into the
    // applied filters when the user clicks
    // "Show products".
    //-----------------------------------------
    const applyFilters = () => {
        setAppliedFilters(filters);
        closeFilterPanel();
    };

    //-----------------------------------------
    // Reset All Filters
    //-----------------------------------------
    const resetFilters = () => {
        // Clear temporary selections
        setFilters({
            colors: [],
            sizes: [],
            priceRange: ""
        });
        // Clear applied filters
        setAppliedFilters({
            colors: [],
            sizes: [],
            priceRange: ""
        });
    };

    return (
        <>
            <aside
                className={`filter-panel ${isFilterOpen ? "active" : ""}`}>
                <div className="filter-panel__header">
                    <div className="title">Filter and Sort</div>
                    <button onClick={closeFilterPanel}
                        className="btn button-filter-close">
                        <span className="label">Close</span>
                        <span className="icon"><XLg /></span>
                    </button>
                </div>
                <div className="filter-panel__body">

                    {filterConfig.map((filter) => (
                        <div
                            key={filter.id}
                            className={`expandable-panel ${expandedPanel === filter.id ? "active" : ""
                                }`}>
                            <div
                                onClick={() => togglePanel(filter.id)}
                                className="expandable-panel__header">

                                <span>{filter.label}</span>
                                {updateFilterCount(filter) > 0 && (
                                    <span className="count">
                                        ({String(updateFilterCount(filter)).padStart(2, "0")})
                                    </span>
                                )}

                                <div className="expandable-panel__expand-icon">
                                    {expandedPanel === filter.id ?
                                        <ChevronDown /> :
                                        <ChevronRight />}
                                </div>
                            </div>
                            <div className="expandable-panel__body">
                                <div className="expandable-panel__container">
                                    <div className="filter-options">
                                        <div className="filter-options__list">
                                            {filter.options.map((option) => (
                                                renderFilterInput(filter.type, option, filter)
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="filter-panel__footer">
                    {(filters.colors.length !== 0 || filters.sizes.length !== 0) && (
                        <button
                            onClick={resetFilters}
                            className="btn-borderless button-reset-filter left"
                        >
                            Reset all Filters
                        </button>
                    )}
                    <button
                        onClick={applyFilters}
                        className="btn btn--primary button-apply-filter">
                        Show products
                    </button>
                </div>
            </aside >

            <div onClick={closeFilterPanel}
                className={`filter-panel-backdrop ${isFilterOpen ? "active" : ""}`}></div>
        </>
    )
}
export default ProductFilters;