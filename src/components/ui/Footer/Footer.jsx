import "./Footer.scss";
import logoicon from "../../../assets/logo/logo.svg"

// React Core
import { useState } from "react";

// Icons
import {
    ChevronDown,
    ChevronRight
} from "react-bootstrap-icons";

// Data
import footerMenu from "../../../data/footer.json";

// Custom Hook
import useIsMobile from "../../../hooks/useIsMobile";

const Footer = () => {
    const footerData = footerMenu.menus;
    const isMobileDevice = useIsMobile();
    const [activeAccordion, setActiveAccordion] = useState(null);
    const date = new Date();

    // ------------------------------------------
    // Accordion Footer
    // ------------------------------------------
    const toggleAccordion = (id) => {
        setActiveAccordion((prev) => {
            if (prev === id) {
                return null;
            }

            return id;
        });
    };

    return (
        <footer className="footer">
            <div className="container-fluid">

                {isMobileDevice &&
                    <div className="footer__logo">
                        <img
                            src={logoicon}
                            alt="45 Degree"
                        />
                    </div>
                }
                <div className="footer__container">

                    {footerData.map((section,index) => (
                        <div
                            className="footer__column"
                            key={`${section.id}_${index}`}
                        >
                            <div className="footer-categ">

                                <div
                                    className="footer-categ__header"
                                    onClick={() => {
                                        if (isMobileDevice) {
                                            toggleAccordion(section.id);
                                        }
                                    }}
                                >
                                    <span>
                                        {section.title}
                                    </span>

                                    {isMobileDevice && (
                                        <div className="icon">
                                            {activeAccordion === section.id ? (
                                                <ChevronDown />
                                            ) : (
                                                <ChevronRight />
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className={`footer-categ__body ${activeAccordion === section.id
                                        ? "active"
                                        : ""
                                        }`}
                                >
                                    <ul className="categ-list">

                                        {section.items.map((item, index) => (
                                            <li
                                                className="categ-list__item"
                                                key={`${item}_${index}`}
                                            >
                                                {item.type === "link" ? (
                                                    <a
                                                        href={item.href}
                                                        className="categ-list__link"
                                                    >
                                                        {item.label}
                                                    </a>
                                                ) : (
                                                    <div className="categ-list__block">
                                                        {item.content}
                                                    </div>
                                                )}
                                            </li>
                                        ))}

                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="copy-right">
                <div className="container-fluid">
                    <div className="copy-right__container">

                        <ul className="copy-right-menus">
                            <li className="copy-right-menus__link">
                                Site map
                            </li>
                            <li className="copy-right-menus__link">
                                Privacy Policy
                            </li>
                        </ul>

                        <div className="copy-right__right">
                            &copy; 45 degrees
                            {date.getFullYear()}. All rights reserved
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;