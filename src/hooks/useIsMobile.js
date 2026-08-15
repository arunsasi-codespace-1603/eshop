import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const calcScreenSize = () => {
            setIsMobile(window.innerWidth < 992)
        }
        window.addEventListener('load', calcScreenSize);
        window.addEventListener('resize', calcScreenSize);
        return () => window.removeEventListener("resize", calcScreenSize);
    }, [])
    return isMobile;
}
export default useIsMobile;
