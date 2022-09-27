import React from "react";


const CreateCompany = () => { return (
  <body class="company-creation-background">
  

  <div className = "border">
  <main>
    <h2 className ="first-header">Build Your Company's Profile</h2>
    <textarea className ="company-creation-description">Providing information about your company that <br/>
                                            will get you in front of the right people.</textarea>
  
    <h2 className ="second-header">Viewable by all users</h2>
    <form>
      <div className ="form-group">
        <label for="companyNameInput">Name (required)
        <span style={{
          color: '#FF0000',
        }}
        > *</span>
        </label>
        
        <input type="text" name="companyName" className="form-control" id="formControlInput1" placeholder="Add your organization's name" required />
    </div>
  
    <div className ="form-group">
     <label for="companyType">Company Type</label>
     <select name="type" className ="form-control" id="formControlSelect2" >
       <option>Adoptor</option>
       <option>Innovator</option>
     </select>
   </div>
  
   <form>
    <div className ="form-group">
      <label for="formControlFile1">Company Logo</label>
      <input type="file" name="file" className ="form-control-file" id="formControlFile" />
    </div>
  </form>
  
   <div className ="form-group">
    <label for="companyStatus">Sector</label>
    <select name="status" className ="form-control" id="formControlSelect3" >
      <option value="oil-gas">Oil & Gas</option>
      <option value="clean-energy">Clean Energy</option>
    </select>
  </div>
  
    <div className ="form-group">
     <label for="companyStages">Development Stage</label>
     <select name="stage" className ="form-control" id="formControlSelect4" >
       <option value="seed">Seed and Development</option>
       <option value="startup">Startup</option>
       <option value="growth">Growth and Establishment</option>
       <option value="expansion">Expansion</option>
       <option value="maturity">Maturity</option>
       </select>
  </div>
  
  <div className ="form-group">
   <label for="numberOfEmployees">Number of Employees</label>
   <select name="employees" className ="form-control" id="exampleFormControlSelect5" >
     <option value="zero-ten">0-10 Employees</option>
     <option value="eleven-fifty">11-50 Employees</option>
     <option value="fiftyOne-hundred">51-100 Employees</option>
     <option value="hundredPlus">100+ Employees</option>
   </select>
  </div>
  
  <div className ="form-group">
    <label for="websiteURL">Website</label>
    <input type="text" name="website" className ="form-control" id="formControlInput6" placeholder="Website URL"/>
  </div>
  
  <div className ="form-check">
    <input className ="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
    <label className ="disclaimer" for="defaultCheck1">
      I verify that I am an authorized representative of this organization
  and have the right to act on its behalf in the creation and management of this page.
  The organization and I agree to the additional terms for Pages.
      </label>
  </div>
  
  <div className ="terms">
    <a href="www.google.ca">Read the Clean Collective Pages Terms</a>
  </div>
  
  <button className ="createButton" type="submit" name="createButton"><span>Create Company Page</span></button>
  
  
  </form>
  
  </main>
  
  </div>
  
  
  </body>
);
};
export default CreateCompany;