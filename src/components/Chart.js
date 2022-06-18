import React, { useState, useEffect, useRef } from 'react';
import ChartRow from './ChartRow';

function Chart() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pagesAmount, setPagesAmount] = useState(0);
    const [productsAmount, setProductsAmount] = useState(0);
	const [keyword, setKeyword] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3030/api/products?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setProductsAmount(data.count);
            })
            .catch(error => console.error(error));
    }, [page]);

    useEffect(() => {
        setPagesAmount(Math.ceil(productsAmount / 10));
    }, [productsAmount]);

    const previousPage = () => {
        if (page !== 0) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if (page !== pagesAmount - 1) {
            setPage(page + 1);
        }
    }

	const title = useRef();

    const searchProduct = (e) => {
		e.preventDefault();
		setKeyword(title.current.value);
	}

    useEffect( () => {
		if(keyword !== ''){
			fetch(`http://localhost:3030/api/products?page=${page}&search=${keyword}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setProductsAmount(data.count);
            })
            .catch(error => console.error(error));
		}else{
            fetch(`http://localhost:3030/api/products?page=${page}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setProductsAmount(data.count);
            })
            .catch(error => console.error(error));
        }
    }, [keyword]);

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Listado de Productos</h5>
            </div>
            <div className="card-body">
                <form method="GET" className='productForm' onSubmit = { searchProduct }>
                    <label htmlFor="">Buscar por título:</label>
                    <input type="text" className="form-control" placeholder='Ingresa el nombre del producto' ref = { title }/>
                    <button className="btn btn-info">
                        <i className="fas fa-fw fa-search"></i> Buscar
                    </button>
                </form>
                <div className="table-responsive">
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Categorías</th>
                                <th>Detalle</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Título</th>
                                <th>Descripción</th>
                                <th>Categorías</th>
                                <th>Detalle</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            {
                                products.map((row, index) => {
                                    return <ChartRow
                                        {...row}
                                        key={index}
                                    />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='pagesButtons'>
                <button disabled={page === 0} onClick={previousPage}>Anterior</button>
                <button disabled={page === pagesAmount - 1} onClick={nextPage}>Siguiente</button>
            </div>
        </div>

    )
}

export default Chart;