import React, { useState, useEffect } from 'react';
import Input from './Input';

import '../assets/css/formAdminStyle.css'
import imagenFondo from '../assets/images/404.png';

function CreationForm() {
    const [enter, setEnter] = useState(false);
    const [categories, setCategories] = useState([]);
    const [formats, setFormats] = useState([]);
	const [form, setForm] = useState({});
	const [formError, setFormError] = useState('');
    const [checked, setChecked] = useState([]);
    const [checkedSingle, setCheckedSingle] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        if (token) {
            fetch('http://localhost:3030/api/users/login', {
                headers: {
                    'authorization': token
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.error) {
                        setEnter(true);
                    }
                })
                .catch(error => console.error(error));

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
        }
    }, []);

    const handleChange = (e) => {
        let updatedList = [...checked];

        if (e.target.checked) {
          updatedList = [...checked, e.target.value];
        } else {
          updatedList.splice(checked.indexOf(e.target.value), 1);
        }

        setChecked(updatedList);

        setForm({
			...form,
			[e.target.name]: e.target.value,
            category: checked
		})

        console.log(form);
    };


    const handleSingle = (e) => {
        setCheckedSingle(!checkedSingle);

        if(!checkedSingle){
            setForm({
                ...form,
                [e.target.name]: e.target.value,
                category: checked
            })
        }else{
            setForm({
                ...form,
                [e.target.name]: "off",
                category: checked
            })
        }
    };

	const createProduct = (e) => {
		e.preventDefault()
		const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
		if (token) {
			fetch('http://localhost:3030/api/products/create', {
			    method: 'POST',
				headers: {
					'authorization': token,
                    'Content-Type': 'application/json'
				},
                body: JSON.stringify(form)
			})
				.then(response => response.json())
				.then(data => {
                    if(!data.errors){
                        console.log(data);
                    }else{
                        setFormError(data.errors);
                        console.log(data);
                    }
				})
				.catch(error => console.error(error));
		}
	}

    return (
        <React.Fragment>
            {enter &&
                <div className="card shadow mb-4 formAdmin__container">
                    <div className="card-header py-3">
                        <h5 className="m-0 font-weight-bold text-gray-800">Creación de productos</h5>
                    </div>
                    <div className="card-body">
                        <form className='formAdmin' onSubmit = { (e) => { createProduct(e) } }>
                            <Input
                                id="name"
                                title="Nombre del producto"
                                type="text"
                                name="name"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "name" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <div>
                                <label htmlFor='password'><b>Descripción</b></label>
                                <textarea name="description" id="description" autoComplete="off" rows={5} onChange={ (e) => handleChange(e) }></textarea>
                            </div>
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "description" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <Input
                                id="image"
                                title="Subir imagen"
                                type="file"
                                name="image"
                                className="formAdmin-upload"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "image" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <div className='formAdmin-checkBox'>
                                <label htmlFor='category'><b>Categorías</b></label>
                                {
                                    categories.map((category, index) => {
                                        return <label key={index}>
                                            <input type="checkbox" name="category" value={category.category_id} onChange={ (e) => handleChange(e) }></input> {category.category}
                                        </label>
                                    })
                                }
                            </div>
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "category" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <Input
                                id="author"
                                title="Autores"
                                type="text"
                                name="author"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "author" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <div>
                                <select name="format" id="format" className='formAdmin-formats' autoComplete="off" defaultValue="Seleccione formato" onChange={ (e) => handleChange(e) }>
                                    <option disabled defaultValue>Seleccione formato</option>
                                    {
                                        formats.map((format, index) => {
                                            return <option key={index} value={format.format_id}>
                                                {format.format}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "format" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <Input
                                id="pages"
                                title="Páginas"
                                type="number"
                                name="pages"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "pages" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <Input
                                id="price"
                                title="Precio"
                                type="number"
                                name="price"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "price" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <div className='formAdmin-checkBox'>
                                <label>
                                    <input type="checkbox" name="featured" id="featured" onChange={ (e) => handleSingle(e) }></input> Producto destacado
                                </label>
                                <label>
                                    <input type="checkbox" name="onSale" id="onSale" onChange={ (e) => handleSingle(e) }></input> Producto en oferta
                                </label>
                            </div>

                            <Input
                                id="discount"
                                title="Descuento"
                                type="number"
                                name="discount"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "discount" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <Input
                                id="stock"
                                title="Stock"
                                type="number"
                                name="stock"
                                validation = { (e) => handleChange(e) }
                            />
                            {formError &&
                                formError.map((error, index) => {
                                    return error.param === "stock" ? <small className='login-form__errors' key = {index}><i className="fas fa-exclamation-circle"></i>{error.msg}</small> : '' 
                                })
                            }

                            <button className="btn btn-info">Insertar</button>
                        </form>
                    </div>
                </div>
            }{!enter &&
                <div className="text-center">
                    <h1>¡Oh!, Parece que no tienes permisos para acceder a esta página</h1>
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: 30 + 'rem' }} src={imagenFondo} alt="Not found" />
                </div>
            }
        </React.Fragment>

    )
}

export default CreationForm;
