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
        enqueueSnackbar(formattedError)
    }, [enqueueSnackbar, seterror, setLoading])
    // ################################

    // Get Resource List#####
    const getResourceList = useCallback(({query})=>{
        setLoading(true)

        axios.get(`/api/snippet-list/${query}/`, getCommonOptions())
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
    console.log(values,'mi vlues chingadadmare')
    setLoading(true)
    axios.post(`/api/language/`,values,getCommonOptions())
        .then(() => {
            setLoading(false)
            enqueueSnackbar(`Programing Language added`)


        }).catch(handleRequestResourceError)
}, [ enqueueSnackbar, , handleRequestResourceError, setLoading])
//#######
  return {
    resourceList,
    getResourceList,
    getProgramingLanguages,
    getLanguageTopicSubTopic,
    getSubTopics,
    getResource,
    addLanguage,
    resource,
    languages,
    nested,
    subtopics,
    deleteResource,

  }
}