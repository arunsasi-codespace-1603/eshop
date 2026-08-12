import { ChevronDown, ChevronRight } from "react-bootstrap-icons";
import "./Accordion.scss";

const Accordion = ({
    title,
    children,
    onToggle,
    isOpen
}) => {
    return (

        <>
            <div className={`accordion-block ${isOpen ? "open-accordion" : ""}`}>
                <div className="accordion-block__header">
                    <button
                        onClick={onToggle}
                        className="btn button-expandable ">
                        <span>{title}</span>
                        <span className="button-expandable__icon">
                            {(!isOpen) ?
                                <ChevronRight /> :
                                <ChevronDown />}
                        </span>
                    </button>
                </div>
                <div className="accordion-block__body">
                    <div className="accordion-block__body-inner">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Accordion