import React, { useState, useEffect } from 'react';
import Category from './Category';

function CategoriesInDb() {
  const [countByCategory, setCountByCategory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3030/api/products')
      .then(response => response.json())
      .then(data => {
        setCountByCategory(data.countByCategory);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <React.Fragment>
      {/*<!-- Categories in DB -->*/}
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Categorías en Base de Datos</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {countByCategory.map((category, index) => {
                return <Category
                  categories={category.name}
                  amount = {category.amount}
                  key={index}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CategoriesInDb;
