import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Title from "../../genericFiles/Title";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { createTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ContactPhoneIcon from "@material-ui/icons/Phone";
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import { ADDRESS } from "../../genericFiles/constants";
import SpinnerDialog from "../../genericFiles/SpinnerDialog";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { alpha, styled } from '@mui/material/styles';


const theme = createTheme();
const avatar = {
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
};
const paper = {
  marginTop: theme.spacing(2),
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

const cardCss = {
  minWidth: 200,
  height: 125,
  paddingTop: 10,
  paddingBottom: 60,
  boxShadow: 0,
  boxSizing: "border-box",
  borderRadius: 12,
  backdropFilter: "blur(10px)",
  backgroundColor: "#a7ffeb",
  boxShadow: 0,
  fontSize: "1rem",
  color: " rgb(6, 27, 100)",
}
const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(5),
  height: theme.spacing(5),
  justifyContent: 'center',
  color: "rgb(16, 57, 150)",
  backgroundImage: "linear-gradient(135deg, rgba(16, 57, 150, 0) 0%, rgba(16, 57, 150, 0.24) 100%)",
  // marginBottom: theme.spacing(3),
}));

export default function HospitalPersonalInfo(props) {
  const [updatedData, setUpdatedData] = React.useState(JSON.parse(props.data));
  const [loaded, setLoaded] = React.useState(false);
  var hospital = updatedData;
  hospital.password = "";
  hospital.id = hospital.registrationId;
  console.log(updatedData);
  const manageUpdateForm = () => {
    var x = document.getElementById("form");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  const handleChange = (event) => {
    hospital[event.target.name] = event.target.value;
    console.log(hospital[event.target.name]);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoaded(true);
    let response = "";
    try {
      console.log(hospital);
      response = await axios.post(ADDRESS + `updateAsset`, hospital);
      response = response.data;
      console.log(response);
      if (response === "Correct") {
        console.log(response);
        manageUpdateForm();
        delete hospital.password;
        setUpdatedData(hospital);
      } else {
        //show error message
        console.log(response);
      }
    } catch (e) {
      //show error message
      console.log("failed to connect to the server");
    }
    setLoaded(false);
  };

  return (
    <React.Fragment>
      <Title>{updatedData.name}</Title>
      <Typography component="span" variant="h6" align="center">
        
        <Grid container spacing={4}>

            <Grid item xs={12} sm={6} md={4}>
              <Card style={cardCss}>
                <CardContent>

                  <Typography component={'span'} >
                    <StyledIcon>
                    <ContactPhoneIcon />
                    </StyledIcon>
                    Phone Number
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} >
                    {updatedData.phone}

                  </Typography>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card style={cardCss}>
                <CardContent>

                  <Typography component={'span'} >
                    <StyledIcon>
                    <HomeIcon />
                    </StyledIcon>
                    Address
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} >
                    {updatedData.address}

                  </Typography>

                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card style={cardCss}>
                <CardContent>

                  <Typography component={'span'} >
                    <StyledIcon>
                    <AccountBoxIcon />
                    </StyledIcon>
                    Registration ID
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} >
                    {updatedData.registrationId}

                  </Typography>

                </CardContent>
              </Card>
            </Grid>
        </Grid>
        
        {/* UserName : {updatedData.userName}
        <br />
        Phone : {updatedData.phone}
        <br />
        Address : {updatedData.address}
        <br />
        RegistrationId : {updatedData.registrationId} */}
      </Typography>
      <div align="center">
        <Button type="submit"
                  variant="contained"
                  color="primary"
                  style={submit}
                  onClick={manageUpdateForm}
                >
          Update Hospital Info
        </Button>
      </div>
      <div id="form" style={{ display: "none" }}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div style={paper}>
            <Avatar style={avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Update Info
            </Typography>
            <form style={form} onSubmit={submitForm}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="name"
                    name="name"
                    variant="standard"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    defaultValue={hospital.name}
                    autoFocus={true}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="phone"
                    label="Phone No."
                    name="phone"
                    autoComplete="phone"
                    defaultValue={hospital.phone}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="India"
                    defaultValue={hospital.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="standard"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={submit}
                >
                  Update
                </Button>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
      <SpinnerDialog open={loaded} />
    </React.Fragment>
  );
}