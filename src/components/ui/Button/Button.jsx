import "./Button.scss"

const Button = ({
    buttonClass,
    title,
    to
}) => {
    return (
        <button className={buttonClass}>{title}</button>
    )
}
export default Button