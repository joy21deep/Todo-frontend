import React, { useState, useEffect } from 'react';
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
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
import { Description } from '@mui/icons-material';

const TaskManager = () => {
  const [tasks, setTasks] = useState({ pending: [], successful: [] });
  const [filters, setFilters] = useState({ month: '', date: '', week: '' });
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (task) => {
    console.log('Task saved:', task);
    // You can add the task to your state or make an API call to save it
  };

  useEffect(() => {
    // Fetch data based on filters and segregate tasks
    // For demonstration, we're using sample data
    const fetchedTasks = {
      pending: [
        { id: 1, title: 'Pending Task 1', 
          description: "fcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhfcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbchhbgchhhhhhhhhhhhhhhhbchhbgc",
           dueDate: '2024-09-12', completionDate: null, status: 'pending' },
        { id: 2, title: 'Pending Task 2', description: "fcgbhghgbhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhbchhbgc",
           dueDate: '2024-09-12', completionDate: null, status: 'pending' }
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
        <Typography variant="h4" gutterBottom>
          Task Manager
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-end', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="info" onClick={handleOpen}>
              Create Task
            </Button>
            <ModalForm open={open} handleClose={handleClose} handleSave={handleSave} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
            <Typography variant="h6">Filters</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, alignItems: 'flex-end', float: "right" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateRangePicker']}>
                  <DemoItem label="1 calendar" component="DateRangePicker">
                    <DateRangePicker calendars={1} />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              <TextField
                label="Date"
                type="date"
                name="date"
                value={filters.date}
                onChange={handleFilterChange}
                InputLabelProps={{ shrink: true }}
                sx={{ marginBottom: 0 }} // Ensure no extra bottom margin
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Card>
            <CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Pending Tasks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#626277 !important" }}>
          <TableRow>
            <TableCell sx={{ color: "white !important", fontSize: 20 }}>Task</TableCell>
            <TableCell sx={{ color: "white !important", fontSize: 20 }}>
              Description
            </TableCell>
            <TableCell sx={{ color: "white !important", fontSize: 20 }}>
              Due Date
            </TableCell>
            <TableCell sx={{ color: "white !important", fontSize: 20 }}>Status</TableCell>
            <TableCell sx={{ color: "white !important", fontSize: 20 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.pending.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {" "}
                <FormControlLabel
                  control={<Checkbox checked={true} />}
                  label={row.title}
                />
              </TableCell>
              <TableCell
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {row.description}
              </TableCell>
              <TableCell>{row.dueDate}</TableCell>
              <TableCell>
                <Typography
                  color={row.status === "pending" ? "error" : "inherit"}
                >
                  {row.status}
                </Typography>
              </TableCell>
              <TableCell>
                <FormControl>
                  <Select
                    defaultValue=""
                    onChange={(event) =>
                      handleDeleteOptionChange(event, task.id)
                    }
                  >
                    <MenuItem value="completed">
                      <em> Completed</em>
                    </MenuItem>
                    <MenuItem value="softDelete">Soft Delete</MenuItem>
                    <MenuItem value="hardDelete">Hard Delete</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Successful Tasks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                      <TableHead sx={{ backgroundColor: "black", color: "white", fontSize: 14 }}>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Due Date</TableCell>
                          <TableCell align="right">Completion Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.successful.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell align="right"> <Typography variant="body1" component="div" style={{ whiteSpace: 'pre-line' }}>
                              {task.description}
                            </Typography></TableCell>
                            <TableCell align="right">{task.dueDate}</TableCell>
                            <TableCell align="right">{task.completionDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default TaskManager;
