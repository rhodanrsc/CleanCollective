import React, { useState, useEffect } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";



const SaveBasicInfo = () => {

        //Setting initial state of the component
        const[companyFormValues, setFormValues] = useState({
            companyName: '',
            companyStatus: '',
            companyStatuses: [],
            logo: '',
            sector: '',
            sectors: [],
            developmentStage: '',
            developmentStages: [],
            numberOfEmployees: 0,
            yearFounded: new Date(),
            website: '',
            address: '',
            city: '',
            zip: '',
            province: '',
            country: ''
        })
    }

    //React Life Cycle Method
    //React will auto call this at different point
    //this will be auto called before anything is loaded to page
    // componentDidMount(){
    //     axios.get('http://localhost:5000/sector/')
    //     .then(response => {
    //         if(response.data.length > 0){
    //             this.setState({
    //                 //returns every sectors
    //                 names: response.data.map(sector => sector.name),
    //                 //Fills dropdown with default
    //                 name: response.data[0].name
    //             });
    //         }
    //     })
     //}
