import React, { useState, useEffect } from 'react';
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
        { id: 1, title: 'Pending Task 1' },
        { id: 2, title: 'Pending Task 2' }
      ],
      successful: [
        { id: 3, title: 'Successful Task 1', completionDate: '2024-07-15' }
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
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flec-end', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
            <Typography variant="h6">Filters</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,alignItems: 'flex-end' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
            <Button variant="contained" color="info" onClick={handleOpen}>
              Create Task
            </Button>
            <ModalForm open={open} handleClose={handleClose} handleSave={handleSave} />
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
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.pending.map(task => (
                          <TableRow key={task.id}>
                            <TableCell>
                              <FormControlLabel
                                control={<Checkbox onChange={(event) => handleCheckboxChange(event, task.id)} />}
                                label={task.title}
                              />
                            </TableCell>
                            <TableCell>
                              <FormControl>
                                <Select onChange={(event) => handleDeleteOptionChange(event, task.id)}>
                                  <MenuItem value=""><em>None</em></MenuItem>
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
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Task</TableCell>
                          <TableCell>Completion Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tasks.successful.map(task => (
                          <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.completionDate}</TableCell>
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
