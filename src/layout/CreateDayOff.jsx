import React from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DayOffService from '../service/DayOffService';
import { useNavigate } from "react-router-dom";

export default function CreateDayOff() {
    const navigate = useNavigate();

    let [dayOff, setDayOff] = React.useState({
        dayOffType: '',  // Enum
        startDate: new Date(),
        endDate: new Date(),
        comment: '',
        devId: ''
      });

    const dayOffTypes = [
    "ANNUAL_LEAVE", 
    "PAID_LEAVE", 
    "UNPAID_LEAVE"
    ];

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(dayOff);
        setDayOff(prevState => {
          return {
          ...prevState,
          [name]: value
        };
      });
      console.log(dayOff);
      }
      const handleSubmit = event => {
        event.preventDefault();
        let dayOffService = new DayOffService();
        dayOffService.createDayOff(dayOff)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    };

    return (
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h1 style={{ textAlign: "start" }}>İzin Oluştur</h1>
              <Grid container spacing={3}>
              <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="dayOffType-label">İzin tipi</InputLabel>
                <Select
                  labelId="dayOffType-label"
                  id="dayOffType"
                  name="dayOffType"
                  required
                  value={dayOff.dayOffType ?? " "}
                  label="İzin tipi"
                  onChange={handleChange}
                >
                {dayOffTypes.map((typeName, index) => (
                  <MenuItem key={index} value={index}>{typeName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Başlangıç tarihi"
                    inputFormat="DD-MM-YYYY"
                    value={dayOff.startDate}
                    onChange={(nValue) => handleChange({target:{name:'startDate', value: nValue}})}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </Grid>
  
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Bitiş tarihi"
                    inputFormat="DD-MM-YYYY"
                    value={dayOff.endDate}
                    onChange={(nValue) => handleChange({target:{name:'endDate', value: nValue}})}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="comment"
                    name="comment"
                    label="İzin Açıklaması"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    id="devId"
                    name="devId"
                    label="Developer id"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="success"
                    type="submit"
                    sx={{ height: 55 }}
                  >
                    Oluştur
                  </Button>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </form>
        </div>
      );
      }