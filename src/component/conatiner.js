import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import BasicTable from "./table";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <h1>Hello world</h1>
        <BasicTable />
      </Container>
    </React.Fragment>
  );
}
