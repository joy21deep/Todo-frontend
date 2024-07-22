/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import React, { useState ,useContext,useEffect} from 'react';
import { Tooltip, Typography, Box } from '@mui/material';
import ReactCalendar from 'react-calendar';
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; 
import { AuthContext } from 'context';

function Dashboard() {
  const token = localStorage.getItem("token");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!token) {
      authContext.checkAuth();
    }
  }, []);
  const sampleTasks = [
    { id: 1, date: '2024-07-18', title: 'Task 1' },
    { id: 2, date: '2024-07-18', title: 'Task 2' },
    { id: 3, date: '2024-07-19', title: 'Task 3' },
    { id: 4, date: '2024-07-12', title: 'Task 8' },
    { id: 5, date: '2024-07-12', title: 'Task 9' },
    { id: 6, date: '2024-07-30', title: 'Task 11' },
    { id: 7, date: '2024-07-15', title: 'Task 1' },
    { id: 8, date: '2024-07-20', title: 'Task 4' },
    { id: 9, date: '2024-08-20', title: 'Task 5' },
    { id: 10, date: '2024-06-22', title: 'Task 6' },
    { id: 11, date: '2023-12-20', title: 'Task 7 ' },
  ];
  const { sales, tasks } = reportsLineChartData;
  const [value, setValue] = useState(new Date());

  const handleDateChange = date => {
    setValue(date);
  };
  const isCurrentMonth = date => {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };

  const normalizeDate = (date) => date.toISOString().split('T')[0];

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const normalizedDate = normalizeDate(date);
      const tasksForDate = sampleTasks.filter(task => normalizeDate(new Date(task.date)) === normalizedDate);
      if (tasksForDate.length > 0) {
        return 'highlight';
      }
    }
    return '';
  };
  
  const getTileContent = ({ date, view }) => {
    if (view === 'month') {
      const normalizedDate = normalizeDate(date);
      const tasksForDate = sampleTasks.filter(task => normalizeDate(new Date(task.date)) === normalizedDate);
      if (tasksForDate.length > 0) {
        return (
          <Tooltip title={`Tasks: ${tasksForDate.length}`} arrow>
            <span className="calendar-tile-content">{tasksForDate.length}</span>
          </Tooltip>
        );
      }
    }
    return null;
  };
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox py={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <MDBox mb={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Bookings"
                  count={281}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Today's Users"
                  count="2,300"
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ComplexStatisticsCard
                  color="success"
                  icon="store"
                  title="Revenue"
                  count="34k"
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <MDBox mb={1.5}>
            <Typography variant="h6" gutterBottom>Tasks Calendar</Typography>
            <ReactCalendar
              onChange={handleDateChange}
              value={value}
              tileClassName={getTileClassName}
              tileContent={getTileContent}
              className="custom-calendar" // Apply custom styling
              style={{
                backgroundColor: '#f5f5f5', // Replace with your desired background color
                borderRadius: '8px',
                padding: '10px',
              }}
           />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  </DashboardLayout>
  );
}

export default Dashboard;
