import "./Navbar.scss";
import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
// Library
import { Link } from "react-router-dom";
// import data
import NavigationData from "../../../data/navigation.json";

import {
    ChevronRight,
    ChevronLeft,
    List, Search,
    Heart,
    Bag,
    Person,
    XLg
} from "react-bootstrap-icons";


// Menu Items
const menu = NavigationData.navigation;

const Navbar = () => {
    // get screen size
    const isMobileDev = useIsMobile();
    // menubar status
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // Stack of menus
    const [menuStack, setMenuStack] = useState([
        {
            title: "Menu",
            items: menu
        }
    ]);
    const currentMenu = menuStack[menuStack.length - 1];
    // menu open
    const openMenu = () => {
        setIsMenuOpen(true);
    }

    // close menu
    const closeMenu = () => {
        setIsMenuOpen(false);
        setMenuStack([
            {
                title: "Menu",
                items: menu
            }
        ]);
    }

    // show sub menu
    const goToChildNode = (item) => {
        if (!item.children) { return }
        setMenuStack(prev => [
            ...prev,
            {
                title: item.title,
                items: item.children
            }
        ]);
    }

    // return to parent menu
    const goToParentNode = () => {
        console.log("back", menuStack)
        setMenuStack(prev =>
            prev.slice(0, -1)
        );
    }

    return (
        <header>

            <nav className="navbar">
                <div className="container-fluid">
                    <div className="navbar__container">
                        <a href="/" className="navbar__logo">Logo</a>
                        <div className="navbar__tools-left">
                            <button className="btn button-tools-cta" onClick={openMenu}>
                                <List />
                                {!isMobileDev && <span>Menu</span>}
                            </button>
                            <button className="btn button-tools-cta">
                                <Search />
                                {!isMobileDev && <span>Search</span>}
                            </button>
                        </div>
                        <div className="navbar__tools-right">
                            {!isMobileDev && (
                                <button className="btn button-tools-cta">
                                    <span>Contact</span>
                                </button>
                            )}
                            {!isMobileDev && (
                                <button className="btn button-tools-cta"><Heart /></button>
                            )}
                            <button className="btn button-tools-cta"><Person /></button>
                            <button className="btn button-tools-cta"><Bag /></button>
                        </div>
                    </div>
                </div>
            </nav>


            <aside className={`navbar-holder ${isMenuOpen ? "is-active" : ""}`}>

                <div className="navbar-holder__header">
                    <button
                        onClick={closeMenu} className="btn cta-button-close">
                        <XLg />
                        <span>Close</span>
                    </button>
                </div>
                <div className="navbar-holder__body">

                    <div className="megamenu">
                        <div className="megamenu__container">
                            <div className="megamenu__content">
                                <ul className="menu-items">
                                    {menuStack.length > 1 && (
                                        <li className="menu-items__list">
                                            <a href="#"
                                                className="menu-items__link menu-items__link--reverse" onClick={() => goToParentNode()}>
                                                <span className="icon"><ChevronLeft /></span>
                                                <span className="label">{currentMenu.title}</span>

                                            </a>
                                        </li>
                                    )}
                                    {currentMenu.items.map((item) => (
                                        <li key={item.id} className="menu-items__list">
                                            <Link
                                                to={item.link}
                                                className="menu-items__link"
                                                onClick={() => goToChildNode(item)}
                                            >
                                                <span className="label">
                                                    {item.title}
                                                </span>

                                                {item.children?.length > 0 && (
                                                    <span className="icon">
                                                        <ChevronRight />
                                                    </span>
                                                )}
                                            </Link>
                                        </li>))}
                                </ul>
                            </div>
                            {/* {menuStack.length > 1 && (
                            <div className="megamenu__panel">
                                right
                            </div>
                        )} */}
                        </div>
                    </div>
                </div>

            </aside>
            <div className={`navbar-holder-backdrop ${isMenuOpen ? 'is-active' : ''}`} onClick={closeMenu}></div>
        </header>
    )
}
export default Navbar