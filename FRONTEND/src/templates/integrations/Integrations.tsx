import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Navbar from "../../components/Navbar";
import { Divider } from "@mui/material";

const defaultTheme = createTheme();

const Integrations: React.FC = () => {
  return (
    <div>
      <Navbar />
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
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg">
              {/* Add your integration content here */}
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
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
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
