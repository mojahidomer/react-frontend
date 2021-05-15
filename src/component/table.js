import React, { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
// import TableRow from '@material-ui/core/TableRow';

import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from "@material-ui/core/styles";

import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StyledTableCell = withStyles((theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 16,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onChangePage: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

export default function BasicTable() {
  const classes = useStyles();
  const [dataFetch, setDataFetch] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataFetch.length - page * rowsPerPage);
  useEffect(async () => {
    let data = await axios({
      method: "get",
      url: "http://localhost/",
      "Content-Type": "application/json",
    });
    // alert("test");
    console.log(data.data.data);
    setDataFetch(() => data.data.data);
    // setPage(data.data.data.length);
  }, []);
  const sort = () => {
    alert("test");
    console.log(dataFetch);
    let sortedData = dataFetch.sort((a, b) => {
      //   console.log(a.name > b.name);
      if (a.name > b.name) {
        return -1;
      } else {
        return 1;
      }
    });
    // console.log(sortedData);
    // setDataFetch({ ...sortedData });
  };
  let i = 0;

  return (
    <>
      <button onClick={sort}> sort</button>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.NO</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell>levels</StyledTableCell>
              <StyledTableCell>format_description&nbsp;(g)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? dataFetch.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : dataFetch
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell>{i++}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.website}</TableCell>
                <TableCell>{row.levels}</TableCell>
                <TableCell>{row.format_description}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={dataFetch.length}
                page={page}
                onChangePage={handleChangePage}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}
