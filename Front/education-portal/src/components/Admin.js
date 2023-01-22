import React, {Component, useEffect} from 'react';
import './ProgramKartica.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import './Admin.css'
import DodajDrzavuForma from './DodajDrzavuForma';
import DodajGradForma from './DodajGradForma';
import DodajUniverzitetForma from './DodajUniverzitetForma';
import DodajProgramForma from './DodajProgramForma';
import DodajDomForma from './DodajDomForma';
import DodajOblastForma from './DodajOblastForma';
import DodajSertifikatForma from './DodajSertifikatForma';
import DodajStipendijuForma from './DodajStipendijuForma';

function Admin() {
    const [forma1,setForma1]=useState(false)
    const [forma2,setForma2]=useState(false)
    const [forma3,setForma3]=useState(false)
    const [forma4,setForma4]=useState(false)
    const [forma5,setForma5]=useState(false)
    const [forma6,setForma6]=useState(false)
    const [forma7,setForma7]=useState(false)
    const [forma8,setForma8]=useState(false)

    function otvoriFormu1()
    {
      setForma1(true)
      setForma2(false)
      setForma3(false)
      setForma4(false)
      setForma5(false)
      setForma6(false)
      setForma7(false)
      setForma8(false)
    }

    function otvoriFormu2()
    {
        setForma1(false)
        setForma2(true)
        setForma3(false)
        setForma4(false)
        setForma5(false)
        setForma6(false)
        setForma7(false)
        setForma8(false)
    }
    function otvoriFormu3()
    {
        setForma1(false)
      setForma2(false)
      setForma3(true)
      setForma4(false)
      setForma5(false)
      setForma6(false)
      setForma7(false)
      setForma8(false)
    }
    function otvoriFormu4()
    {
        setForma1(false)
      setForma2(false)
      setForma3(false)
      setForma4(true)
      setForma5(false)
      setForma6(false)
      setForma7(false)
      setForma8(false)
      
    }

    function otvoriFormu5()
    {
        setForma1(false)
      setForma2(false)
      setForma3(false)
      setForma4(false)
      setForma5(true)
      setForma6(false)
      setForma7(false)
      setForma8(false)

    }
    function otvoriFormu6()
    {
        setForma1(false)
      setForma2(false)
      setForma3(false)
      setForma4(false)
      setForma5(false)
      setForma6(true)
      setForma7(false)
      setForma8(false)

    }
    function otvoriFormu7()
    {
        setForma1(false)
      setForma2(false)
      setForma3(false)
      setForma4(false)
      setForma5(false)
      setForma6(false)
      setForma7(true)
      setForma8(false)

    }
    function otvoriFormu8()
    {
        setForma1(false)
      setForma2(false)
      setForma3(false)
      setForma4(false)
      setForma5(false)
      setForma6(false)
      setForma7(false)
      setForma8(true)

    }

   return (
    <div className="Pocetna">
        <div className="slika"></div>
        <div className="KarticePretrage">
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu1()}}>Dodaj drzavu</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu2()}}>Dodaj grad</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu3()}}>Dodaj univerzitet</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu4()}}>Dodaj oblast</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu5()}}>Dodaj sertifikat</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu6()}}>Dodaj stipendiju</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu7()}}>Dodaj program</div>
            <div className='KarticaPretraga1' onClick={()=>{otvoriFormu8()}}>Dodaj dom</div>
        </div>
        {forma1 ? (<>
            <DodajDrzavuForma></DodajDrzavuForma>
        </>)  :  
        (<></>)}

        {forma2 ? (<>
            <DodajGradForma></DodajGradForma>
        </>)  :  
        (<></>)}

        {forma3 ? (<>
            <DodajUniverzitetForma></DodajUniverzitetForma>
        </>)  :  
        (<></>)}

        {forma4 ? (<>
            <DodajOblastForma></DodajOblastForma>
        </>)  :  
        (<></>)}
        
        {forma5 ? (<>
            <DodajSertifikatForma></DodajSertifikatForma>
        </>)  :  
        (<></>)}

        {forma6 ? (<>
            <DodajStipendijuForma></DodajStipendijuForma>
        </>)  :  
        (<></>)}

        {forma7 ? (<>
            <DodajProgramForma></DodajProgramForma>
        </>)  :  
        (<></>)}

        {forma8 ? (<>
            <DodajDomForma></DodajDomForma>
        </>)  :  
        (<></>)}
    </div>
  )
}

export default Admin