import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ADDRESS } from "../genericFiles/constants";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { createTheme } from "@material-ui/core/styles";
import copyright from "../genericFiles/copyright";
import MenuItem from "@material-ui/core/MenuItem";
import { validateForm } from "../genericFiles/validateForm";
import { Alert } from "react-bootstrap";

import SpinnerDialog from "../genericFiles/SpinnerDialog";


const theme = createTheme();
 
const avatar = {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
};
const paper = {
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const form = {
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(3),
};
const submit = {
  margin: theme.spacing(3, 0, 2),
};

class registerPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address: "",
      aadhaar: "",
      DOB: "",
      gender: "",
      bloodGroup: "",
      userName: "",
      password: "",
      phone: "",
      type: "Patient",
      SMSUpdates: false,
      isRegistered: false,
      errors: {},
      alertShow: false,
      alertData: "",
      alertHeading: "",
      loaded: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleCheckBox = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  removeNonNecessaryErrors = (event) => {
    delete this.state.errors.medicalRegistrationNo;
    delete this.state.errors.specialisation;
    delete this.state.errors.registrationId;
    delete this.state.errors.name;
    delete this.state.errors.hospitalId;
  };
  submitForm = async (event) => {
    event.preventDefault();
    console.log(this.state);
    let errors = validateForm(this.state);
    console.log(!errors["userName"]);
    if (!errors["userName"]) {
      let isUserNameTaken = localStorage.getItem(this.state.userName);
      console.log(isUserNameTaken);
      if (isUserNameTaken !== null) {
        errors["userName"] = "*userName already taken";
      }
    }
    if (!errors["aadhaar"]) {
      let isAadhaarTaken = localStorage.getItem(this.state.aadhaar);
      console.log(isAadhaarTaken);

      if (isAadhaarTaken !== null) {
        errors["aadhaar"] = "*aadhaar already in use";
      }
    }
    this.setState({ errors: errors });
    this.state.errors = errors;
    this.removeNonNecessaryErrors();
    console.log(this.state.errors);
    let isInvalid = Object.getOwnPropertyNames(this.state.errors).length;
    if (!isInvalid) {
      let response = "";
      try {
        this.setState({ loaded: true });
        response = await axios.post(ADDRESS + `registerPatient`, this.state);
        this.setState({ loaded: false });
        response = response.data;
        console.log(response);
        if (response === "Correct") {
          localStorage.setItem(
            this.state.userName,
            this.state.firstName + " " + this.state.lastName
          );
          localStorage.setItem(
            this.state.aadhaar,
            this.state.firstName + " " + this.state.lastName
          );
          this.setState({ isRegistered: true });
          console.log(this.state);
        } else {
          this.setState({
            alertShow: true,
            alertData: response,
            alertHeading: "SignUp Error",
          });
        }
      } catch (e) {
        this.setState({
          loaded: true,
          alertShow: true,
          alertHeading: "Server Error",
          alertData: "Can not connect to the server",
        });
      }
    }
  };

  render() {
    if (this.state.isRegistered === true) {
      console.log(this.state);
      return <Redirect to="/patientLogin" />;
    } else {
      const ifalert = this.state.alertShow;

      return (
        // <section className="h-80 bg-secondary">
        //   <div className="container  h-100" >
        //     <div className="row d-flex justify-content-center align-items-center h-80">
        //       <div className="col">
        //         <div className="card card-registration my-4" style={{borderRadius: "25px"}}>
        //           <div className="row g-0">
        //             <div className="col-xl-6 d-none d-xl-block">
        //               <img src="https://a0.anyrgb.com/pngimg/1092/522/rehabilitation-exercises-medical-rehabilitation-scene-subacute-rehabilitation-rehabilitation-patient-sad-boy-in-wheelchair-wheelchair-wheelchair-cerebral-palsy-cartoon-wheelchair-wheelchairs.png"
        //                 alt="photo" className="img-fluid"
        //                 style={{ borderRadius: "25px" }} />
        //             </div>
        //             <div className="col-xl-6" >
        //               <form noValidate onSubmit={this.submitForm}>
        //                 <div className="card-body p-md-5 text-black">
        //                   <h3 className="mb-5 text-uppercase">Patient registration form</h3>
        //                   {/* ALL alerts and errors in the form */}
        //                   {ifalert ? (<Alert variant="danger"> {this.state.alertHeading}  {this.state.alertData} </Alert>):(<></>)}
        //                   {this.state.errors.firstName ? (<Alert variant="danger">{this.state.errors.firstName}</Alert>) : (<></>)}
        //                   {this.state.errors.lastName ? (<Alert variant="danger">{this.state.errors.lastName}</Alert>) : (<></>)}
        //                   {this.state.errors.phone ? (<Alert variant="danger">{this.state.errors.phone}</Alert>) : (<></>)}
        //                   {this.state.errors.bloodGroup ? (<Alert variant="danger">{this.state.errors.bloodGroup}</Alert>) : (<></>)}
        //                   {this.state.errors.address ? (<Alert variant="danger">{this.state.errors.address}</Alert>) : (<></>)}
        //                   {this.state.errors.gender ? (<Alert variant="danger">{this.state.errors.gender}</Alert>) : (<></>)}
        //                   {this.state.errors.aadhaar ? (<Alert variant="danger">{this.state.errors.aadhaar}</Alert>) : (<></>)}
        //                   {this.state.errors.userName ? (<Alert variant="danger">{this.state.errors.userName}</Alert>) : (<></>)}
        //                   {this.state.errors.password ? (<Alert variant="danger">{this.state.errors.password}</Alert>) : (<></>)}
                          

        //                   <div className="row">
        //                     <div className="col-md-6 mb-4">
        //                       <div className="form-outline">

        //                         <label className="form-label" htmlFor="firstName">First name</label>

        //                         <input required type="text" name="firstName" id="firstName" defaultValue={this.state.firstName}
        //                           onChange={this.handleChange} className="form-control " />
        //                       </div>
        //                     </div>
        //                     <div className="col-md-6 mb-4">
        //                       <div className="form-outline">
        //                         <label className="form-label" htmlFor="lastName">Last name</label>

        //                         <input  type="text" id="lastName" name="lastName" defaultValue={this.state.lastName}
        //                           onChange={this.handleChange} className="form-control" required="true"/>
        //                       </div>
        //                     </div>
        //                   </div>

        //                   <div className="row">
        //                     <div className="col-md-6 mb-4">
        //                       <div className="form-outline">
        //                         <label className="form-label" htmlFor="phone">Contact No.</label>

        //                         <input required type="text" id="phone" name="phone" defaultValue={this.state.phone} helperText={this.state.errors.phone}
        //                           onChange={this.handleChange} className="form-control " />
        //                       </div>
        //                     </div>
        //                     <div className="col-md-6 mb-4">
        //                       <div className="form-outline">
        //                         <label className="form-label" htmlFor="bloodGroup">Blood Group</label>

        //                         <input required type="text" name="bloodGroup" id="bloodGroup"
        //                           label="Blood Group" defaultValue={this.state.bloodGroup} helperText={this.state.errors.bloodGroup}
        //                           onChange={this.handleChange} className="form-control " />
        //                       </div>
        //                     </div>
        //                   </div>

        //                   <div className="form-outline mb-4">
        //                     <label className="form-label" htmlFor="address">Address</label>

        //                     <input type="text" id="address" name="address" defaultValue={this.state.address} helperText={this.state.errors.address}
        //                       onChange={this.handleChange} className="form-control " />
        //                   </div>

        //                   <div className="d-md-flex justify-content-start align-items-center  py-2">

        //                     <div className="form-outline mb-4">
        //                       <label className="form-label" htmlFor="DOB">Date of Birth</label>

        //                       <input type="date" id="date" name="DOB"
        //                         defaultValue={this.state.DOB}
        //                         onChange={this.handleChange} className="form-control" />
        //                     </div>
        //                     <div className="form-outline m-4">
        //                       <label className="form-label" htmlFor="gender">Gender</label>

        //                       <TextField
        //                         variant="outlined"
        //                         required
        //                         fullWidth
        //                         select
        //                         id="select"
        //                         name="gender"
        //                         autoComplete="gender"
        //                         defaultValue={this.state.gender}
        //                         onChange={this.handleChange}
        //                         helperText={this.state.errors.gender}
        //                       >
        //                         <MenuItem value="Male">Male</MenuItem>
        //                         <MenuItem value="Female">Female</MenuItem>
        //                         <MenuItem value="Other">Other</MenuItem>
        //                       </TextField>
        //                     </div>
        //                   </div>
        //                   <div className="form-outline mb-4 ">
        //                     <label className="form-label" fhtmlFor="Aadhaar">Aadhaar</label>

        //                     <input type="text" id="aadhaar"
        //                       label="Aadhaar"
        //                       name="aadhaar" defaultValue={this.state.aadhaar} helperText={this.state.errors.aadhaar}
        //                       onChange={this.handleChange} className="form-control   col-md-6" />
        //                   </div>



        //                   <div className="form-outline mb-4 col-md-6">
        //                     <label className="form-label" fhtmlFor="userName">Username</label>

        //                     <input type="text" id="userName"
        //                       label="UserName"
        //                       name="userName" defaultValue={this.state.userName} helperText={this.state.errors.userName}
        //                       onChange={this.handleChange} className="form-control " />
        //                   </div>

        //                   <div className="form-outline mb-4 col-md-6">
        //                     <label className="form-label" fhtmlFor="password">Password</label>

        //                     <input type="password" defaultValue={this.state.password}
        //                       label="Password" className="form-control "
        //                       onChange={this.handleChange} name="password"
        //                       id="password" helperText={this.state.errors.password}
        //                     />
        //                   </div>



        //                   <div className="d-flex justify-content-end pt-3">
        //                     {/* <button type="button" className="btn btn-light btn-lg">Reset all</button> */}
        //                     <Button type="submit" variant="contained" color="primary" >Submit</Button>
        //                   </div>

        //                 </div>
        //               </form>

        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //     <Box mt={5}>
        //       <copyright.Copyright />
        //     </Box>
        //     <SpinnerDialog open={this.state.loaded} />
        //   </div>
        // </section>
        <div className="container py-5 h-90">
        <section className="vh-100">
          <div className="container-fluid bg-light" style={{ borderRadius: "25px" }}>
            <div className="row">
              <div className="col-sm-6 text-black">

                <div className="px-5 ms-xl-4">
                  <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{ color: "#709085" }}></i>
                  <span className="h1 fw-bold mb-auto d-flex justify-content-start">Medichain</span>
                </div>


                <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

                  <form style={{ width: "23rem" }} noValidate onSubmit={this.submitForm}>

                    <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Patient Registration Form</h3>
                    {ifalert ? (<Alert variant ="danger">  {this.state.alertHeading} {this.state.alertData} </Alert>) : (<></>)}
                    {this.state.errors.firstName ? (<Alert variant="danger">{this.state.errors.firstName}</Alert>) : (<></>)}
                    {this.state.errors.lastName ? (<Alert variant="danger">{this.state.errors.lastName}</Alert>) : (<></>)}
                    {this.state.errors.phone ? (<Alert variant="danger">{this.state.errors.phone}</Alert>) : (<></>)}
                    {this.state.errors.bloodGroup ? (<Alert variant="danger">{this.state.errors.bloodGroup}</Alert>) : (<></>)}
                    {this.state.errors.address ? (<Alert variant="danger">{this.state.errors.address}</Alert>) : (<></>)}
                    {this.state.errors.gender ? (<Alert variant="danger">{this.state.errors.gender}</Alert>) : (<></>)}
                    {this.state.errors.aadhaar ? (<Alert variant="danger">{this.state.errors.aadhaar}</Alert>) : (<></>)}
                    {this.state.errors.userName ? (<Alert variant="danger">{this.state.errors.userName}</Alert>) : (<></>)}
                    {this.state.errors.password ? (<Alert variant="danger">{this.state.errors.password}</Alert>) : (<></>)}
            
                    {/* Row 01 */}
                    <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="firstName">First Name</label>
                                <input required type="text" id="firstName" name="firstName" defaultValue={this.state.firstName} helperText={this.state.errors.firstName}
                                  onChange={this.handleChange} className="form-control form-control-lg" />
                              </div>
                            </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="lastName">Last Name</label>
                              <input required name="lastName" defaultValue={this.state.lastName}
                                onChange={this.handleChange}
                                id="lastName" className="form-control form-control-lg" helperText={this.state.errors.lastName}/>
                          </div>
                        </div>
                      </div>
                    
                    {/* Row 2 */}
                    <div className="row">
                            <div className="col-md-6 mb-4">
                              <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="phone">Contact Number</label>
                                <input required type="text" id="phone" name="phone" defaultValue={this.state.phone} helperText={this.state.errors.phone}
                                  onChange={this.handleChange} className="form-control form-control-lg" />
                              </div>
                            </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="bloodGroup">Blood Group</label>
                              <input required name="bloodGroup" defaultValue={this.state.bloodGroup}
                                onChange={this.handleChange}
                                id="bloodGroup" className="form-control form-control-lg" helperText={this.state.errors.bloodGroup}/>
                          </div>
                        </div>
                      </div>

                    {/* Row 03 */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="address">Address</label>
                      <input name="address" defaultValue={this.state.address}
                        onChange={this.handleChange}
                        id="address" className="form-control form-control-lg" helperText={this.state.errors.address}/>
                    </div>

                  {/* Row 04 */}
                  <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="DOB">Date of Birth</label>
                          <input type="date" id="date" name="DOB"
                            defaultValue={this.state.DOB}
                            onChange={this.handleChange} className="form-control" />
                        </div>
                      </div>
                    <div className="col-md-6 mb-4">
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="DOB">Gender</label>

                        <TextField
                                variant="outlined"
                                required
                                fullWidth
                                size="small"
                                select
                                id="select"
                                name="gender"
                                autoComplete="gender"
                                defaultValue={this.state.gender}
                                onChange={this.handleChange}
                                helperText={this.state.errors.gender}
                              >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                              </TextField>
                          </div>
                        </div>
                      </div>

                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="userName">Aadhaar Number</label>
                    <input name="aadhaar" defaultValue={this.state.aadhaar}
                      onChange={this.handleChange}
                      id="aadhaar" className="form-control form-control-lg" helperText={this.state.errors.aadhaar}/>
                  </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="userName">Username</label>
                      <input name="userName" defaultValue={this.state.userName}
                        onChange={this.handleChange}
                        id="userName" className="form-control form-control-lg" helperText={this.state.errors.userName}/>
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">Password</label>

                      <input type="password" defaultValue={this.state.password}
                        label="Password" className="form-control form-control-lg"
                        onChange={this.handleChange} name="password"
                        helperText={this.state.errors.password}
                        id="password" />

                    </div>

                    <div className="pt-1 mb-4">
                      <Button variant="contained" color="primary" type="submit" >Register</Button>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
                    <p>Already have an account? <a href="/patientLogin" variant="body2">
                      Sign In here</a> <a href="/" variant="body2"> Home Page</a></p>

                  </form>

                </div>

              </div>
              <div className="col-sm-6 px-0 d-none d-sm-block" >
                <img src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="Login image" className="w-100 vh-100" style={{ objectFit: "cover", objectPosition: "left", borderRadius: "25px" }} />
              </div>
            </div>
            <Box mt={5}>
              <copyright.Copyright />
            </Box>
          </div><SpinnerDialog open={this.state.loaded} />
        </section>

      </div>
      );
    }
  }
}

export default registerPatient;
