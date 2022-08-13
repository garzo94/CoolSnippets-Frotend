import { useCallback, useState, useContext } from "react";
import axios from "axios";
import { useSnackbar } from "notistack"
import formatHttpApiError from "../helpers/formatHttpApiError";
import getCommonOptions from "../helpers/getCommonOptions";
import { LoadingOverlayResourceContext } from "../components/loadingOverlayResource";


export default function useRequestResource({endpoint, resourceLabel}) {
     const [resourceList, setresourceList] = useState({
        results: []
    });
    const [subtopics, setSubtopics] = useState({results: []})
    const [nested, setNested] = useState({results: []})
    const [languages, setLanguage] = useState({results: []})
    const [resource, setResource] = useState(null)
     // Overlay ###########
     const loadingOverlay = useContext(LoadingOverlayResourceContext);
     const { setLoading } = loadingOverlay


 // errors #########################
     const {  enqueueSnackbar } = useSnackbar()
     const [error, seterror] = useState(null)

     const handleRequestResourceError = useCallback((err) =>{
        const formattedError = formatHttpApiError(err);
        seterror(formattedError)
        setLoading(false)
        enqueueSnackbar(formattedError,'error')
    }, [enqueueSnackbar, seterror, setLoading])
    // ################################

    // Get Resource List#####
    const getResourceList = useCallback(({query})=>{
        setLoading(true)

        axios.get(`/api/snippet-list/${query}`, getCommonOptions())
          .then((res)=>{

            setLoading(false)
            if(res.data.results){
                setresourceList(res.data);
            }else{
                setresourceList({
                    results: res.data
                })
            }

          }).catch(handleRequestResourceError)
    }, [endpoint, handleRequestResourceError, setLoading])
    // ###########

    // Get Programing Languages #####
    const getProgramingLanguages = useCallback(()=>{
        setLoading(true)
        axios.get("/api/get-languages/", getCommonOptions())
          .then((res)=>{

            setLoading(false)
            if(res.data.results){
                setLanguage(res.data);
            }else{
                setLanguage({
                    results: res.data
                })
            }

          }).catch(handleRequestResourceError)
    }, [endpoint, handleRequestResourceError, setLoading])
    // ###########
      // Get Languages-topics-subtopics #####
      const getLanguageTopicSubTopic = useCallback(()=>{
        setLoading(true)
        axios.get("/api/language/", getCommonOptions())
          .then((res)=>{

            setLoading(false)
            if(res.data.results){
                setNested(res.data);
            }else{
                setNested({
                    results: res.data
                })
            }

          }).catch(handleRequestResourceError)
    }, [endpoint, handleRequestResourceError, setLoading])
    // ###########

       // Get -subtopics #####
      const getSubTopics = useCallback(({query})=>{
      setLoading(true)
      axios.get(`/api/get-subtopics/${query}`, getCommonOptions())
        .then((res)=>{

          setLoading(false)
          if(res.data.results){
              setSubtopics(res.data);
          }else{
              setSubtopics({
                  results: res.data
              })
          }

        }).catch(handleRequestResourceError)
  }, [endpoint, handleRequestResourceError, setLoading])
    // ###########
    // get one single snnipet#######
    const getResource = useCallback((id) => {
      setLoading(true)
      axios.get(`/api/get-snippet/${id}/`,getCommonOptions())
      .then((res) => {
          const { data } = res
          setResource(data)
          setLoading(false)
      }).catch(handleRequestResourceError)
  },[endpoint, handleRequestResourceError,setLoading])
     // Delete snnipet #######
    const deleteResource = useCallback((id) => {
        setLoading(true)
        axios.delete(`api/snippet-updatedelete/${id}/`, getCommonOptions())
          .then(() => {
                setLoading(false)
              enqueueSnackbar(`Snippet deleted`)

            const newResourceList = {
                results: resourceList.results.filter((r) =>{
                    return r.id !== id

                })
            }
            setresourceList(newResourceList)
        }).catch(handleRequestResourceError)
    },[endpoint, resourceList, enqueueSnackbar], resourceLabel, handleRequestResourceError)
  //####


// Add language
  const addLanguage = useCallback((values,) => {

    setLoading(true)
    axios.post(`/api/language/`,values,getCommonOptions())
        .then(() => {
            setLoading(false)
            enqueueSnackbar(`New language added!`)


        }).catch(handleRequestResourceError)
}, [ enqueueSnackbar, , handleRequestResourceError, setLoading])
//#######
// Add Topic
const addTopic = useCallback((values,{id}) => {

  setLoading(true)
  axios.post(`/api/topic/${id}/`,values,getCommonOptions())
      .then(() => {
          setLoading(false)
          enqueueSnackbar(`Topic added`)

      }).catch(handleRequestResourceError)
}, [ enqueueSnackbar, , handleRequestResourceError, setLoading])
//####### Ad subtopic
const addSubTopic = useCallback((values,{idLang},{idTop}) => {

  setLoading(true)
  axios.post(`/api/subtopic/${idLang}/${idTop}/`,values,getCommonOptions())
      .then(() => {
          setLoading(false)
          enqueueSnackbar(`Subtopic added!`)

      }).catch(handleRequestResourceError)
}, [ enqueueSnackbar, , handleRequestResourceError, setLoading])
//#######
//### Create Snippet
const addSnippet = useCallback((values,querySnippet) => {

  setLoading(true)
  axios.post(`/api/snippet/${querySnippet}/`,values,getCommonOptions())
      .then(() => {
          setLoading(false)
          enqueueSnackbar(`Snippet Saved successfully!`)

      }).catch(handleRequestResourceError)
}, [ enqueueSnackbar, , handleRequestResourceError, setLoading])
//#######
//Edit Snippet
const updateResource = useCallback((id, values,querySnippet, succesCallback) => {
  setLoading(true)
  console.log(values,'jeje')
  axios.put(`/api/snippet-updatedelete/${id}/${querySnippet}/`, values, getCommonOptions())
      .then((res) => {
          setLoading(false)
          enqueueSnackbar(`Snippet updated`)
          if (succesCallback){
              succesCallback()
          }

      }).catch(handleRequestResourceError)
},[endpoint, enqueueSnackbar, handleRequestResourceError, setLoading])
  return {
    resourceList,
    getResourceList,
    getProgramingLanguages,
    getLanguageTopicSubTopic,
    getSubTopics,
    getResource,
    addLanguage,
    addTopic,
    addSubTopic,
    addSnippet,
    updateResource,
    resource,
    languages,
    nested,
    subtopics,
    deleteResource,

  }
}
