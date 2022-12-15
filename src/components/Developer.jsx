import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeveloperService from '../service/DeveloperService';

export default function Developer(props) {
    let [developers, setDevelopers] = React.useState([{
        name: '',
        lastName: '',
        email: 'Kullanıcı bulunamadı',
        title: '',
        department: '',
        birthDate: '',
        id: ''
    }]);

    React.useEffect(() => {
        let developerService = new DeveloperService();
        developerService.getDevelopers()
            .then((result) => setDevelopers(result.data));
            console.log(developers)
      }, [developers]);

    const handleDelete = (id) => {
        let developerService = new DeveloperService();
        developerService.deleteDeveloper(id);
      } 

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Ad</TableCell>
            <TableCell>Soyad</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Departman</TableCell>
            <TableCell>Doğum tarihi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {developers.map((developer) => (
          <TableRow
              key={developer.id}
          >
            <TableCell component="th" scope="row">
                {developer.id}{console.log(developer)}
              </TableCell>
            <TableCell>{developer.name}</TableCell>
            <TableCell>{developer.lastName}</TableCell>
            <TableCell>{developer.email}</TableCell>
            <TableCell>{developer.title}</TableCell>
            <TableCell>{developer.department}</TableCell>
            <TableCell>{props.toStringFromDate(developer.birthDate ?? " ")}</TableCell>
            <TableCell>
              <Link to={`/profil/${developer.id}`} color="warning">
              {developer.id !== '' && <EditIcon />}
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(developer.id)} color="error" >
              {developer.id !== '' && <CloseIcon />}
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}
