import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const calcScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        window.addEventListener('resize', calcScreenSize);
        return () => window.removeEventListener("resize", calcScreenSize);
    }, [])
    return isMobile;
}
export default useIsMobile;
