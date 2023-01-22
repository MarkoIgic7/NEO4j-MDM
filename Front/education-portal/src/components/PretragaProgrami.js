import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function PretragaProgrami({propClick}) {

    function uncheckAll(options) {
    return options.map((option) => ({
        ...option,
        checked: false
    }));
    }
    const [checkedList, setCheckedList] = useState([]);  //ili ga ovde postavi na [] pa onda u useEffectu nakon sto fecujes Oblasti postavi na uncheckAll(oblasti)
    const [cekiranaPolja,setCekiranaPolja]=useState([])
    const [nivoStudija,setNivoStudija]=useState(' ')
    const navigate = useNavigate();
    const[formaOblasti,setFormaOblasti]=useState(false)
    const [drzave,setDrzave]=useState([])
    const [drzava,setDrzava]=useState(' ')   
    const [gradovi,setGradovi]=useState([])
    const [grad,setGrad]=useState(' ')
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState(' ')
    const [oblasti,setOblasti]=useState([])


    useEffect(()=> {

      axios.get('https://localhost:5001/Drzava/PreuzmiSveDrzave')
      .then(res=>{
        setDrzave(res.data)
      })
      .catch(err=>{
      })


      axios.get('https://localhost:5001/Oblast/PreuzmiSveOblasti')
      .then(res=>{
        setOblasti(res.data)
        //setCheckedList(uncheckAll(oblasti))
      })
      .catch(err=>{
      })
  
    }, [])

    useEffect(()=> { 
      setCheckedList(uncheckAll(oblasti))
      },[oblasti])

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

    const prikaziOblasti=async()=>{
        setFormaOblasti(!formaOblasti)
        console.log(oblasti)
        console.log(checkedList)
        vratiCekiranaPolja()
        console.log(nivoStudija)
   }

   function toggleOption(chlist, id, checked) {  //postavlja option sa odradjenim idjem na true ili false
    return chlist.map((option) =>
      option.id === id ? { ...option, checked } : option
    );
    }
  
    const changeList = (id, checked) => {
    setCheckedList(checkedList => 
        toggleOption(checkedList, id, checked));
    };

    const changeRadio = (value, checked) => {
      if(checked)
      {
        setNivoStudija(value)
      }
      };

    function vratiCekiranaPolja() {  
        const nesto=checkedList.filter((p)=>p.checked===true)
        setCekiranaPolja(nesto)
        console.log(nesto)
        console.log(cekiranaPolja)
        }



  return (
    
    <div className="PretragaForma">
    <div className="Programi">Pretraga studentskih programa</div>
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

    <div>
        <input type="radio" value="Osnovne" name="nivoStudija"  onChange={(e) => changeRadio(e.target.value, e.target.checked)}/> Osnovne studije
        <input type="radio" value="Master" name="nivoStudija"  onChange={(e) => changeRadio(e.target.value, e.target.checked)}/> Master studije
    </div>

    <button onClick={prikaziOblasti} className="dugmeNaucneOblasti">Odaberite naucne oblasti</button>

   {formaOblasti?(<>
    <div className='_modal'> 
                              <div className='_overlay'></div>
                              <div className='_modal-content'> 
                              <div className="OdaberiteOblasti">Odaberite oblasti</div>
                                <div className="Oblasti">
                                {checkedList.map(({ id, naziv, checked }) => (
                                            <label className="lblOblast" key={id}>
                                            {naziv}
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={(e) => changeList(id, e.target.checked)}
                                            />
                                            </label>
                                        ))}
                                </div>
                                <button className="btnOK" onClick={prikaziOblasti} >
                                        OK
                                      </button>
                              </div>
                            </div>
   
   </>):(<></>)}
   {cekiranaPolja.length>0 ? (<>
   <ul className='cekiranaPoljaLista'>
    {
        cekiranaPolja.map((m)=>
        <div  key={m.id} className="cekiranoPolje">
            {m.naziv}
        </div>

        )
    }
   </ul>
   </>) : (<></>)}


    <button onClick={()=>propClick(drzava,grad,univerzitet,nivoStudija,cekiranaPolja)} className="dugmePretrazi">Pretrazi</button>

</div>
    
  )
}

export default PretragaProgrami