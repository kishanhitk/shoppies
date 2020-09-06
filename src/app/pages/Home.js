import {
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../app-style";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import MovieCard from "../components/MovieCard";

class Home extends Component {
  state = {
    input: "",
    results: [],
  };
  handleInput = (e) => {
    const q = e.target.value;
    q.length > 2 &&
      fetch(`http://www.omdbapi.com/?s=${q}&apikey=2e2cb7ed&`)
        .then((res) => res.json())
        .then((result) => {
          this.setState({ results: result.Search });
          console.log(result.Search);
        });
    this.setState({
      input: e.target.value,
    });
  };
  addToFavs = (e) => {};
  render() {
    const classes = this.props.classes;
    const results = this.state.results;
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
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <div>
              {results &&
                results.map((result) => {
                  return (
                    <Grid container spacing={3}>
                      <MovieCard movie={result}></MovieCard>
                    </Grid>
                  );
                })}
            </div>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Nominations
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
