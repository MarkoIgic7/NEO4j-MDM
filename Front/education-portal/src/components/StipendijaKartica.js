import React, {Component, useEffect} from 'react';
import './ProgramKartica.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';

function StipendijaKartica({propstipendija}) {


   

  return (
    <div className='KarticaProgram'>
        <div className="NaslovProgram">{propstipendija.naziv}</div>
        <div className="StipContent">
            <div className='StipRed'>
                <label>Iznos: {propstipendija.iznos} e</label>
                <label>Kolicina: {propstipendija.kolicina} </label>
            </div>
            
            <div className='OpisUsloviStip'>
                <div className="OpisStip">
                  {propstipendija.opis}
                </div>
                <div className="UsloviStip">
                  {propstipendija.uslovi}
                </div>
            </div>
        </div>
  </div>
  )
}

export default StipendijaKartica