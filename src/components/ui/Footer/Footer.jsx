import "./Footer.scss";

import { useState } from "react";
import useIsMobile from "../../../hooks/useIsMobile";
const footerData = [
    {
        id: 1,
        title: "Help",
        items: [
            {
                type: "text",
                content: (
                    <>
                        <a href="/">Contact us</a>
                        <br />
                        Our Client Advisors will be delighted to assist you on{" "}
                        <a href="/">+44 0000 00 0000</a>, or on{" "}
                        <a href="/">WhatsApp</a>.
                    </>
                )
            },
            {
                type: "link",
                label: "FAQ",
                href: "/faq"
            },
            {
                type: "link",
                label: "Product Care",
                href: "/product-care"
            },
            {
                type: "link",
                label: "Stores",
                href: "/stores"
            }
        ]
    },

    {
        id: 2,
        title: "Services",
        items: [
            {
                type: "link",
                label: "Repairs",
                href: "/repairs"
            },
            {
                type: "link",
                label: "Personalisation",
                href: "/personalisation"
            },
            {
                type: "link",
                label: "Art of Gifting",
                href: "/gifting"
            },
            {
                type: "link",
                label: "Download App",
                href: "/app"
            }
        ]
    },

    {
        id: 3,
        title: "About Company",
        items: [
            {
                type: "link",
                label: "Fashion Shows",
                href: "/fashion-shows"
            },
            {
                type: "link",
                label: "Our Team",
                href: "/team"
            },
            {
                type: "link",
                label: "Sustainability",
                href: "/sustainability"
            },
            {
                type: "link",
                label: "Latest News",
                href: "/news"
            },
            {
                type: "link",
                label: "Ethics & Compliance",
                href: "/ethics"
            },
            {
                type: "link",
                label: "Careers",
                href: "/careers"
            },
            {
                type: "link",
                label: "Foundation",
                href: "/foundation"
            }
        ]
    },

    {
        id: 4,
        title: "Follow Us",
        items: [
            {
                type: "text",
                content:
                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit."
            },
            {
                type: "link",
                label: "Instagram",
                href: "/"
            },
            {
                type: "link",
                label: "Facebook",
                href: "/"
            }
        ]
    }
];
const Footer = () => {
    const isMobileDevice = useIsMobile();
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index) => {
        console.log(index)
        setActiveAccordion(prev =>
            prev === index ? null : index
        );
    }
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer__container">
                        {footerData.map((section) => (
                            < div className="footer__column" key={section.id} >


                                <div className="footer-categ">
                                    <div className="footer-categ__header"
                                        onClick={isMobileDevice ? () => toggleAccordion(section.id) : undefined}>
                                        {section.title}
                                    </div>
                                    <div className={`footer-categ__body ${isMobileDevice && activeAccordion === section.id ? "active" : ""
                                        }`}>

                                        <ul className="categ-list">
                                            {section.items.map((item, index) => (
                                                <li className="categ-list__item" key={index}>
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
            </div>
        </footer >
    )
}
export default Footer