import React, { useEffect, useState } from 'react';
import { FaThLarge, FaListUl, FaTh, FaUserCog } from 'react-icons/fa';

const DashboardCards = () => {

    const [category, setCategory] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    const [model, setModel] = useState(0);
    const [dealer, setDealer] = useState(0);

    const cards = [
        {
            title: 'Categories',
            count: category,
            icon: <FaThLarge size={30} color="cyan" />,
            borderColor: 'border-info',
        },
        {
            title: 'Sub-Categories',
            count: subCategory,
            icon: <FaListUl size={30} color="red" />,
            borderColor: 'border-danger',
        },
        {
            title: 'Models',
            count: model,
            icon: <FaTh size={30} color="green" />,
            borderColor: 'border-success',
        },
        {
            title: 'Dealers',
            count: dealer,
            icon: <FaUserCog size={30} color="orange" />,
            borderColor: 'border-warning',
        },
    ];


    const fetchTableCount = async () => {
        const res = await fetch('http://localhost:8991/V2/tableCount', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const response = await res.json();
        console.log("table Count ==>", response);
        setCategory(response.data.sany_prod_categories);
        setSubCategory(response.data.sany_prod_subcategories);
        setModel(response.data.sany_prod_models);
        setDealer(response.data.sany_dealers);




    }

    useEffect(() => {
        fetchTableCount()
    }, [])


    return (
        <div className="container mt-5">
            <div className="row">
                {cards.map((card, idx) => (
                    <div key={idx} className="col-md-3 mb-4">
                        <div className={`card shadow-sm ${card.borderColor} border-2`}>
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h6>{card.title}</h6>
                                    <h4 className="text-primary">{card.count}</h4>
                                </div>
                                <div>{card.icon}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardCards;
