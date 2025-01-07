import React from 'react'

function comingsoon(){
    alert("Comming Soon !");
}

function Navbar() {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">PolyMate.</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" href="https://linktr.ee/iamvishant02" target='about_blank'>Developer's Contact</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" href='https://msbte.ac.in/' target='about_blank' >Resources</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <button className="btn btn-primary me-2" onClick={comingsoon} type="submit">Docs</button>
                    <button className="btn btn-outline-success" onClick={comingsoon} type="submit">Newsletter</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
