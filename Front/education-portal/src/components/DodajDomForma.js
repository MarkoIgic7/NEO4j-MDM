import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajDomForma() {
    
    const [drzave,setDrzave]=useState([])
    const[gradovi,setGradovi]=useState([])
    const[drzava,setDrzava]=useState("")
    const[grad,setGrad]=useState("")
    const[cena,setCena]=useState("")
    const [naziv,setNaziv]=useState("")
    const [ocena,setOcena]=useState("")
    const [lokacija,setLokacija]=useState("")

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
        axios.get(`https://localhost:5001/Grad/PreuzmiSveGradoveDrzave/${drzava}`)
        .then(res=>{
          setGradovi(res.data)
        })
        .catch(err=>{
        })
        },[drzava])
  

    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }
    function dodaj()
    {
        //fetch za dodavanje doma
        if(grad!="" && naziv!="" && cena!="" && ocena!=""  && lokacija!="")
        {
            axios.post(`https://localhost:5001/StudentskiDom/DodajDom/${naziv}/${cena}/${ocena}/${lokacija}/${grad}`)
            .then(res=>{
                alert("Studentski dom dodat!")
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
            <div className="Programi">Dodavanje studentskog doma</div>

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
                <select name='Kategorija' className='KategorijaSelect' onChange={e=>setGrad(e.target.value)}>
                <option value=' ' selected disabled hidden className='sivo'>Izaberite grad</option>
                {
                    gradovi.map((d) => 
                    <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
                }
                </select> 
            </div>

            <div className="red">
                <label>Naziv doma:</label>
                <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Cena(mesecno):</label>
                <input type="text" defaultValue="" name="Kontakt"  className='InputIznos'  onChange={(e) => setCena(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Ocena:</label>
                <input type="text" defaultValue="" name="Adresa"  className='InputIznos'  onChange={(e) => setOcena(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Lokacija:</label>
                <input type="text" defaultValue="" name="Skolarina"  className='InputIznos'  onChange={(e) => setLokacija(e.target.value)}></input>
            </div>

            <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

</div>
    
  )
}

export default DodajDomForma