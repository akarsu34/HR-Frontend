import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseService from '../service/ExpenseService';

export default function Expense(props) {
    let [expenses, setExpenses] = React.useState([{
        expenseType: '',
        amount: '',
        billDate: '',
        comment: 'Harcama bulunamadı',
        id: ''
    }]);

    React.useEffect(() => {
        let expenseService = new ExpenseService();
        expenseService.getExpenses()
            .then((result) => setExpenses(result.data));
            console.log(expenses)
      }, [expenses]);

    const handleDelete = (id) => {
        let expenseService = new ExpenseService();
        expenseService.deleteExpense(id);
      } 

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Harcama Tipi</TableCell>
            <TableCell>Harcama Miktarı</TableCell>
            <TableCell>Harcama Tarihi</TableCell>
            <TableCell>Harcama Açıklaması</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            
          <TableRow
              key={expense.id}
          >
            <TableCell component="th" scope="row">
                {expense.id}{console.log(expense)}
              </TableCell>
            <TableCell>{expense.expenseType}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{props.toStringFromDate(expense.billDate)}</TableCell>
            <TableCell>{expense.comment}</TableCell>
            <TableCell>
              <Link to={`/harcama/${expense.id}`} color="warning">
              {expense.id !== '' && <EditIcon />}
              </Link>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(expense.id)} color="error" >
              {expense.id !== '' && <CloseIcon />}
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
  )
}
