import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export class Flowers extends Component {
    static displayName = Flowers.name;

    constructor(props) {
        super(props);
        this.state = {
            flowers: [],
            loading: true
        };
        this.addToCart = this.addToCart.bind(this);
    }
    

    addToCart(id){
        if (window.confirm('Are you sure?')) {
            fetch('https://localhost:5001/api/Orders/' + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            window.location.reload();
        }
    }

    componentDidMount() {
        this.populateFlower();
    }

    static renderFlowersTable(flowers) {

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Flower</th>
                        <th>Type</th>
                        <th>Cost</th>
                        <th>Count</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    {flowers.map(flower =>
                        <tr key={flower.id}>
                            <td>{flower.PictureURL}</td>
                            <td>{flower.name}</td>
                            <td>{flower.description}</td>
                            <td>{flower.cost}</td>
                            <td>{flower.count}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => { this.addToCart(flower.id) }}
                                >
                                    Add to shopping cart
                                </button>
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Flowers.renderFlowersTable(this.state.flowers);
            
        return (
            <div>
                <h1 id="tabelLabel" >Flower list</h1>
                {contents}
            </div>
        );
    }



    async populateFlower() {
        const response = await fetch('api/Flower');
        const data = await response.json();
        console.log(data);
        this.setState({ flowers: data, loading: false });
    }

}
