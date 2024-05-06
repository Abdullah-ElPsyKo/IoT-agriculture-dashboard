import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Deposits = () => {
  return (
    <React.Fragment>
      <Title>Current Weather, {"country city"}</Title>
      <Typography component="p" variant="h4">
        ?
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {"date"}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View history
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;