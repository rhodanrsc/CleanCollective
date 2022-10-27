import React, { useState } from 'react';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import CheckIcon from '@mui/icons-material/Check';
import axios from "axios"
import {Listbox, Root, Label, InputWrapper, StyledTag} from "./tag_combo_style";

let theseValues;

const getValues = (value) => {
    theseValues = value
    return theseValues;
}

function TagComboBox() {
  const [listOfCategories, setListOfCategories] = useState(); 
  const [callCounter, setCallCounter] = useState(0);
   const loadCategories = () => {
      let newList = []
      axios.get("http://localhost:5000/sector/")
      .then(response => {
        if (response.data.length > 0) {
          
          response.data.map(function(category) {
            newList.push(category.name);
            console.log(listOfCategories)
          })
          setListOfCategories(newList);
        }
      })
      .catch((error) => {
        console.log("Something went wrong with loading categories: " + error);
      })
    }
    if(callCounter === 0 ) {
      loadCategories();
      setCallCounter(callCounter + 1);
    }

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
    
    multiple: true,
    options: listOfCategories ? listOfCategories : [],
    getOptionLabel: (option) => option,
  });
  const pastelColorPallete = ["#68D1C5", "#F4B3CE" , "#75C7EA", "#FAEFD7", "#F9D8CE", "#F2B7B8", "#FCE8E1", "#CEF2E1", "#FFFBD6", "#D7FDDF", "#D0D0FE"]
  const thisPastel = (index) => {
    //NEED TO REFACTOR. THIS SUCKS
    return pastelColorPallete[index];
  }
  getValues(value)
  
  
  return (
    <Root>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Category Tags</Label>
        <InputWrapper onClick={getValues} ref={setAnchorEl} className={focused ? 'focused' : ''}>
          {value.map((option, index) => (
            <StyledTag style={{backgroundColor : thisPastel(index), borderRadius : "25px", paddingBottom : "2px"}} label={option} {...getTagProps({ index })} />
          ))}

          <input {...getInputProps()} />
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
  );
}

export {TagComboBox, getValues}