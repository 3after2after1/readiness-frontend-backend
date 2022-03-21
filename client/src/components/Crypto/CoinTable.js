// import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import RankingTable from "./RankingTable";
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines";
import { BACKEND_DOMAIN } from "../../api/backend";

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [topGainLose, setTopGainLose] = useState([]);
  let navigate = useNavigate();

  const fetchCoins = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_DOMAIN}/crypto/table`);
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const initiateTopGainLose = () => {
    if (coins.length > 0) {
      setTopGainLose([
        [...coins].sort(dynamicSort("desc", "24h")).slice(0, 5),
        [...coins].sort(dynamicSort("asc", "24h")).slice(0, 5),
      ]);
    }
  };

  const dynamicSort = (order, interval) => {
    //sort table by asc/desc using interval
    let property = `price_change_percentage_${interval}_in_currency`;
    let sortOrder = order === "desc" ? -1 : 1;

    return function (a, b) {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    initiateTopGainLose();
  }, [coins]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const useStyles = makeStyles((theme) => ({
    row: {
      backgroundColor: "rgb(247, 247, 247)",
      cursor: "pointer",
      "&:hover": { backgroundColor: "#d3d3d3" },
      fontFamily: "Monstserrat",
      "& .hide": {
        "@media (max-width: 900px)": {
          display: "none",
        },
      },
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        backgroundColor: "#d3d3d3",
        color: "black",
      },
      "& .Mui-selected": {
        color: "black",
        fontWeight: "bold",
      },
    },
    head: {
      "& .hide": {
        "@media (max-width: 900px)": {
          display: "none",
        },
      },
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <div>
        <RankingTable loading={loading} list={topGainLose} />
      </div>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ typography: { sm: "body1", xs: "body2" } }}
          style={{
            margin: 18,
            fontFamily: "League Spartan",
            fontWeight: "bold",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a coin"
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer style={{ marginBottom: "1.3rem" }}>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead
                style={{
                  background: "#FFCE45",
                }}
              >
                <TableRow className={classes.head}>
                  {[
                    "COIN",
                    "PRICE",
                    "24H %",
                    "7D %",
                    "MARKET CAP",
                    "LAST 7 DAYS",
                  ].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "League Spartan",
                        fontSize: "1.2rem",
                      }}
                      // sx={{ display: { xs: "none", md: "block" } }}
                      key={head}
                      align={head === "Coin" ? "Left" : "center"}
                      className={
                        head.startsWith("LAST") || head.startsWith("7D")
                          ? "hide"
                          : ""
                      }
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1 - 5) * 6, (page - 1) * 6 + 6)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    const profit_7days =
                      row.price_change_percentage_7d_in_currency > 0;
                    return (
                      <TableRow
                        onClick={(e) =>
                          navigate(`/details/crypto/${row.symbol}`, {
                            state: row,
                          })
                        }
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 0,
                            margin: 0,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: 10,
                            }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                                fontFamily: "Bree Serif",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span
                              style={{
                                color: "black",
                                fontFamily: "Bree Serif",
                              }}
                            >
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontWeight: "500",
                            fontSize: "1.2rem",
                            fontFamily: "Bree Serif",
                          }}
                        >
                          ${numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "rgb(61, 174, 35)" : "red",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell
                          align="center"
                          className="hide"
                          style={{
                            color:
                              profit_7days > 0 ? "rgb(61, 174, 35)" : "red",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          {profit_7days && "+"}
                          {row.price_change_percentage_7d_in_currency.toFixed(
                            2
                          )}
                          %
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: "bold", fontSize: "1rem" }}
                        >
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                        <TableCell align="center" className="hide">
                          <Sparklines data={row.sparkline_in_7d?.price}>
                            <SparklinesLine
                              color={
                                profit_7days > 0 ? "rgb(61, 174, 35)" : "red"
                              }
                            />
                            <SparklinesSpots
                              style={{
                                fill:
                                  profit_7days > 0 ? "rgb(61, 174, 35)" : "red",
                              }}
                            />
                          </Sparklines>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          style={{
            padding: 8,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          // count={(handleSearch()?.length / 6).toFixed(0)}
          count={Math.floor(handleSearch()?.length / 6)}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 600);
          }}
        />
      </Container>
    </div>
  );
};

export default CoinTable;
