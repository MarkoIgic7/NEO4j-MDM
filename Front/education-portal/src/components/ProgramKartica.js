import React, {Component, useEffect} from 'react';
import './ProgramKartica.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function ProgramKartica({propprogram}) {

    const navigate = useNavigate();
    const goTo = () => {
        navigate(`/${propprogram.id}`);
   }
//dodaj univerzitet na karticu???
  return (
    <div className='KarticaProgram'>
        <div className="NaslovProgram">{propprogram.naziv}</div>
        <div className="NaslovProgram">Univerzitet {propprogram.univerzitet}</div>
        <div className="DodaciProgKartica">
        <div className="dodaciRed">
                    <label className='lblPomeri'>{propprogram.nivoStudija} studije</label>
                </div>
                <div className="dodaciRed">
                    <label>Broj mesta:</label>
                    <label>{propprogram.brojMesta}</label>
                </div>
                <div className="dodaciRed">
                    <label>Jezik:</label>
                    <label>{propprogram.jezik}</label>
                </div>
            </div>
        <div className="dugmeStrelica" onClick={goTo}>Detaljnije</div>
  </div>
  )
}

export default ProgramKartica