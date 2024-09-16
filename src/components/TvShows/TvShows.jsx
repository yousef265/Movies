import React, { useContext, useEffect, useState } from "react";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";
import { useParams } from "react-router-dom";
import { Paginator } from "primereact/paginator";

export default function TvShows() {
    const { title } = useParams();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [tvData, setTvData] = useState("");
    const { getDiffMediaTypeData, getSearchData } = useContext(UserData);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchData = async () => {
        if (searchValue) {
            await getSearchData("tv", searchValue, first / rows + 1, setTvData);
        } else {
            await getDiffMediaTypeData("tv", title, setTvData, first / rows + 1);
        }
    };

    useEffect(() => {
        handleSearchData();
    }, [handleSearchData]);

    useEffect(() => {
        setFirst(0);
    }, [title]);

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
            {tvData ? (
                <>
                    <input type="text" onChange={handleSearchChange} className="form-control my-3 w-50 mx-auto bg-transparent text-white fw-bold" placeholder={`Search for ${title}...`} />
                    {tvData.results.length > 0 ? (
                        <>
                            <div className="row">
                                {tvData.results.map((item) => (
                                    <Item data={item} key={item.id} media_type={"tv"} />
                                ))}
                            </div>
                            <div className="pagination">
                                <Paginator first={first} rows={rows} totalRecords={Math.min(tvData.total_pages, 500) * rows} onPageChange={onPageChange} />
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
