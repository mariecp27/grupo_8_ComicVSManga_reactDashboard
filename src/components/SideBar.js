import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logoCompleto.png'

function SideBar(){
    return(
        <React.Fragment>
            <ul className="navbar-nav sidebar sidebar-dark accordion  sidebarColor" id="accordionSidebar">
                
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" src = { logo } alt="Logo"/>
                    </div>
                </Link>

                <hr className="sidebar-divider my-0"/>

                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                        <br/>
                        <span>Comic vs Manga</span></Link>
                </li>

                <hr className="sidebar-divider"/>

                <div className="sidebar-heading">Actions</div>

                <li className="nav-item">
                <Link className="nav-link" to="/GenresInDb">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Pages</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/LastMovieInDb">
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Charts</span></Link>
                </li>

                <li className="nav-item nav-link">
                <Link className="nav-link" to="/ContentRowMovies">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Tables</span></Link>
                </li>

                <li className="nav-item nav-link">
                <Link className="nav-link" to="/SearchMovies">
                        <i className="fas fa-fw fa-search"></i>
                        <span>Search movies</span></Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block"/>
            </ul>
        </React.Fragment>
    )
}
export default SideBar;