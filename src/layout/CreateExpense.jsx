import React from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import ExpenseService from '../service/ExpenseService';

export default function CreateExpense() {
    const navigate = useNavigate();

    let [expense, setExpense] = React.useState({
        expenseType: '',  // Enum
        amount: 0,
        billDate: new Date(),
        comment: '',
        devId: 1
      });

    const expenseTypes = [
        "FOOD", 
        "EDUCATION", 
        "TRANSPORT"
    ];

    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(expense);
        setExpense(prevState => {
          return {
          ...prevState,
          [name]: value
        };
      });
      console.log(expense);
      }
      const handleSubmit = event => {
        event.preventDefault();
        let expenseService = new ExpenseService();
        expenseService.createExpense(expense)
        .then(() => navigate("/"))
        .catch((error) => console.log(error));
    };

    return (
        <div className="main-content">
          <form onSubmit={handleSubmit}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <h1 style={{ textAlign: "start" }}>Harcama Oluştur</h1>
              <Grid container spacing={3}>
              <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="expenseType-label">İzin tipi</InputLabel>
                <Select
                  labelId="expenseType-label"
                  id="expenseType"
                  name="expenseType"
                  required
                  value={expense.expenseType ?? " "}
                  label="İzin tipi"
                  onChange={handleChange}
                >
                {expenseTypes.map((typeName, index) => (
                  <MenuItem key={index} value={index}>{typeName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="Harcama miktarı"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DesktopDatePicker
                    label="Fiş tarihi"
                    value={expense.billDate}
                    inputFormat="DD-MM-YYYY"
                    onChange={(nValue) => handleChange({target:{name:'billDate', value: nValue}})}
                    renderInput={(params) => <TextField {...params} />}
                  />{" "}
                </Grid>
  
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="comment"
                    name="comment"
                    label="Harcama Açıklaması"
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