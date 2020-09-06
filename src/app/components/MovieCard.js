import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";

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
class MovieCard extends Component {
  render() {
    const result = this.props.movie;
    const classes = this.props.classes;
    return (
      <div>
        {" "}
        <Grid item xs={12}>
          <center>
            <div style={{ objectFit: "contain", margin: "50px" }}>
              <Card className={classes.root}>
                <CardActionArea
                  onDoubleClick={() => console.log("Double Click")}
                >
                  <CardMedia
                    className={classes.media}
                    image={result.Poster}
                    title="Contemplative Reptile"
                    style={{ objectFit: "contain" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {result.Title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {result.Year}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <IconButton onClick={() => this.addToFavs(result.imdbID)}>
                    <FavoriteBorder></FavoriteBorder>
                    <Favorite htmlColor="red"></Favorite>
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          </center>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(MovieCard);
