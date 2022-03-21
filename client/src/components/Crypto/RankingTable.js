import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Box, Container } from "@mui/material";
import { Grid, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
    fontWeight: 20,
    backgroundColor: "black",
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    fontWeight: 500,
    paddingLeft: 20,
    fontFamily: "Bree Serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#D2F6C5",
    paddingBottom: "20px",
    paddingRight: "20px",
    align: "center",
  },
}));

const StyledTableRow2 = styled(TableRow)(({ theme }) => ({
  "&:first-child td, &:first-child th": {
    paddingTop: 20,
    paddingBottom: 30,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f8e4e6",
    paddingBottom: "20px",
    paddingRight: "20px",
    align: "center",
  },
}));

function createData(name, detail, change) {
  return { name, detail, change };
}

export default function CustomizedTables({ loading, list }) {
  console.log(loading);
  console.log(list);
  let navigate = useNavigate();
  return (
    <>
      <Grid
        container
        xs={{ minWidth: "100px" }}
        display="flex"
        alignItems="center"
        justify="center"
        style={{
          padding: "1% 0",
          overflowX: "hidden",
          gap: "50px",
        }}
      >
        <Grid style={{ width: "500px" }}>
          <Container style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              style={{
                margin: 18,
                fontFamily: "League Spartan",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Biggest Gainers
            </Typography>
          </Container>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <TableContainer
              component={Paper}
              style={{
                width: "100%",
                minWidth: "100px",
              }}
              xs={{ maxWidth: "200px" }}
            >
              <Box
                id="header-box"
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#FFCE45",
                  color: "black",
                  fontSize: "1.1rem",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                }}
              >
                <Box>RANK</Box>
                <Box> COIN NAME </Box>
                <Box> 24H CHANGE</Box>
              </Box>
              <Table
                aria-label="customized table"
                borderRadius="150"
                style={{ padding: "0 10%", margin: "0" }}
              >
                <TableBody>
                  {list[0].map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow
                        key={row.id}
                        display="flex"
                        justifyContent="space-between"
                        style={{
                          justifyContent: "space-around",
                          cursor: "pointer",
                        }}
                        onClick={(e) =>
                          navigate(`/details/crypto/${row.symbol}`, {
                            state: row,
                          })
                        }
                      >
                        <StyledTableCell
                          flexDirection="column"
                          align="center"
                          style={{ paddingLeft: "3rem" }}
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          // justifyContent="space-between"
                          // alignItems="center"
                          align="right"
                          style={{
                            display: "flex",
                            padding: "2rem",
                            paddingLeft: "1.7rem",
                            paddingRight: "0",
                          }}
                        >
                          <Avatar
                            alt="Icon"
                            variant="rounded"
                            src={row?.image}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          style={{ paddingLeft: "0.8rem", paddingRight: "0" }}
                        >
                          {row.name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{
                            color: "#3dae23",
                            paddingLeft: "1rem",
                            paddingRight: "2rem",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>

        <Grid style={{ width: "500px" }}>
          <Container style={{ textAlign: "center" }}>
            <Typography
              variant="h3"
              style={{
                margin: 18,
                fontFamily: "League Spartan",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Biggest Losers
            </Typography>
          </Container>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <TableContainer
              component={Paper}
              style={{
                width: "100%",
                minWidth: "100px",
              }}
              xs={{ maxWidth: "200px" }}
            >
              <Box
                id="header-box"
                style={{
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-around",
                  backgroundColor: "#FFCE45",
                  color: "black",
                  fontSize: "1.1rem",
                  fontFamily: "League Spartan",
                  fontWeight: "bold",
                }}
              >
                <Box>RANK</Box>
                <Box>COIN NAME</Box>
                <Box> 24H CHANGE</Box>
              </Box>
              <Table
                aria-label="customized table"
                borderRadius="150"
                style={{ padding: "0 10%", margin: "0" }}
              >
                <TableBody>
                  {list[1].map((row, index) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <StyledTableRow2
                        key={row.id}
                        display="flex"
                        justifyContent="space-between"
                        style={{
                          justifyContent: "space-around",
                          cursor: "pointer",
                        }}
                        onClick={(e) =>
                          navigate(`/details/crypto/${row.symbol}`, {
                            state: row,
                          })
                        }
                      >
                        <StyledTableCell
                          flexDirection="column"
                          align="center"
                          style={{ paddingLeft: "3rem" }}
                        >
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="right"
                          style={{
                            display: "flex",
                            padding: "2rem",
                            paddingLeft: "1.7rem",
                            paddingRight: "0",
                          }}
                        >
                          <Avatar
                            alt="Icon"
                            variant="rounded"
                            src={row?.image}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          style={{
                            paddingLeft: "0.8rem",
                            paddingRight: "0",
                          }}
                        >
                          {row.name}
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          style={{
                            color: "#e8464a",
                            paddingLeft: "1rem",
                            paddingRight: "2rem",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </StyledTableCell>
                      </StyledTableRow2>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
}
