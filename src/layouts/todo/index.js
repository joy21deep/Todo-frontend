import React, { useState,useContext,useEffect } from 'react';
import Grid from "@mui/material/Grid";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ModalForm from '../dashboard/modal';
import { AuthContext } from 'context';


const TaskManager = () => {
  const token = localStorage.getItem("token");
  const authContext = useContext(AuthContext);
  function getMondayAndFriday(desiredDate) {
    const date = new Date(desiredDate);
    const dayOfWeek = date.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffToMonday);

    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4);

    return [monday, friday];
}
function getCurrentMonthDates() {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    firstDate: firstDay,
    lastDate: lastDay
  };
}


// Example usage:
const dates = getCurrentMonthDates();
const desiredDate = new Date(); // Replace with your desired date
const [monday, friday] = getMondayAndFriday(desiredDate);
  useEffect(() => {
    if (!token) {
      authContext.checkAuth();
    }
  }, []);
  const [tasks, setTasks] = useState({ pending: [], successful: [] });
  const [filters, setFilters] = useState({ month: '', date: '', week: '' });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (task) => {
    console.log('Task saved:', task);
  };

  useEffect(() => {
    const fetchedTasks = {
      pending: [
        {
          id: 1, title: 'Pending Task 1',
          description: "fcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbchhbgchhhhhhhhhhhhhhhhbchhbgc",
          dueDate: '2024-09-12', completionDate: null, status: 'pending'
        },
        {
          id: 2, title: 'Pending Task 2', description: "fcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbchhbgc",
          dueDate: '2024-09-12', completionDate: null, status: 'pending'
        }
      ],
      successful: [
        { id: 3, title: 'Successful Task 1', description: "fcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbchhbgc", dueDate: '2024-06-12', completionDate: '2024-07-16', status: 'completed' }
      ]
    };
    setTasks(fetchedTasks);
  }, [filters]);

  const handleCheckboxChange = (event, taskId) => {
    // Handle checkbox change
  };

  const handleDeleteOptionChange = (event, taskId) => {
    // Handle delete option change
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>

        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="info" onClick={handleOpen}>
              Create Task
            </Button>
            <ModalForm open={open} handleClose={handleClose} handleSave={handleSave} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, alignItems: 'flex-end', float: "right" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                  <DemoItem label="Select DateRange" component="DateRangePicker">
                    <DateRangePicker calendars={1} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <Button variant="contained" color="info">
                Month
              </Button><Button variant="contained" color="info" >
                Weakly
              </Button><Button variant="contained" color="info" >
                Today
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

          <Accordion sx={{ borderRadius: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Pending Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button variant="contained" color="success" sx={{ mr: 1 }}>Complete</Button>
                <Button variant="contained" color="error" sx={{ mr: 1 }}>Hard Delete</Button>
                <Button variant="contained" color="primary">Soft Delete</Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={{ backgroundColor: "#626277", display: "contents" }}>
                    <TableRow >
                      <TableCell sx={{ color: "white", fontSize: 20 }}>Task</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }}>Description</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }}>Due Date</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.pending.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <FormControlLabel
                            control={<Checkbox checked={true} />}
                            label={row.title}
                          />
                        </TableCell>
                        <TableCell style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {row.description}
                        </TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>
                          <Typography color={row.status === "pending" ? "error" : "inherit"}>
                            {row.status}
                          </Typography>
                        </TableCell>

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

          <Accordion sx={{ borderRadius: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Successful Tasks</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead sx={{ backgroundColor: "#626277", display: "contents" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontSize: 20 }}>Task</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }} >Description</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }} >Due Date</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }} >Completion Date</TableCell>
                      <TableCell sx={{ color: "white", fontSize: 20 }} >Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tasks.successful.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                          {task.description}
                        </TableCell>
                        <TableCell >{task.dueDate}</TableCell>
                        <TableCell >{task.completionDate}</TableCell>
                        <TableCell>
                          <Typography color={task.status === "completed" ? "green" : "inherit"}>
                            {task.status}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default TaskManager;

