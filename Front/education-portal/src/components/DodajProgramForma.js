import React, {Component, useEffect} from 'react';
import './Pocetna.css';
import {Link, Navigate} from 'react-router-dom';
import { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

function DodajProgramForma() {

    function uncheckAll(options) {
        return options.map((option) => ({
            ...option,
            checked: false
        }));
        }
        const [checkedList, setCheckedList] = useState([]);  //ili ga ovde postavi na [] pa onda u useEffectu nakon sto fecujes Oblasti postavi na uncheckAll(oblasti)
        const [cekiranaPolja,setCekiranaPolja]=useState([])
    const [univerziteti,setUniverziteti]=useState([])
    const [univerzitet,setUniverzitet]=useState("")
    const [naziv,setNaziv]=useState("")
    const [opis,setOpis]=useState("")
    const [trajanje,setTrajanje]=useState("")
    const [brojMesta,setBrojMesta]=useState("")
    const [nivoStudija,setNivoStudija]=useState("")
    const [jezik,setJezik]=useState("")
    const [oblasti,setOblasti]=useState([])
    const [obl,setObl]=useState("")

    const[formaOblasti,setFormaOblasti]=useState(false)

    useEffect(()=> {

        axios.get('https://localhost:5001/Univerzitet/PreuzmiSveUniverzitete')
        .then(res=>{
          setUniverziteti(res.data)
        })
        .catch(err=>{
        })

        axios.get('https://localhost:5001/Oblast/PreuzmiSveOblasti')
        .then(res=>{
            setOblasti(res.data)
        })
        .catch(err=>{
        })
  
    
      }, [])

      useEffect(()=> { 
        setCheckedList(uncheckAll(oblasti))
        },[oblasti])

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
  

    function veliko(string){
        return string.charAt(0).toUpperCase()+string.slice(1);
      }

    function dodaj(cekPolja)
    {
        let ob=""
        cekPolja.map((c)=>
        {
          ob=ob + c.id + '#'
        })
        ob.toString()
        
        if(cekPolja.length===0)
        {
          ob="nema"
        }
        console.log(ob)
  
        //fetch za dodavanje programa
        if(trajanje!="" && naziv!="" && brojMesta!="" && nivoStudija!=""  && jezik!=""  && opis!="" && univerzitet!="")
        {
            axios.post(`https://localhost:5001/Program/DodajProgram/${naziv}/${trajanje}/${brojMesta}/${nivoStudija}/${opis}/${jezik}/${univerzitet}/${ob}`)
            .then(res=>{
                alert("Program dodat!")
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
            <div className="Programi">Dodavanje programa</div>

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
                <label>Naziv programa:</label>
                <input type="text" defaultValue="" name="Naziv"  className='InputIznos'  onChange={(e) => setNaziv(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Trajanje:</label>
                <input type="text" defaultValue="" name="Trajanje"  className='InputIznos'  onChange={(e) => setTrajanje(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Broj mesta:</label>
                <input type="text" defaultValue="" name="Mesta"  className='InputIznos'  onChange={(e) => setBrojMesta(e.target.value)}></input>
            </div>

            <div className="red">
                <label>Jezik:</label>
                <input type="text" defaultValue="" name="Jezik"  className='InputIznos'  onChange={(e) => setJezik(e.target.value)}></input>
            </div>

            <div>
                <input type="radio" value="Osnovne" name="nivoStudija"  onChange={(e) => changeRadio(e.target.value, e.target.checked)}/> Osnovne studije
                <input type="radio" value="Master" name="nivoStudija"  onChange={(e) => changeRadio(e.target.value, e.target.checked)}/> Master studije
            </div>
           
            <div className="red">
                <label>Opis:</label>
                <textarea className="inputOpis" type="text" placeholder='Unesite tekst'  onChange={(e)=>setOpis(e.target.value)}></textarea>
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


            <button onClick={()=>dodaj(cekiranaPolja)} className="dugmePretrazi">Dodaj</button>

</div>
    
  )
}

export default DodajProgramForma