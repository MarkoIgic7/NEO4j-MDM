import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import PretragaProgrami from './PretragaProgrami';
import PretragaStipendije from './PretragaStipendije';
import ProgramKartica from './ProgramKartica';
import StipendijaKartica from './StipendijaKartica';
import PretragaDomovi from './PretragaDomovi';
import PretragaPerfectMatch from './PretragaPerfectMatch';
import PerfectMatchKartica from './PerfectMatchKartica';
import DomKartica from './DomKartica';
import axios from 'axios';

function Pocetna() {
 
    const [forma1,setForma1]=useState(false)
    const [forma2,setForma2]=useState(false)
    const [forma3,setForma3]=useState(false)
    const [forma4,setForma4]=useState(false)
    const [forma5,setForma5]=useState(false)

    const [programi,setProgrami]=useState([])
    const [stipendije,setStipendije]=useState([])
    const [domovi,setDomovi]=useState([])
    const [perfectProgrami,setPerfectProgrami]=useState([])

    const [drzave,setDrzave]=useState([])
    const [drzava,setDrzava]=useState("")   
    const [gradovi,setGradovi]=useState([])
    const [grad,setGrad]=useState("")
    const [univerzitet,setUniverzitet]=useState("")
    const [program,setProgram]=useState("")
    const [sertifikat,setSertifikat]=useState("")
    const [jezik,setJezik]=useState("")
    const [troskovi,setTroskovi]=useState("")
    const [skolarina,setSkolarina]=useState("")

    const [obl,setObl]=useState("")
    const [nivoStudija,setNivoStudija]=useState("")
    const [iznos,setIznos]=useState("nema")
    const [ocena,setOcena]=useState("nema")
    const [pom1,setPom1]=useState(true)
    const [pom2,setPom2]=useState(true)
    const [pom3,setPom3]=useState(true)
    const [pom4,setPom4]=useState(true)


    const[forma1Clicked,setForma1Clicked]=useState(false)
    const[forma2Clicked,setForma2Clicked]=useState(false)
    const[forma3Clicked,setForma3Clicked]=useState(false)
    const[forma4Clicked,setForma4Clicked]=useState(false)
 
    
    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }

      useEffect(()=> { 
        
        axios.get(`https://localhost:5001/Program/VratiSvePrograme/${drzava}/${grad}/${univerzitet}/${nivoStudija}/${obl}`)
      .then(res=>{
        setProgrami(res.data)
      })
      .catch(err=>{
        if(err.response.status==400)
        {
          setProgrami([])
          alert(err.response.data);
        }
      })
        },[pom1])

      useEffect(()=> { 
        if(iznos=="")
        {
          setIznos("nema")

        }
       
        axios.get(`https://localhost:5001/Stipendija/VratiSveStipendije/${drzava}/${grad}/${univerzitet}/${iznos}`)
      .then(res=>{
        setStipendije(res.data)
      })
      .catch(err=>{
        if(err.response.status==400)
        {
          setStipendije([])
          alert(err.response.data);
        }
      })
        },[pom2])

        useEffect(()=> { 
          
          axios.get(`https://localhost:5001/StudentskiDom/PreuzmiSveDomove/${drzava}/${grad}/${iznos}/${ocena}`)
        .then(res=>{
          setDomovi(res.data)
        })
        .catch(err=>{
          if(err.response.status==400)
          {
            setDomovi([])
            alert(err.response.data);
          }
        })
          },[pom3])

        useEffect(()=> { 

          //perfect match fetch
        if(univerzitet == "nema" || program== "nema" || jezik== "nema" || sertifikat== "nema" || troskovi == "nema" || skolarina== "nema")
        {
          alert("Morate popuniti sva polja!")
        }
        else{
          axios.get(`https://localhost:5001/Program/PefectMatch/${univerzitet}/${program}/${jezik}/${sertifikat}/${troskovi}/${skolarina}`)
          .then(res=>{
            setPerfectProgrami(res.data)
          })
          .catch(err=>{
            if(err.response.status==400)
            {
              setStipendije([])
              alert(err.response.data);
            }
          })
        }
        
          },[pom4])

    function crtajProgrameKartice(drzava,grad,univerzitet,nivoStudija,cekiranaPolja){
      let oblasti=""
      cekiranaPolja.map((c)=>
      {
        oblasti=oblasti + c.id + '#'
      })
      
      if(cekiranaPolja.length===0)
      {
        oblasti="nema"
      }
      console.log(oblasti)

      setDrzava(drzava)
      setGrad(grad)
      setUniverzitet(univerzitet)
      setObl(oblasti)
      setNivoStudija(nivoStudija)
      setPom1(!pom1)

      /*axios.get(`https://localhost:5001/Program/VratiSvePrograme/${drzava}/${grad}/${univerzitet}/${nivoStudija}/${oblasti}`)
      .then(res=>{
        setProgrami(res.data)
        console.log("uslo")
      })
      .catch(err=>{
      })*/


      /*try{
        const res= await axios.get(`https://localhost:5001/Program/VratiSvePrograme/${drzava}/${grad}/${univerzitet}/${nivoStudija}/${oblasti}`);
        const data = await res.data;
          setProgrami(data);
          
        }
      catch (error) {
        console.log("error", error);
      }*/


     /* axios.get(`https://localhost:5001/Program/VratiSvePrograme/${drzava}/${grad}/${univerzitet}/${nivoStudija}/${oblasti}`)
      .then(res=>{
        setProgrami(res.data)
      })
      .catch(err=>{
      })*/
         setForma1Clicked(true)
         console.log("Iz pocetne")
         console.log(cekiranaPolja)
    }
    
    function crtajStipendijeKartice(drzava,grad,univerzitet, iznos){
      setDrzava(drzava)
      setGrad(grad)
      setUniverzitet(univerzitet)
      setIznos(iznos)
      setPom2(!pom2)
      setForma2Clicked(true)
      console.log(iznos)
      console.log(drzava)
      console.log(grad)
    }

    function crtajDomoveKartice(drzava, grad, iznos, ocena){
      setDrzava(drzava)
      setGrad(grad)
      setIznos(iznos)
      setOcena(ocena)
      setPom3(!pom3)
      setForma3Clicked(true)
    }

    function crtajPerfectMatch(univerzitet, program, jezik, sertifikat, troskovi, skolarina){
      setUniverzitet(univerzitet)
      setProgram(program)
      setSertifikat(sertifikat)
      setJezik(jezik)
      setTroskovi(troskovi)
      setSkolarina(skolarina)
      setPom4(!pom4)
      setForma4Clicked(true)
    }


    function otvoriFormu1()
    {
      setForma1(true)
      setForma2(false)
      setForma2Clicked(false)
      setForma3(false)
      setForma3Clicked(false)
      setForma4(false)
      setForma4Clicked(false)
    }

    function otvoriFormu2()
    {
      setForma1(false)
      setForma1Clicked(false)
      setForma2(true)
      setForma3(false)
      setForma3Clicked(false)
      setForma4(false)
      setForma4Clicked(false)
    }
    function otvoriFormu3()
    {
      setForma1(false)
      setForma1Clicked(false)
      setForma2(false)
      setForma2Clicked(false)
      setForma3(true)
      setForma4(false)
      setForma4Clicked(false)
    }
    function otvoriFormu4()
    {
      setForma1(false)
      setForma1Clicked(false)
      setForma2(false)
      setForma2Clicked(false)
      setForma3(false)
      setForma3Clicked(false)
      setForma4(true)
      
    }

    
  return (
    <div className="Pocetna">
        <div className="slika"></div>
        <div className="KarticePretrage">
            <div className='KarticaPretraga' onClick={()=>{otvoriFormu1()}}>Pretraga studentskih programa</div>
            <div className='KarticaPretraga' onClick={()=>{otvoriFormu2()}}>Pretraga stipendija</div>
            <div className='KarticaPretraga' onClick={()=>{otvoriFormu3()}}>Pretraga studentskih domova</div>
            <div className='KarticaPretraga' onClick={()=>{otvoriFormu4()}}>Perfect master match</div>
        </div>
        {forma1 ? (<>
            <PretragaProgrami propClick={crtajProgrameKartice}></PretragaProgrami>
        </>)  :  
        (<></>)}

        {
            forma1Clicked ? (<><div>
              <ul>
            {
                programi.map((el) => 
                <div className='VestDiv'>
                    <ProgramKartica key={el.id} propprogram={el}></ProgramKartica>
                </div>
    
                )
            }
        </ul>
              </div></>) : (<></>)
        }


        {forma2 ? (<>
            <PretragaStipendije propClick={crtajStipendijeKartice}></PretragaStipendije>
        </>)  :  
        (<></>)}

        {
            forma2Clicked ? (<><div>
              <ul>
            {
                stipendije.map((el) => 
                <div className='VestDiv'>
                    <StipendijaKartica key={el.id} propstipendija={el}></StipendijaKartica>
                </div>
    
                )
            }
        </ul>
              </div></>) : (<></>)
        }


        {forma3 ? (<>
            <PretragaDomovi propClick={crtajDomoveKartice}></PretragaDomovi>
        </>)  :  
        (<></>)}

        {
            forma3Clicked ? (<><div>
              <ul>
            {
                domovi.map((el) => 
                <div className='VestDiv'>
                    <DomKartica key={el.id} propdom={el}></DomKartica>
                </div>
    
                )
            }
        </ul>
              </div></>) : (<></>)
        }


        {forma4 ? (<>
            <PretragaPerfectMatch propClick={crtajPerfectMatch}></PretragaPerfectMatch>
        </>)  :  
        (<></>)}

        {
            forma4Clicked ? (<><div>
              <ul>
            {
                perfectProgrami.map((el) => 
                <div className='VestDiv'>
                    <PerfectMatchKartica key={el.id} propprogram={el}></PerfectMatchKartica>
                </div>
    
                )
            }
        </ul>
              </div></>) : (<></>)
        }


        
    </div>
  )
}

export default Pocetna