import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function PretragaPerfectMatch({propClick}) {
    
    const navigate = useNavigate();
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState("nema")   
    const [programi,setProgrami]=useState([])
    const [program,setProgram]=useState("nema")
    const [jezici,setJezici]=useState([])
    const [jezik,setJezik]=useState("nema")
    const [sertifikati,setSertifikati]=useState([])
    const [sertifikat,setSertifikat]=useState("nema")
    const [troskovi,setTroskovi]=useState("nema")
    const [skolarina,setSkolarina]=useState("nema")

    useEffect(()=> {

      axios.get('https://localhost:5001/Univerzitet/PreuzmiSveUniverzitete')
      .then(res=>{
        setUniverziteti(res.data)
      })
      .catch(err=>{
      })

      axios.get('https://localhost:5001/Program/VratiSveJezike')
      .then(res=>{
        setJezici(res.data)
      })
      .catch(err=>{
      })

      axios.get('https://localhost:5001/Sertifikat/VratiSveSertifikate')
      .then(res=>{
        setSertifikati(res.data)
      })
      .catch(err=>{
      })

    }, [])

    useEffect(()=> {

      setProgrami([])

      axios.get(`https://localhost:5001/Program/VratiProgrameUniverziteta/${univerzitet}`)
      .then(res=>{
        setProgrami(res.data)
      })
      .catch(err=>{
      })
      console.log(jezik)

    }, [univerzitet])


    function veliko(string){
      return string.charAt(0).toUpperCase()+string.slice(1);
    }


  return (
    
    <div className="PretragaForma1">
    <div className="Programi">Perfect master match</div>
    <div className="red1">
        <label className='lblPerfectMatch'>Vas batchelor univerzitet:</label>
        <select name='Kategorija' className='KategorijaSelect' onChange={e=>setUniverzitet(e.target.value)}>
          <option value="nema" selected disabled hidden className='sivo'>Izaberite univerzitet</option>
          {
            univerziteti.map((d) => 
            <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
          }
        </select> 
    </div>

    <div className="red1">
        <label className='lblPerfectMatch'>Vas batchelor program:</label>
        <select name='Kategorija' className='KategorijaSelect' onChange={e => setProgram(e.target.value)}>
          <option value="nema" selected disabled hidden className='sivo'>Izaberite program</option>
          {
            programi.map((d) => 
            <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
          }
        </select> 
    </div>

    <div className="red1">
        <label className='lblPerfectMatch'>Na kom jeziku zelite da studirate?</label>
        <select name='Kategorija' className='KategorijaSelect' onChange={e => setJezik(e.target.value)}>
          <option value="nema" selected disabled hidden className='sivo'>Izaberite jezik</option>
          {
            jezici.map((d) => 
            <option key={d} value={d}>{veliko(d)}</option>)   
          }
        </select> 
    </div>

    <div className="red1">
        <label className='lblPerfectMatch'>Da li posedujete neki od sertifikata jezika?  <span style={{color:'#c45b2b'}}>*Ukoliko je odabrani jezik Vas maternji jezik, odaberite opciju "Maternji".</span></label>
        <select name='Kategorija' className='KategorijaSelect1' onChange={e => setSertifikat(e.target.value)}>
          <option value="nema" selected disabled hidden className='sivo'>Odaberite sertifikat</option>
          <option value="Nemam">Ne posedujem sertifikat</option>
          <option value="Maternji">Maternji</option>
          {
            sertifikati.map((d) => 
            <option key={d.id} value={d.id}>{veliko(d.naziv)}</option>)   
          }
        </select> 
    </div>

    <div className="red1">
        <label className='lblPerfectMatch'>Koliko ste spremni da izdvojite na troskove zivota (mesecno)?</label>
        <input type="text" defaultValue="" name="Iznos"  className='InputIznos1'  onChange={(e) => setTroskovi(e.target.value==""? "nema" : e.target.value)}></input>
    </div>

    <div className="red1">
        <label className='lblPerfectMatch'>Koliko ste spremni da izdvojite na troskove skolarine (godisnje)?</label>
        <input type="text" defaultValue="" name="Iznos"  className='InputIznos1'  onChange={(e) => setSkolarina(e.target.value==""? "nema" : e.target.value)}></input>
    </div>


    <button onClick={()=>propClick(univerzitet, program, jezik, sertifikat, troskovi, skolarina)} className="dugmePretrazi">Pretrazi</button>

</div>
    
  )
}

export default PretragaPerfectMatch