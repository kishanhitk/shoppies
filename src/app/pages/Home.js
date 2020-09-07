import {
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Grid,
  Paper,
  List,
  IconButton,
  Divider,
} from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../app-style";
import { withStyles } from "@material-ui/core/styles";
import MovieCard from "../components/MovieCard";
import DeleteIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Favorite } from "@material-ui/icons";
import Popover from "@material-ui/core/Popover";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
class Home extends Component {
  constructor(props) {
    super(props);
    this.nominate = this.nominate.bind(this);
  }
  state = {
    input: "",
    results: [],
    nominations: [],
    open: false,
    anchorEl: null,
  };
  handleInput = (e) => {
    const q = e.target.value;
    q.length > 2 &&
      fetch(`https://www.omdbapi.com/?s=${q}&apikey=2e2cb7ed&`)
        .then((res) => res.json())
        .then((result) => {
          if (result.Response === "True") {
            result.Search.forEach((res) => {
              res.nominated = false;
            });
            this.setState({ results: result.Search });
            console.log(result.Search);
          } else {
            console.log(e);
            window.alert(result.Error);
          }
        });
    this.setState({
      input: e.target.value,
    });
  };
  openPopover = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  nominate(result) {
    const { nominations } = this.state;
    if (nominations.length < 5) {
      const newSearch = this.state.results;
      newSearch.forEach((res) => {
        if (res.imdbID === result.imdbID) res.nominated = true;
      });
      var temp = nominations;
      temp.unshift(result);
      window.localStorage.setItem("nominations", JSON.stringify(temp));

      this.setState({ nominations: temp, results: newSearch });
    } else {
      this.setState({ open: true });
    }
  }
  removeNomination(imdbID) {
    const newSearch = this.state.results;
    newSearch.forEach((res) => {
      if (res.imdbID === imdbID) res.nominated = false;
    });
    const newList = this.state.nominations.filter(
      (item) => item.imdbID !== imdbID
    );
    window.localStorage.setItem("nominations", JSON.stringify(newList));
    this.setState({ nominations: newList, results: newSearch });
  }
  handleClose = () => {
    this.setState((prev) => {
      return {
        ...prev,
        open: !prev.open,
      };
    });
  };
  handleClosePopOver = () => {
    this.setState({ anchorEl: null });
  };
  componentDidMount() {
    var localData = window.localStorage.getItem("nominations");
    this.setState({ nominations: JSON.parse(localData) || [] });
  }
  render() {
    const classes = this.props.classes;
    const { open, nominations, results, anchorEl } = this.state;
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? "simple-popover" : undefined;
    return (
      <div>
        <div className={classes.grow}>
          <AppBar position="fixed">
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
              <MenuItem>
                <IconButton
                  aria-label="show 11 new notifications"
                  color="inherit"
                  onClick={this.openPopover}
                >
                  <Badge badgeContent={nominations.length} color="secondary">
                    <Favorite></Favorite>
                  </Badge>
                </IconButton>
                <Popover
                  id={id}
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={this.handleClosePopOver}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  {/* <Paper
                    className={classes.paper}
                    style={{ marginTop: "50px" }}
                    elevation={3}
                  > */}
                  <Typography variant="h4" gutterBottom align="center">
                    Nominations
                  </Typography>
                  <Divider></Divider>
                  <List>
                    {nominations.length > 0 &&
                      nominations.map((res) => {
                        return (
                          <div key={`${res.imdbID}nomi`}>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar src={res.Poster}></Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={res.Title}
                                secondary={res.Year}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  edge="end"
                                  aria-label="delete"
                                  onClick={() => {
                                    this.removeNomination(res.imdbID);
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </div>
                        );
                      })}
                  </List>
                  {/* </Paper> */}
                </Popover>
              </MenuItem>
            </Toolbar>
          </AppBar>{" "}
          <Toolbar />
        </div>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {results &&
            results.map((result) => {
              return (
                <Grid item xs={12} md={4} lg={3} sm={6}>
                  <MovieCard
                    key={`${result.imdbID}card`}
                    movie={result}
                    nominate={() => this.nominate(result)}
                  ></MovieCard>
                </Grid>
              );
            })}
        </Grid>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Maximum Nominations Reached
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              You can nominate only 5 movies.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay! Got it.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(Home);
