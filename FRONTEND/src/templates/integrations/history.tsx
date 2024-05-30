import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { fetchLatestCityData } from '../../../api/fetchData';
import WeatherData from "../../../api/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const defaultTheme = createTheme();

const History = () => {
  const [data, setData] = React.useState<WeatherData[]>([]);
  const [totalCount, setTotalCount] = React.useState(0);
  const { city, page, limit } = useParams<{
    city: string;
    page?: string;
    limit?: string;
  }>();
  const navigate = useNavigate();

  const pageNumber = parseInt(page || "1", 10); // Default to '1' if page is undefined
  const limitNumber = parseInt(limit || "15", 10); // Default to '15' if limit is undefined

  React.useEffect(() => {
    if (city) {
      fetchLatestCityData(city, pageNumber, limitNumber)
        .then((response) => {
          setData(response.data);
          setTotalCount(response.totalCount);
        })
        .catch((error: Error) => console.error("Failed to fetch data:", error));
    }
  }, [city, pageNumber, limitNumber]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    navigate(`/history/${city}/${newPage + 1}/${limitNumber}`);
  };

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newLimit = parseInt(event.target.value, 10);
    navigate(`/history/${city}/1/${newLimit}`);
  };

  return (
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <h1
                      style={{ fontWeight: "bold" }}
                    >{`Weather History in ${city}`}</h1>
                  </div>
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
                        {data.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>
                              {new Date(row.date).toLocaleDateString()}{" "}
                              {new Date(row.date).toLocaleTimeString()}
                            </TableCell>
                            <TableCell>{row.country}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>
                              {parseFloat(row.soilMoisture).toFixed(2)}%
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
                    count={totalCount}
                    rowsPerPage={limitNumber}
                    page={pageNumber - 1} // Adjust for zero-based index expected by Material-UI TablePagination
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default History;
