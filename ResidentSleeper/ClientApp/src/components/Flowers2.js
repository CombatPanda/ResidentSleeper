import React, { Component, useState, useContext, useEffect } from 'react';
import { FlowersContext } from './FlowersContext';
import { Route } from 'react-router-dom';
import { Button } from 'reactstrap';

const Flowers2 = () => {
    const [items, setItems] = useContext(FlowersContext);

    const addToCart = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:44312/api/SavingsManagerInformations/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            window.location.reload();
        }
    }
    useEffect(() => {
        fetchFlowers();
    }, []);

    const [flowers, setFlowers] = useState('');

    const fetchFlowers = async () => {
        const data = await fetch('api/Flower');
        const flowers = await data.json();
        console.log(flowers);
        setFlowers(flowers.data);
    };

    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Flower</th>
                    <th>Type</th>
                    <th>Cost</th>
                    <th>Count</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
                {items.map(flower =>
                    <tr key={flower.id}>
                        <td>{flower.name}</td>
                        <td>{flower.description}</td>
                        <td>{flower.cost}</td>
                        <td>{flower.count}</td>
                        <td><Route render={({ history }) => (
                            <button
                                className="btn btn-primary"
                                onClick={() => this.addToCart(flower.id)}
                            >
                                Add to shopping cart
                            </button>
                        )} /></td>
                    </tr>
                )}

            </tbody>
        </table>
    );
};

export default Flowers2;

