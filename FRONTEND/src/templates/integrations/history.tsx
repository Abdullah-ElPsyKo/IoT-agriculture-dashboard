import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "../dashboard/Deposits";
import Orders from "../dashboard/Orders";
import APIDeposits from "../dashboard/APIDeposits";
// import Chart from "../dashboard/Chart";

const defaultTheme = createTheme();

const History: React.FC = () => {
  return (
    <div>
      {" "}
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* HISTORY IN COMMENT FOR JOHN. If you can make this history chart only fetch the data from the selected location.
              Check orders.tsx on how to filter on selected location if you need help. Starting at line 40 */}
                {/* <Grid item xs={12} md={6} lg={7}>
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
              </Grid> */}

                <Grid item xs={12} md={3} lg={3.3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 345,
                    }}
                  >
                    <Deposits showAllData={true} isHistoryPage={true} />
                  </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={2.5}>
                  <Paper>
                    <APIDeposits />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders showCurrentCityOnly={true} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default History;
