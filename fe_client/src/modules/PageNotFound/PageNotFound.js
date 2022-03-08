import React from "react";
import '../../styles/PNF.scss';


const PageNotFound = () => {
    return (
        <div className="container bgDiv">
            <div id='message-content' className="card-panel teal lighten-5">
                <div id='header-div-404'>
                    404<i className="material-icons">dangerous</i>Page not found
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;