import { Button, Modal } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import DayOff from '../components/DayOff';
import Developer from '../components/Developer';
import Expense from '../components/Expense';
import OverShift from '../components/OverShift';

export default function MainPage() {
    const [developer, setDeveloper] = React.useState(false);
    const handleDeveloperOpen = () => setDeveloper(true);
    const handleDeveloperClose = () => setDeveloper(false);

    const [dayOff, setDayOff] = React.useState(false);
    const handleDayOffOpen = () => setDayOff(true);
    const handleDayOffClose = () => setDayOff(false);

    const [expense, setExpense] = React.useState(false);
    const handleExpenseOpen = () => setExpense(true);
    const handleExpenseClose = () => setExpense(false);

    const [overShift, setOverShift] = React.useState(false);
    const handleOverShiftOpen = () => setOverShift(true);
    const handleOverShiftClose = () => setOverShift(false);

    const style = {
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: 1000,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const toStringFromDate = (msg) => {
        let newFormat = msg.toString().replace( /(\d{4})(\d{2})(\d{2})/, "$1/$2/$3" ).split("-");
        newFormat = newFormat[2] + "/" + newFormat[1] + "/" + newFormat[0]
        return newFormat;
      }

  return (

    <div>
        <h1>Hello</h1> 

        <Button onClick={handleDeveloperOpen}>  Çalışanlar </Button>
        <Button onClick={handleDayOffOpen}> İzinler </Button>
        <Button onClick={handleExpenseOpen}>  Harcamalar </Button>
        <Button onClick={handleOverShiftOpen}>  Mesailer </Button>

        <Modal
            open={developer}
            onClose={handleDeveloperClose}>
            <Box sx={style}>
                <Developer toStringFromDate={toStringFromDate}/>
            </Box>
        </Modal>

        <Modal
            open={dayOff}
            onClose={handleDayOffClose}>
            <Box sx={style}>
                <DayOff toStringFromDate={toStringFromDate}/>
            </Box>
        </Modal>

        <Modal
            open={expense}
            onClose={handleExpenseClose}>
            <Box sx={style}>
                <Expense toStringFromDate={toStringFromDate}/>
            </Box>
        </Modal>

        <Modal
            open={overShift}
            onClose={handleOverShiftClose}>
            <Box sx={style}>
                <OverShift toStringFromDate={toStringFromDate}/>
            </Box>
        </Modal>


    </div>
  )
}
