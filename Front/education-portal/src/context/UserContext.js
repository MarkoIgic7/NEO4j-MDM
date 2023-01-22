import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import {Link, Navigate} from 'react-router-dom';
import axios from 'axios';

export const userContext = createContext({
  //email:"",
  //uloga:"",
 // jePosetilac: true,
 // logIn: () => {},
  //logOut: () => {},
  //connection: null
  
});

export function UserContextProvider({ children }) {

  const [email, setEmail] = useState("");
  //const [uloga,setUloga]=useState("");
  const [jePosetilac,setJePosetilac]=useState(true);
  //const[loading, setLoading]=useState(true);

 // const [ connection, setConnection ] = useState(null);
  
    // useEffect(()=>{
    //   if(connection && localStorage.getItem("user"))
    //         {
    //           connection.start().then(p=>
    //             {
    //               fja();
                  
    //             });
              
    //         }    
    // },[connection])

  /*function fja(){
    if(connection && localStorage.getItem("user"))
    {
      var user=localStorage.getItem("user");
      //connection.on("SendMessageToAll",()=> {console.log("Ne znam ni ja")})
      //ovde vracam sve kategorije korinsika koji je ulogovan i radim JoinGroup za te kategorije
      axios.get(`https://localhost:7107/Kategorija/vratiSveKategorijeNaKojeJeKorisnikPretplacen/${user}`).then(res=>
      {
        res.data.map(kat=>
          {
            
            connection.invoke('JoinGroup',kat.toString());
            console.log("Kategorijeeee")
            
          });
      })

    }
  }*/


  useEffect(()=> {
      if(localStorage.getItem("user"))
      {
          setEmail("admin@gmail.com");
          setJePosetilac(false);
      }
  
  },[])

    function logIn(email) {
        setEmail(email);
        setJePosetilac(false);
        return <Navigate to="/Admin" replace />;
    }

  function logOut() {
    setEmail("");
    setJePosetilac(true);
    window.localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  return (
    <userContext.Provider value={{ email, jePosetilac, logIn, logOut }}>   
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const { email, jePosetilac, logIn, logOut} = useContext(userContext);

  return useContext(userContext);
}