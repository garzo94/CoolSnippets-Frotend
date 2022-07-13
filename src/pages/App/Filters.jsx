import React, { useState } from "react";
import {
    FormControl,
    Box,
    InputLabel,
    MenuItem,
    
} from "@mui/material";

import PropTypes from "prop-types";
import { SelectCustomized } from "../../styles/createTheme";
import { theme } from "../../styles/createTheme";


// import useRequestResource from "../hooks/useRequestResource"
export default function Filters({ onSubmit }) {
    // const { getResourceList, resourceList } = useRequestResource({ endpoint: "categories" });
    
 
    

    // useEffect(() => {
    //     getResourceList();
    // }, [getResourceList]);

    const [programingLanguage, setProgramingLanguage] = useState(null)
    const [topic, setTopic] = useState(null)
    const [subTopic, setSubTopic] = useState(null)

    const handleChange = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        switch(event.target.name){
          
          case 'language':
            setProgramingLanguage(event.target.value);
            break;
          case 'topic':
            setTopic(event.target.value)
            break;
          case 'subTopic':
            setSubTopic(event.target.value)
            break;
        }
        
        
        
    };

    
    
    return (
        
        <Box
            sx={{
                display: "flex",
                justifyContent:{xl:'end',lg:'end', md:'end', sm:'center', xs:'center'},
                alignItems: "center",
                flexWrap: "wrap",
                
                
                
            }}
        >
            
           
            <FormControl
                sx={{
                    minWidth: 250, 
                    marginRight: 2,
                    marginBottom: 2,
                    borderRadius: '20px'
                    
                }}
                variant="outlined"
                
            >
                <InputLabel sx={{color: theme.palette.primary.main}} id="programingLanguage-label" >Programing Language</InputLabel>
                <SelectCustomized
                    labelId="category-label"
                    disabled={false}
                    label="Programing Language"
                    id="filter-language"
                    size="large"
                    value={programingLanguage ?? ''}
                    onChange={handleChange}
                    name='language'
                    variant='outlined'
                    sx={{boxShadow: '0 0 5px #21ebff, 0 0 2px #290066' }}                   
                    color={theme.secondary}                  
                >
                    <MenuItem value='Python'>Python</MenuItem>
                    <MenuItem value='Javascript'>Javascript</MenuItem>
                    <MenuItem value='SQL'>SQL</MenuItem>
                    <MenuItem value='Python'>Python</MenuItem>
                    <MenuItem value='Javascript'>Javascript</MenuItem>
                    <MenuItem value='SQL'>SQL</MenuItem>
                </SelectCustomized>
            </FormControl>

            <FormControl
                sx={{
                    width:  250,
                    marginRight: 2,
                    marginBottom: 2,
                }}
                
            >
                <InputLabel sx={{color: theme.palette.primary.main}} id="topic-label">Topic</InputLabel>
                <SelectCustomized
                    labelId="topic-label"
                    label="Topic"
                    id="filter-language"
                    size="large"
                    value={topic ?? ''}
                    onChange={handleChange}
                    disabled={programingLanguage === null ? true : false}
                    variant='outlined'
                    sx={{boxShadow: programingLanguage !== null ? '0 0 5px #21ebff, 0 0 2px #290066': null}}
                    name='topic' 
                    
                    color={theme.primary}
                      
                    
                >
                    <MenuItem value='Functions'>Functions</MenuItem>
                    <MenuItem value='Array'>Array</MenuItem>
                    <MenuItem value='Tuplas'>Tuplas</MenuItem>
                </SelectCustomized>
            </FormControl>


            <FormControl
                sx={{
                    width:  250,
                    marginRight: 2,
                    marginBottom: 2,
                }}
                
            >
                <InputLabel sx={{color: theme.palette.primary.main}} id="subTopic-label">SubTopic</InputLabel>
                <SelectCustomized
                    labelId="topic-label"
                    label="Sub Topic"
                    id="filter-subtopic"
                    size="large"
                    value={subTopic ?? ''}
                    onChange={handleChange}
                    disabled={topic === null ? true : false}
                    variant='outlined' 
                    sx={{boxShadow: topic !== null ? '0 0 5px #21ebff, 0 0 2px #290066': null}} 
                    name='subTopic' 
                              
                >
                    <MenuItem value='append'>append</MenuItem>
                    <MenuItem value='shift'>shift</MenuItem>
                    <MenuItem value='unshift'>unshift</MenuItem>
                </SelectCustomized>
            </FormControl>
        </Box>
                    
                
)}
        
    


Filters.propTypes = {
    onSubmit: PropTypes.func,
};

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         