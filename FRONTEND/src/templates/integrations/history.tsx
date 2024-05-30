import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Deposits from "../dashboard/Deposits";
import APIDeposits from "../dashboard/APIDeposits";
import { fetchLatestCityData } from "../../../api/fetchData";
import WeatherData from "../../../api/types";
import { Title } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

const History = () => {
  const [data, setData] = React.useState<WeatherData[]>([]);
  const { city, page, limit } = useParams();
  const navigate = useNavigate();

  let pageNumber = Number(page) ?? 1;
  let limitNumber = Number(limit) ?? 15;

  React.useEffect(() => {
    fetchLatestCityData(city, page, limit)
      .then((fetchedData: WeatherData[]) => {
        if (!Array.isArray(fetchedData)) {
          console.error(
            "Expected fetchedData to be an array, got:",
            fetchedData
          );
          return; // Exit early if fetchedData is not an array
        }

        fetchedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        const groupedData: { [key: string]: WeatherData } = {};
        fetchedData.forEach((entry) => {
          const date = new Date(entry.date);
          const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          const key = `${formattedDate} ${entry.city}`;
          if (!groupedData[key]) {
            groupedData[key] = entry;
          }
        });

        setData(Object.values(groupedData));
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, [city, pageNumber, limitNumber]);

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
                    <React.Fragment>
                      <Title>{`Current conditions in ${city}`}</Title>
                      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
                        <Table aria-label="simple table" size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>Date/Time</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>City</TableCell>
                              <TableCell>Soil Moisture</TableCell>
                              <TableCell>Humidity</TableCell>
                              <TableCell>Temperature</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.map((row: any) => (
                              <TableRow key={row.id}>
                                <TableCell>
                                  {new Date(row.date).toLocaleDateString()}{" "}
                                  {new Date(row.date).toLocaleTimeString()}
                                </TableCell>
                                <TableCell>{row.country}</TableCell>
                                <TableCell>{row.city}</TableCell>
                                <TableCell>
                                  {parseFloat(row.soilMoisture).toFixed(2)} %
                                </TableCell>
                                <TableCell>
                                  {parseFloat(row.humidity).toFixed(2)}%
                                </TableCell>
                                <TableCell>
                                  {parseFloat(row.temperature).toFixed(2)} °C
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[15, 20, 30]}
                        component="div"
                        count={data.length}
                        rowsPerPage={limitNumber}
                        page={pageNumber}
                        onPageChange={(_event, newPage) =>
                          navigate(`/history/${city}/${newPage}/${limitNumber}`)
                        }
                        onRowsPerPageChange={(event) => {
                          let newLimit = parseInt(event.target.value, 10);
                          navigate(`/history/${city}/${page}/${newLimit}`);
                        }}
                      />
                    </React.Fragment>
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
