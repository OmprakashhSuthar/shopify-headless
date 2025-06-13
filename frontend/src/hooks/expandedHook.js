import { useState } from "react"

const useExpandedSection = () => {
    const [expanded, setExpanded] = useState({});

    const toggleSection = (key) => {
        setExpanded((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return { expanded, toggleSection };
}

export default useExpandedSection;