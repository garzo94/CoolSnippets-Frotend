/* eslint-disable no-unused-vars */
import {useCallback, useState, useContext} from 'react'
import axios from "axios"
import formatHttpApiError from '../helpers/formatHttpApiError'
import { useSnackbar } from 'notistack'
import { AuthContext } from '../../context/AuthContextProvider'
import getCommonOptions from '../helpers/getCommonOptions'



export default function useRequestAuth() {
    
    
    const {setIsAuthenticated} = useContext(AuthContext)
    const [error, setError] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    const [logoutPending, setLogoutPending] = useState(false)
    //  Handel Error Function
    const handleRequestError = useCallback((err)=>{
      const formattedError = formatHttpApiError(err)
      setError(formattedError)
      
      enqueueSnackbar(formattedError)   
    },[ , setError, enqueueSnackbar])



    //  Register endpoint
    const register = useCallback(({username, email, password}, succesCallback)=>{ 
      axios.post("/api/auth/users/", {username, email, password})
        .then((res)=>{
         enqueueSnackbar('you have registered successfully! Now you can Sign In')
          if (succesCallback){
            succesCallback()
          }
        }).catch(handleRequestError)
    }, [handleRequestError, enqueueSnackbar, ])


    //  Login Endpoint
    const login = useCallback(({username, password}, successCallback)=>{
         axios.post("/api/auth/token/login/",{username, password})
        .then((res)=>{
          const {auth_token} = res.data;
          localStorage.setItem("authToken", auth_token);        
          setIsAuthenticated(true)
          if(successCallback){
              successCallback();
          }
        }).catch(handleRequestError)
  }, [handleRequestError, , setIsAuthenticated])

 
    const logout = useCallback(()=>{
     
      setLogoutPending(true)
      axios.post('/api/auth/token/logout/',null,getCommonOptions())
      .then(()=>{
        localStorage.removeItem('authToken')
        setLogoutPending(false);
        setIsAuthenticated(false)
      }).catch((err)=>{
        setLogoutPending(false)
        handleRequestError(err)
      })
    },[setLogoutPending, setIsAuthenticated, handleRequestError])





  return {
       login,
       register,
       logout,
       logoutPending
  }
}
