import "./SideDrawer.scss";
// Icons
import { XLg } from "react-bootstrap-icons";

const SideDrawer = ({
    isOpen,
    title,
    content,
    closeSideDrawer }) => {
    return (
        <>
            <aside
                className={`side-drawer-panel ${isOpen ? "active" : ""}`}>
                <div className="side-drawer-panel__header">
                    <button
                        onClick={closeSideDrawer}
                        className="btn btn--transparent button-filter-close">
                        <span className="label">Close</span>
                        <span className="icon"><XLg /></span>
                    </button>
                </div>
                <div className="side-drawer-panel__body">
                    <h1>{title}</h1>
                    <div>
                        {content}
                    </div>
                </div>
            </aside>
            <div className={`side-drawer-panel-backdrop ${isOpen ? "active" : ""}`}
                onClick={closeSideDrawer}></div>
        </>
    )
}
export default SideDrawer;