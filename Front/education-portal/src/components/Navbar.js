import React, {Component, useEffect} from 'react';
import './Navbar.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import { Login } from './Login';
import { useUserContext } from '../context/UserContext';

function Navbar() {

    const navigate = useNavigate();
    const {logOut}=useUserContext();
    const {email, jePosetilac}=useUserContext();

  return (
    <nav className='NavbarStyle'>
          
            <div className='Naslov'>EducationPortal</div>
            {jePosetilac? ( <><label className="labelaUsername1" onClick={() => {navigate("/Pocetna");}}>Pocetna</label></> ) : <></>}
            { !jePosetilac ? (  
                <>
                <label className="labelaUsername">{email}</label>
                <button className="odjaviSe" onClick={() => {
                    logOut();
                    navigate("/Pocetna");
                    window.location.reload(false);
                  }}
                >
                  Odjavi se
                </button>
                </>
              ) : (
                <div className='dugmiciPrijava'>
                  <Login>Prijava admin</Login>
                </div>
              )}
        </nav>
  )
}

export default Navbar