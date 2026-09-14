import "./RadioButton.scss";

const RadioButton = ({
    id,
    name,
    label,
    value,
    checked,
    onChange
}) => {
    return (
        <div>
            <div className="filter-input-group">
                <input
                    type="radio"
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
        </div>
    )
}
export default RadioButton