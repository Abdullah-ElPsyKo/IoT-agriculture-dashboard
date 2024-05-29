import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import Navbar from "../../components/Navbar";
import Chart from "./Chart";
import Deposits from "./Deposits";
import APIDeposits from "./APIDeposits";
import Orders from "./Orders";

interface DashboardProps {
  data: any;
  error?: Error; // Make error prop optional
}

const Dashboard = ({ error }: DashboardProps) => {
  console.log("error:", error);

  return (
    <div>
      <Navbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={7}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 345,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={2.5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 345,
                }}
              >
                <Deposits />
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={2.5}>
              <Paper>
                <APIDeposits />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
