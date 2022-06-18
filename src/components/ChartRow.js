import React from 'react';
import { Link } from 'react-router-dom';

function ChartRow(props){
    return (
                <tr>
                    <td>{ props.id }</td>
                    <td>{ props.name }</td>
                    <td>{ props.description }</td>
                    <td>
                        <ul>
                            { props.categories.map((category,i) => 
                                <li key = {`category ${i}`}>{ category }</li>
                            )}
                        </ul>
                    </td>
                    <td>
                        <Link className="" to = { `/ProductDetail/${ props.id }` }>
                            Ver detalle
                        </Link>
                    </td>
                </tr>
            )
    }
    
        

export default ChartRow;