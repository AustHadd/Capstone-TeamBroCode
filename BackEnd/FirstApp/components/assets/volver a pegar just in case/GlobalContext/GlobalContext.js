import React, { useState, useEffect, useRef, createContext} from "react";


const Context = createContext()


 

const [domain, setDomain ] = useState("127.0.0.1:8000")
const [ isLoggedIn, setIsLoggedIn]= useState(false)

const Provider = ( { children } ) => {
    function initAppSettings() {
        console.log("Fetching data")
        fetch(`${domain}/api/v1.0/app/settings`, {
            method: 'Get'    
        
        })
        .them(res=> {
            if (res.ok) {
                return res.json()
            }
            else {
                throw res.json()
            }
        })
        .then(json => {
            console.log("Good JSON")
            console.log(json)
        })
        .catch(error => {
            console.log("bad JSON")
            console.log(error)
        })
    }

    useEffect(() => {
        initAppSettings()
    }, [])
const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn
    }
    return<Context.Provider value={globalContext}>{children}</Context.Provider>
};

export {Context, Provider};