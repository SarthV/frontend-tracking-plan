import React, { useEffect, useState } from "react";
import axios from "axios";
import './TrackingPlanList.css';
import Separator from "../separator/separator";


const TrackingPlanList = () => {

    const [trackingPlans, setTrackingPlans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/tracking-plan/')
            .then((response) => {
                setTrackingPlans(response.data.data);
                // Handle the successful response
            })
            .catch((error) => {
                // Handle errors
                console.error(error);
            });
    }, []);


    return (
        <div className="tracking-plans-list-container">
            <h1 style={{
                textAlign: 'center'
            }}>Tracking Plans</h1>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Source</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trackingPlans.map((plan) => (
                            <tr key={plan.id}>
                                <td>{plan.id}</td>
                                <td>{plan.name}</td>
                                <td>{plan.description || '-'}</td>
                                <td>{plan.source || '-'}</td>
                                <td>{new Date(plan.createdAt).toLocaleString()}</td>
                                <td>{new Date(plan.updatedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Separator height='10px' color='transparent' />
            </div>
        </div>
    );
}

export default TrackingPlanList;