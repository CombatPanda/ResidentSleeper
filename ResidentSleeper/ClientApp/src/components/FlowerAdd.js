import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

export class FlowerAdd extends Component {
    static displayName = FlowerAdd.name;

    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},

        }

        this.handleChange = this.handleChange.bind(this);
        this.submitFlowerForm = this.submitFlowerForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submitFlowerForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            const newFlower = {
                name: this.refs.name.value,
                description: this.refs.description.value,
                flowerType: this.refs.flowerType.value,
                count: this.refs.count.value,
                cost: this.refs.cost.value,
                pictureURL: this.refs.pictureURL.value
            }
            this.addFlower(newFlower);
            let fields = {};
            fields["name"] = "";
            fields["description"] = "";
            fields["flowerType"] = "";
            fields["count"] = "";
            fields["cost"] = "";
            fields["pictureURL"] = "";
            this.setState({ fields: fields });
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter a name.";
        }

        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "*Please enter a description.";
        }


        if (!fields["flowerType"]) {
            formIsValid = false;
            errors["flowerType"] = "*Please enter a flower type.";
        }
        if (!fields["count"]) {
            formIsValid = false;
            errors["count"] = "*Please enter a flower count.";
        }
        if (!fields["cost"]) {
            formIsValid = false;
            errors["cost"] = "*Please enter how much the flower costs.";
        }
        if (!fields["pictureURL"]) {
            formIsValid = false;
            errors["pictureURL"] = "*Please enter a flower pictureURL.";
        }



        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    addFlower(newFlower) {
        fetch('api/Flower', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newFlower.name,
                description: newFlower.description,
                flowerType: newFlower.flowerType,
                count: newFlower.count,
                cost: newFlower.cost,
                pictureURL: newFlower.pictureURL
            })
        }).then(response => {
            if (response.ok) {
                alert("Successfully added a flower")
                window.location.reload();
            }


        });

    }

    render() {
        return (
            <div>

                <h1>Add flower</h1>

                <form onSubmit={this.submitFlowerForm}>
                    <div className="imput-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" ref="name" value={this.state.fields.name} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.name}</div>
                    </div>
                    <div className="imput-field">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" ref="description" value={this.state.fields.description} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.description}</div>

                    </div>
                    <div className="imput-field">
                        <label htmlFor="flowerType">Flower type</label>
                        <input type="text" name="flowerType" ref="flowerType" value={this.state.fields.flowerType} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.flowerType}</div>
                    </div>
                    <div className="imput-field">
                        <label htmlFor="count">Count</label>
                        <input type="text" name="count" ref="count" value={this.state.fields.count} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.count}</div>
                    </div>
                    <div className="imput-field">
                        <label htmlFor="cost">Cost</label>
                        <input type="text" name="cost" ref="cost" value={this.state.fields.cost} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.cost}</div>
                    </div>
                    <div className="imput-field">
                        <label htmlFor="pictureURL">Picture URL</label>
                        <input type="text" name="pictureURL" ref="pictureURL" value={this.state.fields.pictureURL} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.pictureURL}</div>
                    </div>
                    <input type="submit" value="Save" className="btn" />
                </form>

            </div>
        )
    }
}
export default FlowerAdd;