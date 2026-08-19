import "./Navigation.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// data
import menubarLinks from "../../../data/menus.json";
// Bootstrap icons
import {
    ChevronRight,
    ChevronLeft,
    List, Search,
    Heart,
    Bag,
    Person,
    XLg
} from "react-bootstrap-icons";
// Component binding
import useIsMobile from "../../../hooks/useIsMobile";


// For menu items
const menus = menubarLinks.navigation;
const Navigation = () => {
    // Navigation
    const navigate = useNavigate();
    // Find device
    const isMobileDev = useIsMobile();
    const [currentMenu, setCurrentMenu] = useState(menus);
    const [prevMenu, setPrevMenu] = useState([]);
    const [menuLabel, setMenuLabel] = useState("");

    // Side menubar open/close status
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    //------------------------------------------------
    // Menu Open
    //------------------------------------------------
    const openMenu = () => {
        setIsMenuOpen(true);
    }

    //------------------------------------------------
    // Menu Open
    //------------------------------------------------
    const closeMenu = () => {
        // Reset menu to the main menu
        setCurrentMenu(menus);

        // Clear previous menu history
        setPrevMenu([]);

        // Reset menu title
        setMenuLabel("");
        setIsMenuOpen(false);
    }

    //------------------------------------------------
    // Submenu list Open
    //------------------------------------------------
    const handleMenuClick = (menuItem) => {
        if (menuItem.children?.length > 0) {
            setPrevMenu((prev) => [
                ...prev,
                {
                    menu: currentMenu,
                    label: menuLabel
                }
            ])
            setMenuLabel(menuItem.name);
            setCurrentMenu(menuItem.children);
        }
        else {
            navigate(menuItem.path);
            closeMenu();
        }

    }

    //------------------------------------------------
    // Go back to parent node
    //------------------------------------------------
    const backToParentMenu = () => {
        const lastMenu = prevMenu[prevMenu.length - 1];
        if (!lastMenu) {
            return;
        }
        setCurrentMenu(lastMenu.menu);
        setMenuLabel(lastMenu.label);

        setPrevMenu(prevMenu.slice(0, -1));
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
                {/* Navbar holder header */}
                <div className="navbar-holder__header">
                    <button
                        onClick={closeMenu}
                        className="btn cta-button-close">
                        <XLg />
                        <span>Close</span>
                    </button>
                </div>

                {/* Navbar holder body */}
                <div className="navbar-holder__body">
                    {/* Back button */}
                    {prevMenu.length > 0 && (
                        <button
                            className="btn menu-button-back"
                            onClick={backToParentMenu}>
                            <span className="icon">
                                <ChevronLeft />
                            </span>
                            <span className="label">
                                {menuLabel}
                            </span>
                        </button>
                    )}
                    {/* Menu items */}
                    <ul className="menu-items">
                        {currentMenu.map((menu) => (
                            <li
                                key={menu.id}
                                className="menu-items__list">
                                {
                                    <button
                                        onClick={() => handleMenuClick(menu)}
                                        className="btn menu-items__link">
                                        <span className="label">
                                            {menu.name}
                                        </span>
                                        {menu.children?.length > 0 && (
                                            <span className="icon">
                                                <ChevronRight />
                                            </span>
                                        )}
                                    </button>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <div
                className={`navbar-holder-backdrop ${isMenuOpen ? 'is-active' : ''}`}
                onClick={closeMenu}></div>
        </header>
    )
}
export default Navigation