import React, { useEffect, useState } from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios"
import {Listbox, Root, Label, InputWrapper, StyledTag} from "./tag_combo_style";


function TagComboBox() {
  const [listOfCategories, setListOfCategories] = useState(); 

   useEffect(() => {
     let newList = []
      axios.get("http://localhost:5000/sector/")
      .then(response => {
        if (response.data.length > 0) {
          
          response.data.map(function(category) {
            newList.push(category.name);
            
          })
          setListOfCategories(newList);
        }
      })
      .catch((error) => {
        
      })
  }, [listOfCategories]
  )


     

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo',
    freeSolo : true,
    multiple: true,
    options: listOfCategories ? listOfCategories : [],
    getOptionLabel: (option) => option,
    isOptionEqualToValue : (option, value) => option.id !== value.id
  })
  //Colors for the tags
  const pastelColorPallete = ["rgba(181, 234, 215, 0.6)", "rgba(224, 187, 228, 0.6)"  , "rgba(104, 209, 197, 0.6)", "rgba(244, 179, 206, 0.6)", "rgba(249, 216, 206,0.6)", "rgba(117, 199, 234, 0.6)", "rgba(149, 125, 173, 0.6)", "#CEF2E1", "#FFFBD6", "#D7FDDF", "#D0D0FE"]
  const thisPastel = (index) => {
    //NEED TO REFACTOR. THIS SUCKS
    return pastelColorPallete[index];
  }

  const addTag = (event) =>{
    let currentInput = getInputProps().value;
    if(currentInput !== "" && event.key === "Enter"){
      axios.post("http://localhost:5000/sector/add/", {
         name : currentInput
      })
      
    }
  }

 
  

  return (
    <Root >
      <div {...getRootProps()}>
        <Label  style={{marginTop: "5px"}}  {...getInputLabelProps()}>Category Tags</Label>
        <InputWrapper ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag  style={{backgroundColor : thisPastel(index), borderRadius : "25px", paddingBottom : "2px"}} label={option} {...getTagProps({ index })} />
          ))}

          <input onKeyDown={addTag} {...getInputProps()}></input>
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option}</span>
              <CheckIcon fontSize="small" />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  )
}

export {TagComboBox}