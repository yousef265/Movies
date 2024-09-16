import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserData } from "../../Context/UserData";
import Item from "../Item/Item";
import { Paginator } from "primereact/paginator";

export default function Movies() {
    const { title } = useParams();
    const { getDiffMediaTypeData, getSearchData } = useContext(UserData);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [moviesData, setMoviesData] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchData = async () => {
        if (searchValue) {
            await getSearchData("movie", searchValue, first / rows + 1, setMoviesData);
        } else {
            await getDiffMediaTypeData("movie", title, setMoviesData, first / rows + 1);
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
        setFirst(0); // Reset pagination on new search
    };

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    // console.log(moviesData);

    return (
        <>
            {moviesData ? (
                <>
                    <input type="text" onChange={handleSearchChange} className="form-control my-3 w-50 mx-auto bg-transparent text-white fw-bold" placeholder={`Search for ${title}...`} />
                    {moviesData.results.length > 0 ? (
                        <>
                            <div className="row ">
                                {moviesData.results.map((item) => (
                                    <Item data={item} key={item.id} media_type={"movie"} />
                                ))}
                            </div>
                            <div className="pagination">
                                <Paginator first={first} rows={rows} totalRecords={Math.min(moviesData.total_pages, 500) * rows} onPageChange={onPageChange} />
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-white fw-bold m-5">No results found.</p>
                    )}
                </>
            ) : (
                <i className="fa fa-spinner position-absolute top-50 start-50 fa-spin fs-1"></i>
            )}
        </>
    );
}
