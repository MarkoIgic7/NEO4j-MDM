import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajSertifikatForma(){
    const [naziv,setNaziv]=useState("")
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState("")

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

    function dodaj()
    {
        //fetch za dodavanje sertifikata
        if(naziv!="" && univerzitet!="")
        {
            axios.post(`https://localhost:5001/Sertifikat/DodajSertifikat/${naziv}/${univerzitet}`)
            .then(res=>{
                alert("Sertifikat je dodat!")
            })
            .catch(err=>{
                alert(err.response.data)
            })
        }
        else{
            alert("Morate popuniti sva polja!!")
        }
    }

    return(
        <div className="PretragaForma">
        <div className="Programi">Dodavanje sertifikata</div>

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

        <button onClick={()=>dodaj()} className="dugmePretrazi">Dodaj</button>

</div>
    )
}
export default DodajSertifikatForma