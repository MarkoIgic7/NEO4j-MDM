import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajUniverzitetForma() {
    
    const [drzave,setDrzave]=useState([])
    const[gradovi,setGradovi]=useState([])
    const[drzava,setDrzava]=useState("")
    const[grad,setGrad]=useState("")
    const[skolarina,setSkolarina]=useState("")
    const [naziv,setNaziv]=useState("")
    const [opis,setOpis]=useState("")
    const [kontakt,setKontakt]=useState("")
    const [adresa,setAdresa]=useState("")

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
        //fetch za dodavanje univerziteta
        if(grad!="" && naziv!="" && kontakt!="" && adresa!=""  && skolarina!=""  && opis!="")
        {
            axios.post(`https://localhost:5001/Univerzitet/DodajUniverzitet/${naziv}/${opis}/${kontakt}/${adresa}/${skolarina}/${grad}`)
            .then(res=>{
                alert("Univerzitet dodat!")
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
            <div className="Programi">Dodavanje univerziteta</div>

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
                <label>Naziv univerziteta:</label>
                <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Kontakt:</label>
                <input type="text" defaultValue="" name="Kontakt"  className='InputIznos'  onChange={(e) => setKontakt(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Adresa:</label>
                <input type="text" defaultValue="" name="Adresa"  className='InputIznos'  onChange={(e) => setAdresa(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Skolarina:</label>
                <input type="text" defaultValue="" name="Skolarina"  className='InputIznos'  onChange={(e) => setSkolarina(e.target.value)}></input>
            </div>
           
            <div className="red">
                <label>Opis:</label>
                <textarea className="inputOpis" type="text" placeholder='Unesite tekst'  onChange={(e)=>setOpis(e.target.value)}></textarea>
            </div>

            <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

</div>
    
  )
}

export default DodajUniverzitetForma