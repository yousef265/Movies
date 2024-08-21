import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";
import { Paginator } from "primereact/paginator";

export default function People() {
    const [peopleData, setPeopleData] = useState("");
    const { getDiffMediaTypeData, getSearchData } = useContext(UserData);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchData = async () => {
        if (searchValue) {
            await getSearchData("person", searchValue, first / rows + 1, setPeopleData);
        } else {
            await getDiffMediaTypeData("person", "popular", setPeopleData, first / rows + 1);
        }
    };

    useEffect(() => {
        handleSearchData();
    }, [handleSearchData]);

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
        setFirst(0);
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <>
            {peopleData ? (
                <>
                    <input type="text" onChange={handleSearchChange} className="form-control mt-3 w-50 mx-auto bg-transparent text-white fw-bold" placeholder={`Search for a Person...`} />
                    {peopleData.results.length > 0 ? (
                        <>
                            {" "}
                            <div className="row mt-5">
                                {peopleData.results.map((item) => (
                                    <Item data={item} key={item.id} media_type={"person"} />
                                ))}
                            </div>
                            <div className="pagination">
                                <Paginator first={first} rows={rows} totalRecords={peopleData.total_pages <= 500 ? peopleData.total_pages : 500} onPageChange={onPageChange} />
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white fw-bold m-5">No results found.</p>
                    )}
                </>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1 "></i>
            )}
        </>
    );
}
