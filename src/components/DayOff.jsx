import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import DayOffService from '../service/DayOffService';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

export default function DayOff(props) {
    let [dayOffs, setDayOffs] = React.useState([{
        dayOffType: '',
        startDate: '',
        endDate: '',
        comment: 'İzin bulunamadı',
        id: ''
    }]);

    React.useEffect(() => {
        let dayOffService = new DayOffService();
        dayOffService.getDayOffs()
            .then((result) => setDayOffs(result.data));
            console.log(dayOffs)
      }, [dayOffs]);

    const handleDelete = (id) => {
        let dayOffService = new DayOffService();
        dayOffService.deleteDayOff(id);
      } 

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>İzin Tipi</TableCell>
            <TableCell>Başlangıç Tarihi</TableCell>
            <TableCell>Bitiş Tarihi</TableCell>
            <TableCell>İzin Açıklaması</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dayOffs.map((dayOff) => (
          <TableRow
              key={dayOff.id}
          >
            <TableCell component="th" scope="row">
                {dayOff.id}{console.log(dayOff)}{console.log(props.toStringFromDate(dayOff.startDate))}
              </TableCell>
            <TableCell>{dayOff.dayOffType}</TableCell>
            <TableCell>{props.toStringFromDate(dayOff.startDate)}</TableCell>
            <TableCell>{props.toStringFromDate(dayOff.endDate)}</TableCell>
            <TableCell>{dayOff.comment}</TableCell>
            <TableCell>
              <Link to={`/izin/${dayOff.id}`} color="warning">
              {dayOff.id !== '' && <EditIcon />}
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(dayOff.id)} color="error" >
              {dayOff.id !== '' && <CloseIcon />}
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}
