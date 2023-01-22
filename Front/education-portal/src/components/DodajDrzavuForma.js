import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajDrzavuForma() {

    const [naziv,setNaziv]=useState("")

    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }
      
  function dodaj()
  {
    //fetch za dodavanje drzave
    if(naziv!="")
    {
        axios.post(`https://localhost:5001/Drzava/DodajDrzavu/${naziv}`)
      .then(res=>{
        alert("Drzava dodata!")
      })
      .catch(err=>{
        alert(err.response.data)
      })
    }
    else{
        alert("Dodajte naziv drzave!")
    }
    
  }

  return (
    
    <div className="PretragaForma">
    <div className="Programi">Dodavanje drzave</div>

    <div className="red">
        <label>Naziv:</label>
        <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
    </div>

    <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

</div>
    
  )
}

export default DodajDrzavuForma