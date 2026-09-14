import "./Checkbox.scss";

const Checkbox = ({
    id,
    name,
    label,
    value,
    checked,
    onChange
}) => {
    return (
        <>
            <div className="filter-input-group">
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className="filter-input-group__input"
                />
                <label
                    className="filter-input-group__label"
                    htmlFor={id}>{label}</label>
            </div>
        </>
    )
}
export default Checkbox