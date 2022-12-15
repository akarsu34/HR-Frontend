import React from 'react'
import { Button, Grid, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import OverShiftService from '../service/OverShiftService';

export default function CreateOverShift() {
    const navigate = useNavigate();

    let [overShift, setOverShift] = React.useState({
        hourtotime: 0,
        overShiftDate: new Date(),
        comment: '',
        devId: 1
      });


    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(overShift);
        setOverShift(prevState => {
          return {
          ...prevState,
          [name]: value
        };
      });
      console.log(overShift);
      }
      const handleSubmit = event => {
        event.preventDefault();
        let overShiftService = new OverShiftService();
        overShiftService.createOverShift(overShift)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    };
    return (
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h1 style={{ textAlign: "start" }}>Mesai Oluştur</h1>
              <Grid container spacing={3}>
              

            <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="hourtotime"
                    name="hourtotime"
                    label="Mesai miktarı"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Fiş tarihi"
                    inputFormat="DD-MM-YYYY"
                    value={overShift.overShiftDate}
                    onChange={(nValue) => handleChange({target:{name:'overShiftDate', value: nValue}})}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="comment"
                    name="comment"
                    label="Mesai Açıklaması"
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