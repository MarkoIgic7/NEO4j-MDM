import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajGradForma() {
    
    const [drzave,setDrzave]=useState([])
    const[drzava,setDrzava]=useState("")
    const[troskovi,setTroskovi]=useState("")
    const [naziv,setNaziv]=useState("")

    useEffect(()=> {

        axios.get('https://localhost:5001/Drzava/PreuzmiSveDrzave')
        .then(res=>{
          setDrzave(res.data)
        })
        .catch(err=>{
        })
    
      }, [])
  

    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }
    function dodaj()
    {
        //fetch za dodavanje grada
        if(drzava!="" && troskovi!="" && naziv!="")
        {
            axios.post(`https://localhost:5001/Grad/DodajGrad/${naziv}/${troskovi}/${drzava}`)
            .then(res=>{
                alert("Grad dodat!")
            })
            .catch(err=>{
                alert(err.response.data)
            })
        }
        else{
            alert("Morate popuniti sva polja!")
        }
    }

  return (
    
    <div className="PretragaForma">
            <div className="Programi">Dodavanje grada</div>

            <div className="red">
                <label>Drzava:</label>
                <select name='Kategorija' className='KategorijaSelect' onChange={e=>setDrzava(e.target.value)}>
                <option value=' ' selected disabled hidden className='sivo'>Izaberite drzavu</option>
                {
                    drzave.map((d) => 
                    <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
                }
                </select> 
            </div>

            <div className="red">
                <label>Naziv:</label>
                <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Prosecni troskovi:</label>
                <input type="text" defaultValue="" name="Troskovi"  className='InputIznos'  onChange={(e) => setTroskovi(e.target.value)}></input>
            </div>

            <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

</div>
    
  )
}

export default DodajGradForma