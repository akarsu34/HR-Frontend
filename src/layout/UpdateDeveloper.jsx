import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from 'react'
import DeveloperService from '../service/DeveloperService';
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

export default function UpdateDeveloper() {
    const navigate = useNavigate();
    let { devId } = useParams();


    let [developer, setDeveloper] = React.useState({
        name: '',
        lastName: '',
        email: '',
        title: '',
        department: '',
        birthDate: new Date(),
        address: ''
    });

    const departments = [
        "WEB_SOFTWARE",
        "WEB_DESIGN",
        "PROGRAMMING", 
        "ARGE"
    ];

    const titles = [
        "JUNIOR", 
        "MID_LEVEL", 
        "SENIOR"
    ]

    React.useEffect(() => {
        let developerService = new DeveloperService();
        developerService.getDeveloper(devId)
            .then((result) => setDeveloper(result.data));
      }, [devId]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(developer);
        setDeveloper(prevState => {
          return {
          ...prevState,
          [name]: value
        };
      });
      console.log(developer);
      }
      const handleSubmit = event => {
        event.preventDefault();
        let developerService = new DeveloperService();
        developerService.updateDeveloper(devId, developer)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    };

  return (
    <div className="main-content">
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h1 style={{ textAlign: "start" }}>Profilim</h1>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="İsim"
                value={developer.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Soyisim"
                value={developer.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-posta adresi"
                value={developer.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DesktopDatePicker
                id="birthDate"
                name="birthDate"
                label="Doğum günü"
                inputFormat="DD-MM-YYYY"
                value={developer.birthDate}
                onChange={(nValue) => handleChange({target:{name:'birthDate', value: nValue}})}
                renderInput={(params) => <TextField {...params} />}
              />{" "}
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="developerTitle-label">Rol</InputLabel>
                <Select
                  labelId="title-label"
                  id="title"
                  name="title"
                  required
                  value={developer.title ?? " "}
                  label="Title"
                  onChange={handleChange}
                >

                {titles.map((titleName, index) => (
                  <MenuItem key={index} value={titleName}>{titleName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Departman</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  required
                  value={developer.department ?? " "}
                  label="Departman"
                  onChange={handleChange}
                >
                {departments.map((departmentName, index) => (
                  <MenuItem key={index} value={departmentName}>{departmentName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                name="address"
                label="Adres"
                value={developer.address}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={6}>
              <Button
                color="success"
                variant="contained"
                fullWidth
                type="submit"
                sx={{ height: 55 }}
              >
                Güncelle
              </Button>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
    </div>
  );
}