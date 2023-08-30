import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Loading } from "../component";
import ToastConfig from "../component/toast/ToastConfig";

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(false);
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  if (admin && !status) setStatus(true)
  useEffect(() => {
    const name = localStorage.getItem('name')
    const password = localStorage.getItem('password')
    if (name && password && (new Date() - new Date(localStorage.getItem('timeLogin')) < 7200000)) {
      axios.get(`https://apimanage1306.000webhostapp.com/checkUser.php?${'name=' + name}${'&password=' + password}`)
        .then(response => {
          if (response.data.status) {
            setUser({ name: name, password: password, nameMqtt: response.data.data.account, passwordMqtt: response.data.data.password })
            setStatus(response.data.data.status)
            setAdmin(response.data.data.admin)
          }
          setLoading(false)
        })
        .catch(error => {
          console.error(error);
          setLoading(false)
        });
    }
    else {
      setLoading(false)
    }
  }, []);

  if (loading) {
    return (<Loading />)
  }
  return (
    <AuthContext.Provider value={{ user, setUser, status, setStatus, admin, setAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
