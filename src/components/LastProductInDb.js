import React, { useState, useEffect } from 'react';

function LastProductInDb(){

    const [product, setProduct] = useState([]);

	useEffect( () => {
        fetch('http://localhost:3030/api/products')
        .then(response => response.json())
        .then(data => {
            setProduct(data.products[data.products.length - 1]);
        })
        .catch(error => console.error(error));
    }, []);

    return(
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Último Producto en Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 20 +'rem'}} src={ product.image } alt="Imagen producto"/>
                    </div>
                    <h4>{ product.name }</h4>
                    <p>{ product.description }</p>
                    <a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
