import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajStipendijuForma(){
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState("")
    const [naziv,setNaziv]=useState("")
    const [opis,setOpis]=useState("")
    const [uslovi,setUslovi]=useState("")
    const [iznos,setIznos]=useState("")
    const [kolicina,setKolicina]=useState("")

    useEffect(()=>{
        axios.get('https://localhost:5001/Univerzitet/PreuzmiSveUniverzitete')
        .then(res=>{
            setUniverziteti(res.data)
        })
        .catch(err=>{
        })
    },[])

    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }
    
      function dodaj(){
        //fetch za dodavanje stipendije
        if(univerzitet!="" && naziv!=""&& opis!=""&& uslovi!="" && iznos!="" && kolicina!="")
        {
            axios.post(`https://localhost:5001/Stipendija/DodajStipendiju/${naziv}/${opis}/${uslovi}/${iznos}/${kolicina}/${univerzitet}`)
            .then(res=>{
                alert("Stipendija je dodata!!")
            })
            .catch(err=>{
                alert(err.response.data)
            })
        }
        else
        {
            alert("Morate popuniti sva polja!!")
        }
      }
    return (
        <div className="PretragaForma">
            <div className="Programi">Dodavanje stipendije</div>

            <div className="red">
                <label>Univerzitet:</label>
                <select name='Kategorija' className='KategorijaSelect' onChange={e=>setUniverzitet(e.target.value)}>
                <option value=' ' selected disabled hidden className='sivo'>Izaberite univerzitet</option>
                {
                    univerziteti.map((d) => 
                    <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
                }
                </select> 
            </div>

            <div className="red">
                <label>Naziv:</label>
                <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Opis:</label>
                <textarea className="inputOpis" type="text" placeholder='Unesite tekst'  onChange={(e)=>setOpis(e.target.value)}></textarea>
            </div>

            <div className="red">
                <label>Uslovi:</label>
                <textarea className="inputOpis" type="text" placeholder='Unesite tekst'  onChange={(e)=>setUslovi(e.target.value)}></textarea>
            </div>

            <div className="red">
                <label>Iznos:</label>
                <input type="text" defaultValue="" name="Troskovi"  className='InputIznos'  onChange={(e) => setIznos(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Kolicina:</label>
                <input type="text" defaultValue="" name="Troskovi"  className='InputIznos'  onChange={(e) => setKolicina(e.target.value)}></input>
            </div>

            <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

    </div>
    )
}
export default DodajStipendijuForma