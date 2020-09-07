import {
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../app-style";
import { withStyles } from "@material-ui/core/styles";
import MovieCard from "../components/MovieCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.nominate = this.nominate.bind(this);
  }
  state = {
    input: "",
    results: [],
    nominations: [],
  };
  handleInput = (e) => {
    const q = e.target.value;
    q.length > 2 &&
      fetch(`http://www.omdbapi.com/?s=${q}&apikey=2e2cb7ed&`)
        .then((res) => res.json())
        .then((result) => {
          result.Search.forEach((res) => {
            res.nominated = false;
          });
          this.setState({ results: result.Search });
          console.log(result.Search);
        });
    this.setState({
      input: e.target.value,
    });
  };
  nominate(result) {
    const newSearch = this.state.results;
    newSearch.forEach((res) => {
      if (res.imdbID === result.imdbID) res.nominated = true;
    });
    const { nominations } = this.state;
    var temp = nominations;
    temp.unshift(result);
    this.setState({ nominations: temp, results: newSearch });
  }
  removeNomination(imdbID) {
    const newSearch = this.state.results;
    newSearch.forEach((res) => {
      if (res.imdbID === imdbID) res.nominated = false;
    });
    const newList = this.state.nominations.filter(
      (item) => item.imdbID !== imdbID
    );
    this.setState({ nominations: newList, results: newSearch });
  }
  addToFavs = () => {};
  render() {
    const classes = this.props.classes;
    const results = this.state.results;
    const nominations = this.state.nominations;
    return (
      <div>
        {" "}
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" noWrap>
                Shoppies
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  autoFocus
                  onChange={this.handleInput}
                  placeholder="Search Movies..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}></div>
            </Toolbar>
          </AppBar>
        </div>
        <Grid container>
          <Grid item xs={8}>
            <div>
              <Grid container>
                {results &&
                  results.map((result) => {
                    return (
                      <Grid item xs={6}>
                        <MovieCard
                          key={result.imdbID}
                          movie={result}
                          nominate={() => this.nominate(result)}
                        ></MovieCard>
                      </Grid>
                    );
                  })}{" "}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Paper
              className={classes.paper}
              style={{ marginTop: "50px" }}
              elevation={3}
            >
              <Typography variant="h4" gutterBottom align="center">
                Nominations
              </Typography>
              {nominations.length > 0 &&
                nominations.map((res) => {
                  return (
                    <div key={res.imdbID}>
                      <p>{res.Title}</p>
                      <Button
                        onClick={() => {
                          this.removeNomination(res.imdbID);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
