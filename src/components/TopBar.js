import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../assets/css/formStyles.css'

import logo from '../assets/images/logoCompleto.png'

function TopBar() {
	const [modalStatus, setModalStatus] = useState(false);
	const [form, setForm] = useState();
	const [formError, setformError] = useState('');
	const [enter, setEnter] = useState(false);
	const [user, setUser] = useState();

	//Función para manejar los eventos onChange de los inputs.
	const handleChange = function(e){
		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	//Función para obtener el token de autenticación.
	const login = (e, callback) => {
		e.preventDefault()
		fetch('http://localhost:3030/api/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		})
			.then(response => response.json())
			.then(data => {
				if(!data.error){
					document.cookie = `token=${data.token}; max-age=${data.expiresIn}, path=/; same-site=strict`;
					callback();
				}else{
					setformError(data.error);
				}
			})
			.catch(error => console.error(error));
	}

	//Función para validar el token de autenticación.
	const verifyUser = () => {
		const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
		if (token) {
			fetch('http://localhost:3030/api/users/login', {
				headers: {
					'authorization': token
				}
			})
				.then(response => response.json())
				.then(data => {
					if(!data.error){
						setModalStatus(false);
						setEnter(true);
						setUser(data);
						window.location.reload();
					}else{
						setformError(data.error);
					}
				})
				.catch(error => console.error(error));
		}
	}

	useEffect( () => {
		let token = '';
		
        if(document.cookie){
			token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]
		}

		if (token !== '') {
			fetch('http://localhost:3030/api/users/login', {
				headers: {
					'authorization': token
				}
			})
				.then(response => response.json())
				.then(data => {
					if(!data.error){
						setUser(data);
						setEnter(true);
					}
				})
				.catch(error => console.error(error));
		}
    }, []);

	//Función para el cierre de sesión.
	const logout = function(){
		document.cookie = 'token=; max-age=1000, path=/; same-site=strict';
		setEnter(false);
		window.location.reload();
	}

	//Si el formulario se cierra, se borran los mensajes de error y datos del formulario.
	useEffect( () => {
		if(!modalStatus){
			setformError('');
		}
    }, [modalStatus]);

	return (
		<React.Fragment>
			<Modal
				status={modalStatus}
				changeStatus={setModalStatus}
				title="Iniciar sesión como administrador"
			>
				<form className='login-form' onSubmit = { (e) => { login(e, verifyUser) } }>
					<div>
						<label htmlFor='email'>Correo electrónico</label>
						<input type="email" name="email" id="email" autoComplete="off" onChange={ (e) => handleChange(e) }></input>
					</div>
					<div>
						<label htmlFor='password'>Contraseña</label>
						<input type="password" name="password" id="password" autoComplete="off" onChange={(e) => handleChange(e)}></input>
					</div>
					<small className='login-form__errors'> { formError ? <i className="fas fa-exclamation-circle"></i> : '' }{ formError }</small>
					<button className="btn btn-info">
						<i className="fas fa-sign-in-alt"></i> Iniciar sesión
					</button>
					<img src={logo} alt="Logo" />
				</form>
			</Modal>

			<nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
				{!enter && 
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown no-arrow">
							<button className="btn btn-info" onClick={ () => setModalStatus(!modalStatus) }>
								<i className="fas fa-sign-in-alt"></i> Iniciar sesión
							</button>
						</li>
					</ul>
				}{(enter && user) &&
					<ul className="navbar-nav ml-auto">
						<li className="nav-item dropdown no-arrow user__name">¡Bienvenido, <b>{ user.user }</b>!</li>
						<li className="nav-item dropdown no-arrow">
							<button className="btn btn-danger" onClick = { logout }>Cerrar sesión</button>
						</li>
					</ul>
				} 
			</nav>
		</React.Fragment>
	)
}
export default TopBar;