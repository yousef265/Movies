import React, { useState, useEffect } from "react";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import styles from "./Options.module.scss";

export default function Options({ options, title, value, setValue }) {
    const [isMobile, setIsMobile] = useState(false);

    // Handle screen size detection
    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768); // Small screen size threshold (768px)
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize(); // Check initial size

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleChangeValue = (e, element) => {
        const selectedOption = options.find((ele) => ele.value === e.target.value);

        if (selectedOption) {
            setValue((prev) => prev.map((item) => (item.category === element.category ? { ...item, value: selectedOption.value, endPoint: selectedOption.endPoint } : item)));
        }
    };

    return (
        <div className={styles.optionStyle}>
            <span className="align-self-center fw-bold fs-4 me-2">{title}</span>

            {isMobile ? (
                // Dropdown for small screens
                <Dropdown className="bg-gradient" value={value.value} options={options} onChange={(e) => handleChangeValue(e, value)} checkmark={true} highlightOnSelect={false} />
            ) : (
                // SelectButton for larger screens
                <SelectButton className="bg-gradient" value={value.value} onChange={(e) => handleChangeValue(e, value)} options={options} />
            )}
        </div>
    );
}
