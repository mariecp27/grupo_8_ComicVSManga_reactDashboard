import React, { useState, useEffect } from 'react';
import ChartRow from './ChartRow';

function Chart() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [pagesAmount, setPagesAmount] = useState(0);
    const [productsAmount, setProductsAmount] = useState(0);

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
        setPagesAmount(Math.ceil(productsAmount/10));
    }, [productsAmount]);

    const previousPage = () => {
        if (page !== 0) {
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if(page !== pagesAmount - 1){
            setPage(page + 1);
        }
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">Listado de Productos</h5>
            </div>
            <div className="card-body">
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
                            {products.length === 0 &&
                                <ChartRow
                                    id='--'
                                    name='Cargando'
                                    description='Cargando'
                                    categories={['Cargando']}
                                />
                            }
                            {
                                products.map((row, index) => {
                                    return <ChartRow
                                        { ...row }
                                        key = { index }
                                    />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='pagesButtons'>
                <button disabled = { page === 0 } onClick= { previousPage }>Anterior</button>
                <button disabled = { page === pagesAmount - 1 } onClick = { nextPage }>Siguiente</button>
            </div>
        </div>

    )
}

export default Chart;