import React, {Component, useEffect} from 'react';
import './ProgramKartica.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function DomKartica({propdom}) {

  return (
    <div className='KarticaDom'>
        <div className="NazivDom">{propdom.naziv}</div>
        <div className="DodaciDomKartica">
            <div className="dodaciRed">
                <label>Mesecna cena:</label>
                <label>{propdom.cena} e</label>
            </div>
            <div className="dodaciRed">
                <label>Ocena:</label>
                <label>{propdom.ocena}</label>
            </div>
            <div className="dodaciRed">
                <label>Lokacija:</label>
                <label>{propdom.lokacija}</label>
            </div>
        </div>
  </div>
  )
}

export default DomKartica