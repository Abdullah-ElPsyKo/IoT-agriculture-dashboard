import { Typography } from "@mui/material";

const Error = ({ error }: { error: any }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" style={{ color: "red" }}>
        Error!
      </Typography>
      <Typography variant="h5">{error.message}</Typography>
    </div>
  );
};

export default Error;
