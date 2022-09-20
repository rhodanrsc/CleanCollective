import React, {Component} from 'react';
import axios from "axios";



export default class SaveBasicInfo extends Component{
    constructor(props){
        super(props);
        
        //Remember to bind methods


        //Setting initial state of the component
        this.state = {
            companyName: '',
            companyStatus: [],
            logo: '',
            sector: [],
            developmentStage: [],
            numberOfEmployees: [],
            yearFounded: new Date(),
            website: '',
            address: '',
            city: '',
            zip: '',
            province: '',
            country: ''
        }
    }

    //React Life Cycle Method
    //React will auto call this at different point
    //this will be auto called before anything is loaded to page
    componentDidMount(){
        axios.get('http://localhost:5000/sectors/')
    }



}