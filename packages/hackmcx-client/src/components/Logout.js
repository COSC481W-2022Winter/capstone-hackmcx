import React from "react";

const Logout = () =>  {

    localStorage.clear();
    window.localStorage.clear(); //try this to clear all local storage
    window.location.href = "/login";
    
    return(true);
}

export default Logout;