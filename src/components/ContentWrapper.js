import React from 'react';
import TopBar from './TopBar';
import MainContent from './MainContent';
import Footer from './Footer';

function ContentWrapper(){
    return (
        <React.Fragment>
            <div id="content-wrapper" className="d-flex flex-column">
                {/*<!-- Main Content -->*/}
                <div id="content">
                    <TopBar />
                    <MainContent />
                    <Footer />
                </div>
            </div>    
        </React.Fragment>
    )
}
export default ContentWrapper;