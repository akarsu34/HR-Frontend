import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import OverShiftService from '../service/OverShiftService';

export default function OverShift(props) {
    let [overShifts, setOverShifts] = React.useState([{
        overShiftDate: '',
        hourtotime: '',
        comment: 'Mesai mevcut değil',
        id: ''
    }]);

    React.useEffect(() => {
        let overShiftService = new OverShiftService();
        overShiftService.getOverShifts()
            .then((result) => setOverShifts(result.data));
            console.log(overShifts)
      }, [overShifts]);

    const handleDelete = (id) => {
        let overShiftService = new OverShiftService();
        overShiftService.deleteOverShift(id);
      } 

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Mesai Miktarı</TableCell>
            <TableCell>Mesai Tarihi</TableCell>
            <TableCell>Mesai Açıklaması</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {overShifts.map((overShift) => ( 

            <TableRow
              key={overShift.id}
          >
            <TableCell component="th" scope="row">
                {overShift.id}{console.log(overShift)}
              </TableCell>

            <TableCell>{overShift.hourtotime}</TableCell>
            <TableCell>{props.toStringFromDate(overShift.overShiftDate)}</TableCell>
            <TableCell>{overShift.comment}</TableCell>
            <TableCell>
              <Link to={`/mesai/${overShift.id}`} color="warning">
                {overShift.id !== '' && <EditIcon />}
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(overShift.id)} color="error" >
              {overShift.id !== '' && <CloseIcon />}
              </Button>
            </TableCell>
          
          </TableRow>
        
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}
