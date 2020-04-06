import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { registerOrg } from "../utils/helpers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://covindia.com/">
        Covindia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Register() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    food: true,
    water: false,
    medicine: false,
    doctor: false,
    ambulance: false,
    mental: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [orgUrl, setorgUrl] = useState("");
  const _onSubmit = (e) => {
    const name = document.getElementById("nameOrg").value;
    const email = document.getElementById("email").value;
    const telephone = document.getElementById("telephone").value;
    registerOrg(name, email, telephone, state);
    alert("Your org has ben registered successfully");
    var form = document.getElementById("registration");
    setorgUrl(`https://help.covindia.com/${name}`);
    form.reset();
  };

  const { food, medicine, doctor, ambulance, mental, water } = state;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {orgUrl !== "" && (
          <h3>
            You can find your Orgnisation at <a href={{ orgUrl }}>here</a>
          </h3>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate id="registration">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="nameOrg"
                variant="outlined"
                required
                fullWidth
                id="nameOrg"
                label="Organisation Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="telephone"
                label="Mobile Number"
                type="tel"
                id="telephone"
                // autoComplete="current-telephone"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Services Provided</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={food}
                        onChange={handleChange}
                        name="food"
                      />
                    }
                    label="Food"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={water}
                        onChange={handleChange}
                        name="water"
                      />
                    }
                    label="Water"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={medicine}
                        onChange={handleChange}
                        name="medicine"
                      />
                    }
                    label="Medicine"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={doctor}
                        onChange={handleChange}
                        name="doctor"
                      />
                    }
                    label="Doctor"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={ambulance}
                        onChange={handleChange}
                        name="ambulance"
                      />
                    }
                    label="Ambulance"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mental}
                        onChange={handleChange}
                        name="mental"
                      />
                    }
                    label="Mental Health"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={_onSubmit}
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
