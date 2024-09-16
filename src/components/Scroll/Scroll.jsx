import React from "react";
import style from "./Scroll.module.scss";
import Item from "../Item/Item";

export default function Scroll({ data }) {
    return (
        <>
            <div className={`row g-4 overflow-auto flex-nowrap mb-3 mx-1 ${style.scrollStyle}`}>
                {data.map((item) => (
                    <div className="col-md-3 col-lg-2 col-6" key={item.id}>
                        <Item data={item} media_type={item.media_type} />
                    </div>
                ))}
            </div>
        </>
    );
}
