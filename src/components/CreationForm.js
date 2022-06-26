import React, { useState, useEffect } from 'react';
import GeneralForm from './GeneralForm';
import imagenFondo from '../assets/images/404.png';

function CreationForm() {
    const [enter, setEnter] = useState(false);

	useEffect( () => {
		const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

		if (token) {
			fetch('http://localhost:3030/api/users/login', {
				headers: {
					'authorization': token
				}
			})
				.then(response => response.json())
				.then(data => {
					if(!data.error){
						setEnter(true);
					}
				})
				.catch(error => console.error(error));
		}
    }, []);

    return (
		<React.Fragment>
            {enter &&
                    <GeneralForm
                    title = "Creación de productos"
                    productName = "Nombre del producto"
                    productDescription = "Descripción"
                    productImage = "Subir imagen"
                    productCategories = "Categorías"
                    productAuthor = "Autores"
                />
            }{!enter &&
                <div className="text-center">
                    <h1>¡Oh!, Parece que no tienes permisos para acceder a esta página</h1>
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 30 +'rem'}} src={imagenFondo} alt="Not found"/>
                </div>
            }
        </React.Fragment>

    )
}

export default CreationForm;
