import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";

import styles from "../app-style";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
class MovieCard extends Component {
  state = {
    isNominated: false,
  };
  addToFavs = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isNominated: !prevState.isFav,
      };
    });
  };
  render() {
    const result = this.props.movie;
    const classes = this.props.classes;
    return (
      <div style={{ objectFit: "contain", margin: "50px" }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={result.Poster}
              title={result.Title}
              style={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {result.Title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {result.Year}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              disabled={result.nominated}
              // onClick={() => }
              onClick={() => {
                this.props.nominate();
              }}
            >
              {result.nominated ? "Added to Nominations" : "Nominate"}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withStyles(styles)(MovieCard);
