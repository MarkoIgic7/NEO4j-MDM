import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function PretragaStipendije({propClick}) {
    
    const navigate = useNavigate();
    const [drzave,setDrzave]=useState([])
    const [drzava,setDrzava]=useState(' ')   
    const [gradovi,setGradovi]=useState([])
    const [grad,setGrad]=useState(' ')
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState(' ')
    const [iznos,setIznos]=useState("nema")


    useEffect(()=> {

      axios.get('https://localhost:5001/Drzava/PreuzmiSveDrzave')
      .then(res=>{
        setDrzave(res.data)
      })
      .catch(err=>{
      })
  
    }, [])


    useEffect(()=> { 
      setGradovi([])
      setUniverziteti([])
      axios.get(`https://localhost:5001/Grad/PreuzmiSveGradoveDrzave/${drzava}`)
      .then(res=>{
        setGradovi(res.data)
      })
      .catch(err=>{
      })
      },[drzava])


      useEffect(()=> { 
        setUniverziteti([])
        axios.get(`https://localhost:5001/Univerzitet/VratiUniverziteteGrada/${grad}`)
      .then(res=>{
        setUniverziteti(res.data)
      })
      .catch(err=>{
      })
        },[grad])


    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }


  return (
    
    <div className="PretragaForma">
    <div className="Programi">Pretraga studentskih stipendija</div>
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
        <label>Grad:</label>
        <select name='Kategorija' className='KategorijaSelect' onChange={e => setGrad(e.target.value)}>
          <option value=' ' selected disabled hidden className='sivo'>Izaberite grad</option>
          <option value=' '>Svi</option>
          {
            gradovi.map((d) => 
            <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
          }
        </select> 
    </div>

    <div className="red">
        <label>Univerzitet:</label>
        <select name='Kategorija' className='KategorijaSelect' onChange={e => setUniverzitet(e.target.value)}>
          <option value=' ' selected disabled hidden className='sivo'>Izaberite univerzitet</option>
          <option value=' '>Svi</option>
          {
            univerziteti.map((d) => 
            <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
          }
        </select> 
    </div>

    <div className="red">
        <label>Minimalan iznos (e):</label>
        <input type="text" defaultValue="" name="Iznos"  className='InputIznos'  onChange={(e) => setIznos(e.target.value==""? "nema" : e.target.value)}></input>
    </div>


    <button onClick={()=>propClick(drzava,grad,univerzitet,iznos)} className="dugmePretrazi">Pretrazi</button>

</div>
    
  )
}

export default PretragaStipendije