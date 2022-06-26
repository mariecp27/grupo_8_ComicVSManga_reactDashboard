import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetail(){

    let params = useParams();

    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);

	useEffect( () => {
        fetch(`http://localhost:3030/api/products/${params.id}`)
        .then(response => response.json())
        .then(data => {
            setProduct(data);
            setCategories(data.categories)
        })
        .catch(error => console.error(error));
    }, [params.id]);

    return(
        <div className="col-lg-6 mb-4 productDetail__container">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800"> { product.name } </h5>
                </div>
                <div className='productDetail'>
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={ product.image } alt="Imagen producto"/>
                        </div>
                    </div>
                    <div className='productDetail__text'>
                        <p><b>Precio:</b> { product.price } COP</p>
                        <hr/>
                        <p><b>Autor(es):</b> { product.author }</p>
                        <hr/>
                        <p><b>Páginas:</b> { product.pages }</p>
                        <hr/>
                        <p><b>Formato:</b> { product.format }</p>
                        <hr/>
                        <p><b>Descripción:</b></p>
                        <p>{ product.description }</p>
                        <hr/>
                        <p><b>Categorías:</b></p>
                        <ul>
                            { categories.map((category,i) => 
                                <li key = {`category ${i}`}>{ category }</li>
                            )}
                        </ul>
                        <hr/>
                        <p><b>Stock:</b></p>
                        <p>{ product.stock }</p>
                        <Link className="button" to = "/">Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;
