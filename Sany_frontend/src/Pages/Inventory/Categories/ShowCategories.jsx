import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, fetchCategories } from '../../../features/categories/categorySlice';

function ShowCategories() {
    // const [showCategory, setShowCategory] = useState([]);

    const { value, loading, error } = useSelector((state) => state.categories);
    // 
    const navigate = useNavigate();

    // const fetchCategories = async () => {
    //     try {
    //         const res = await fetch('http://localhost:8991/V2/categories', {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         const result = await res.json();
    //         console.log(result);

    //         setShowCategory(result.data);
    //     } catch (error) {
    //         console.error('Error fetching categories:', error);
    //     }
    // };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleClick = () => {
        navigate('/addCategory');
    };

    // const delCategory = async (catId) => {
    //     try {
    //         // const deleteCatApi = await fetch(`http://localhost:8991/V2/categories/delete?Categoryid=${catId}`, {
    //         //     method: 'DELETE',
    //         //     headers: {
    //         //         'Content-Type': 'application/json',
    //         //     }
    //         // })

    //         // toast.success('Category deleted successfully');
    //         // setTimeout(() => {
    //         //     window.location.reload();
    //         // }, 3000);

    //     } catch (err) {
    //         toast.error('Something went wrong')
    //     }
    // }

    const handleEdit = async (catId) => {
        navigate(`/category/edit/${catId}`);
    }

    const handleDelete = async (catId) => {
        dispatch(deleteCategory(catId));
        toast.success("Category deleted successfully");
    }


    return (
        <div className="container mt-4">
            <button type="button" className="btn btn-dark mb-3" onClick={handleClick}>
                Create Category
            </button>
            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Sr. no</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {value.map((item, index) => (
                        <tr key={item.catid}>
                            <td>{index + 1}</td>
                            <td>{item.catid}</td>
                            <td>{item.catname}</td>
                            <td>{item.catstatus}</td>
                            <td>
                                {/* Placeholder for future action buttons */}
                                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item.catid)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.catid)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShowCategories;
