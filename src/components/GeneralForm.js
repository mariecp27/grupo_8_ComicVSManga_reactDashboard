import React, { useState, useEffect } from 'react';

import '../assets/css/formAdminStyle.css'

function GeneralForm(props) {

    const [categories, setCategories] = useState([]);
    const [formats, setFormats] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3030/api/products/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data.categories);
            })
            .catch(error => console.error(error));

        fetch('http://localhost:3030/api/products/formats')
            .then(response => response.json())
            .then(data => {
                setFormats(data.formats);
            })
            .catch(error => console.error(error));
    }, []);
    

    return (
        <div className="card shadow mb-4 formAdmin__container">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">{props.title}</h5>
            </div>
            <div className="card-body">
                <form className='formAdmin'>
                    <div>
                        <label htmlFor='name'><b>{props.productName}</b></label>
                        <input type="text" name="name" id="name" autoComplete="off"></input>
                    </div>

                    <div>
                        <label htmlFor='password'><b>{props.productDescription}</b></label>
                        <textarea name="description" id="description" autoComplete="off" rows={5}></textarea>
                    </div>

                    <div>
                        <label htmlFor='image' className='formAdmin-upload'>{props.productImage}</label>
                        <input type="file" name="image" id="image" autoComplete="off"></input>
                    </div>

                    <div className='formAdmin-categories'>
                        <label htmlFor='category'><b>{props.productCategories}</b></label>
                        {
                            categories.map((category, index) => {
                                return <label key={index}>
                                            <input type="checkbox" name="category" value={category.category_id}></input> { category.category }
                                    </label>
                            })
                        }
                    </div>

                    <div>
                        <label htmlFor='author'><b>{props.productAuthor}</b></label>
                        <input type="text" name="author" id="author" autoComplete="off"></input>
                    </div>

                    <div>
                        <select name="format" id="format" className='formAdmin-formats' autoComplete="off">
                            <option disabled defaultValue>Seleccione formato</option>
                            {
                                formats.map((format, index) => {
                                    return <option key={index}>
                                                {format.format}
                                        </option>
                                })
                            }
                        </select>
                    </div>

                    <button className="btn btn-info">Insertar</button>
                </form>
            </div>
        </div>
    )
}

export default GeneralForm;
