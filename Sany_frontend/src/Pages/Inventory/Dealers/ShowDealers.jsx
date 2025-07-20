import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { fetchDealers } from '../../../features/dealers/dealersSlice.js'
import { useDispatch, useSelector } from 'react-redux';

function ShowDealers() {
    // const [showDealer, setShowDealer] = useState([]);
    const { dealers, loading, error } = useSelector(state => state.dealers);
    console.log("dealers values ===>", dealers)

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const handleClick = async () => {
        Navigate('/addDealer')
    }

    const handleEdit = async (dealerId) => {
        7
        Navigate(`/dealer/edit/${dealerId}`)
    }

    // const fetchDealers = async () => {
    //     const res = await fetch('http://localhost:8991/V2/showdealers',
    //         {
    //             Method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },

    //         }
    //     );

    //     const result = await res.json();
    //     // console.log("result==>", result.data);

    //     setShowDealer(result.data)
    // }
    useEffect(() => {
        dispatch(fetchDealers());
    }, [])

    const delDealer = async (dealerId) => {
        try {
            const deleteDealerApi = await fetch(`http://localhost:8991/V2//dealers/delete?Dealerid=${dealerId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            toast.success('Dealer deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 3000);

            console.log("deleteCatApi==>", deleteDealerApi);
        } catch (err) {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="container mt-4">

            <button type="button" className="btn btn-dark mb-3" onClick={handleClick}>Add Dealers</button>

            <table className="table">
                <thead className="table-dark">
                    <tr>
                        <th>Sr. no</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Coordinates</th>
                        <th>Zipcode</th>
                        <th>Address</th>
                        <th style={{ width: '180px' }}>Action</th>
                    </tr>

                </thead>
                <tbody>
                    {dealers.map((item, index) => (
                        <tr key={index || item.dealerid}>
                            <td>{index + 1}</td>
                            <td>{item.dealerid}</td>
                            <td>{item.dealername}</td>
                            <td>{item.contactno}</td>
                            <td>{item.lat},{item.lon}</td>
                            <td>{item.zipcode}</td>
                            <td>{item.mapaddr}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(item.dealerid)}>Edit</button>
                                <button className="btn btn-sm btn-danger" onClick={() => delDealer(item.dealerid)}>Delete</button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default ShowDealers;
