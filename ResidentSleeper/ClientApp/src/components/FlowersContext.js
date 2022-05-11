import React, { useState, createContext, useEffect } from 'react';

export const FlowersContext = createContext();

export const FlowersProvider = props => {

    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('api/Flower');
        const items = await data.json();
        console.log(items);
        setItems(items.data);
    };

    return (
        <FlowersContext.Provider value={[items, setItems]}>
            {props.children}
        </FlowersContext.Provider>
    );
};