import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShowSubCategories() {

    const [showSubCategory, setShowSubCategory] = useState([]);
    const navigate = useNavigate();

    const handleClick = async () => {
        navigate('/subCategory');
    }

    const fetchSubCategories = async () => {
        const res = await fetch('http://localhost:8991/V2/subcategories', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })

        const result = await res.json();
        console.log("result ==>", result.data);
        setShowSubCategory(result.data)
    }

    useEffect(() => {
        fetchSubCategories();
    }, [])

    const delSubCategory = async (SubCategoryId) => {
        try {
            const deletSubCatlApi = await fetch(`http://localhost:8991/V2/subcategories/delete?SubCategoryid=${SubCategoryId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            toast.success('Sub category deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            console.log("deletSubCatlApi==>", deletSubCatlApi);
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    const editSubCategory = async (subCatId, catName) => {
        localStorage.setItem("catName", catName)
        navigate(`/subCategory/edit/${subCatId}`);
    }

    return (
        <div>
            <div className="container mt-4">

                <button type="button" className="btn btn-dark mb-3" onClick={handleClick}>Add Subcategories</button>
                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr. no</th>
                            <th>Category</th>
                            <th>Subcat Id</th>
                            <th>cat Id</th>
                            <th>Subcat Name</th>
                            <th>Subcat Status</th>
                            <th style={{ width: '180px' }}>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {showSubCategory.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.catname}</td>
                                <td>{item.subcatid}</td>
                                <td>{item.catid}</td>
                                <td>{item.subcatname}</td>
                                <td>{item.subcatstatus}</td>

                                <td>
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => editSubCategory(item.subcatid, item.catname)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => delSubCategory(item.subcatid)}>Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowSubCategories;
