import React, {Component, useEffect} from 'react';
import './Program.css';
import {Link, Navigate, useParams} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function Program(){
    
    let {id} = useParams();
    const [program,setProgram]=useState([]);
    const [univerzitet,setUniverzitet]=useState([]);

    const fetchData=()=>
    {
        axios.get(`https://localhost:5001/Program/VratiProgram/${id}`)
        .then(res=>{
            setProgram(res.data)
    })
        .catch(err=>{
        })
    
        
    };

    useEffect(()=> {

      const ucitaj=async()=>{
        try{
        const res= await axios.get(`https://localhost:5001/Program/VratiProgram/${id}`);
        const data = await res.data;
            setProgram(data);
            
      }
        catch (error) {
        console.log("error", error);
        }
        }
  
     ucitaj();
    //fetchData();
   
      }, [])

      useEffect(()=> { 
        const ucitaj1=async()=>{
            try{
            const result= await axios.get(`https://localhost:5001/Univerzitet/VratiUniverzitet/${id}`);  
            const data1 = await result.data;
            setUniverzitet(data1);
            console.log(univerzitet)
            console.log(program)
          }
          catch(error){
          }
        }
          ucitaj1();
        },[program])
  

  return (
    <>
    <div className="ProgramStrana">
       <div className="ProgramHeader">
            <div className="NaziviTrajanje">
                <div className="NazivProg">{program.naziv}</div>
                <div className="TrajanjeProg">Trajanje: {program.trajanje} god.</div>
            </div>
            <div className="UniverzitetiBrMesta">
                <div className="UniverzitetProg">Univerzitet: {univerzitet.naziv}</div>
                <div className="BrMestaProg">Broj mesta: {program.brojMesta}</div>
            </div>
       </div>
       <div className="ProgUni">
        <div className="OpisProgDiv">
            <div className="ProgramNaslov">PROGRAM</div>
            <div className="OpisProg">
                    {program.opis}
                </div>
            <div className="DodaciProg">
                <div className="dodaciRed">
                    <label>Nivo studija:</label>
                    <label>{program.nivoStudija}</label>
                </div>
                <div className="dodaciRed">
                    <label>Jezik:</label>
                    <label>{program.jezik}</label>
                </div>
            </div>
        </div>
        <div className="OpisUniverzitetaDiv">
            <div className="ProgramNaslov">UNIVERZITET</div>
            <div className="OpisUniverziteta">{univerzitet.opis}</div>
            <div className="DodaciProg">
                <div className="dodaciRed1">
                    <label>Kontakt:</label>
                    <label>{univerzitet.kontakt}</label>
                </div>
                <div className="dodaciRed1">
                    <label>Adresa:</label>
                    <label>{univerzitet.adresa}</label>
                </div>
                <div className="dodaciRed1">
                    <label>Skolarina:</label>
                    <label>{univerzitet.skolarina}e</label>
                </div>
            </div>

        </div>

       </div>
    </div>
    </>
  );
};

export default Program