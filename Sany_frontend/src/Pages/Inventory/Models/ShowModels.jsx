import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteModels, fetchModels } from '../../../features/model/modelSlice';

function ShowModels() {
    // const [showModels, setShowModels] = useState([]);

    const dispatch = useDispatch();
    const { model, loading, error } = useSelector(state => state.model);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/addModels');
    }

    // const fetchModels = async () => {
    //     const res = await fetch('http://localhost:8991/V2/showmodels', {
    //         Method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json',
    //         },
    //     })

    //     const result = await res.json();
    //     console.log(result);

    //     setShowModels(result.data);
    // }

    useEffect(() => {
        dispatch(fetchModels());
    }, [])


    const handleEdit = (modelId) => {
        navigate(`/models/edit/${modelId}`);
    }

    const delModel = async (modelId) => {
        try {
            // const deletemodelApi = await fetch(`http://localhost:8991/V2/models/delete?Modelid=${modelId}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     }
            // })

            dispatch(deleteModels(modelId));
            toast.success('Model deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div>
            <div className="container mt-4">

                <button type="button" className="btn btn-dark mb-3" onClick={handleClick}>Add Models</button>

                <table className="table">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr. no</th>
                            <th>Model Id</th>
                            <th>Subcat Id</th>
                            <th>Model Code</th>
                            <th>Model Desc</th>
                            <th>Brochure url</th>
                            <th>Status</th>
                            <th>Subcat Name</th>
                            <th style={{ width: '180px' }}>Action</th>
                        </tr>

                    </thead>
                    <tbody>
                        {model.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.modelid}</td>
                                <td>{item.subcatid}</td>
                                <td>{item.modelcode}</td>
                                <td>{item.modeldesc}</td>
                                <td>{item.brochureurl}</td>
                                <td>{item.mstatus}</td>
                                <td>{item.subcatname}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item.modelid)}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => delModel(item.modelid)}>Delete</button>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowModels
