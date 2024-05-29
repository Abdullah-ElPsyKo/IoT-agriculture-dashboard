import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Navbar from "../../components/Navbar";
import {
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const defaultTheme = createTheme();

const Integrations: React.FC = () => {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
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
            <Container maxWidth="lg">
              <iframe
                src="https://www.meteoblue.com/en/weather/maps/widget/basel_switzerland_2661604?windAnimation=0&windAnimation=1&gust=0&gust=1&satellite=0&satellite=1&cloudsAndPrecipitation=0&cloudsAndPrecipitation=1&temperature=0&temperature=1&sunshine=0&sunshine=1&extremeForecastIndex=0&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
                title="Weather Widget"
                width="100%"
                height="550"
                frameBorder="0"
                scrolling="no"
                allowTransparency
                sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
              ></iframe>
              <div>
                {/* DO NOT REMOVE THIS LINK */}
                <a
                  href="https://www.meteoblue.com/en/weather/maps/basel_switzerland_2661604?utm_source=weather_widget&utm_medium=linkus&utm_content=map&utm_campaign=Weather%2BWidget"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#000000", fontSize: "12px" }}
                >
                  meteoblue
                </a>
              </div>
            </Container>
            <Divider className="w-6/12" />
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
              <div
                className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
              <div
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                  <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    How To Use
                  </h2>
                  <div className="mt-6 text-lg leading-8 text-gray-300">
                    <h3 className="text-3xl font-semibold text-white">
                      Guide for Farmers on Using the Weather Radar
                    </h3>
                    <p className="mt-4">
                      This guide will help you extract relevant information from
                      the weather radar, enabling you to make better-informed
                      decisions for your farming activities. We will focus on
                      three key components: Wind Animation, Clouds &
                      Precipitation, and Temperature. Below you will find a
                      detailed explanation of each component and how to
                      interpret the corresponding legends.
                    </p>

                    <Accordion className="mt-6">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className="text-xl font-semibold text-black">
                          1. Wind Animation
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            How to use:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Selection:</strong> Click on the "Wind
                              Animation" option in the menu on the right.
                            </li>
                            <li>
                              <strong>Display:</strong> You can choose between
                              different animation displays, such as "Rainbow" or
                              "Cold/Warm".
                            </li>
                            <li>
                              <strong>Height:</strong> Set the height (e.g., 10
                              m above ground) to view wind speed at that
                              altitude.
                            </li>
                          </ul>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            Interpreting the Legend:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Wind Speed (km/h):</strong> The colors on
                              the map correspond to wind speeds, as shown in the
                              legend on the left. For example:
                            </li>
                            <ul className="ml-6">
                              <li className="text-cyan-500">
                                Light Blue: 5-10 km/h
                              </li>
                              <li className="text-green-500">
                                Green: 20-35 km/h
                              </li>
                              <li className="text-yellow-500">
                                Yellow: 55-70 km/h
                              </li>
                              <li className="text-purple-500">
                                Purple: 100-120 km/h
                              </li>
                            </ul>
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className="mt-6">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                      >
                        <Typography className="text-xl font-semibold text-Black">
                          2. Clouds and Precipitation
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            How to use:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Selection:</strong> Click on the "Clouds &
                              Precipitation" option in the menu on the right.
                            </li>
                            <li>
                              <strong>Display:</strong> The map will show cloud
                              cover and precipitation intensity.
                            </li>
                          </ul>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            Interpreting the Legend:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Precipitation (mm):</strong> The colors on
                              the map correspond to the amount of precipitation
                              in millimeters. For example:
                            </li>
                            <ul className="ml-6">
                              <li className="text-cyan-500">
                                Light Blue: 0.25-0.5 mm
                              </li>
                              <li className="text-green-500">Green: 3-5 mm</li>
                              <li className="text-yellow-500">
                                Yellow: 10-15 mm
                              </li>
                              <li className="text-red-500">Red: 25-30 mm</li>
                            </ul>
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>

                    <Accordion className="mt-6">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                      >
                        <Typography className="text-xl font-semibold text-black">
                          3. Temperature
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            How to use:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Selection:</strong> Click on the
                              "Temperature" option in the menu on the right.
                            </li>
                            <li>
                              <strong>Display:</strong> The map will show the
                              temperature distribution.
                            </li>
                          </ul>
                          <h5 className="text-lg font-semibold text-black mt-4">
                            Interpreting the Legend:
                          </h5>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              <strong>Temperature (°C):</strong> The colors on
                              the map correspond to the temperature values. For
                              example:
                            </li>
                            <ul className="ml-6">
                              <li className="text-cyan-500">
                                Light Blue: -10 to 0°C
                              </li>
                              <li className="text-green-500">
                                Green: 10 to 20°C
                              </li>
                              <li className="text-yellow-500">
                                Yellow: 30 to 40°C
                              </li>
                              <li className="text-red-500">Red: 50 to 60°C</li>
                            </ul>
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion className="mt-6">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4a-content"
                        id="panel4a-header"
                      >
                        <Typography className="text-xl font-semibold text-black">
                          General Tips
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          <ul className="list-disc list-inside mt-2">
                            <li>
                              Updating the Map: Ensure the map is updated
                              regularly to get the most current information.
                            </li>
                            <li>
                              Specific Regions: Zoom into specific regions for
                              more detailed information.
                            </li>
                            <li>
                              Planning: Use this information to plan activities
                              such as planting, irrigation, and harvesting based
                              on weather conditions.
                            </li>
                          </ul>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default Integrations;
