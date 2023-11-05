import React, { useState, useEffect, useRef, createContext} from "react";


const Context = createContext()

const Provider = ( { children } ) => {

  const [ domain, setDomain] = useState("http://192.168.1.72:8000"); 
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ appSettings, setAppSettings] = useState({})


  function initAppSettings(){
    console.log("Fetching Data")
    fetch(`${domain}/api/v1.0/app/settings`, {
      method: 'GET'
    })  
    .then(res => {
      if(res.ok){
        return res.json()
       }else {
          throw res.json()
        }
      })
      .then(json => {
        console.log("GOOD JSON") // testing if it is fetching the data 
        // console.log(json)
        setAppSettings(json)
      }) 
    .catch(error => {
      // console.log("BAD JSON") //if it does not fetch it will throw bad json 
      console.log(error)
    })
  }
  useEffect(() => {
    initAppSettings()
  },[])

  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    appSettings,
    setAppSettings
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };
