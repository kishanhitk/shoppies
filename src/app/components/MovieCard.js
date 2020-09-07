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
      <div>
        <center>
          <Card className={classes.root} align="center">
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  result.Poster === "N/A"
                    ? "https://icon-library.com/images/no-image-available-icon/no-image-available-icon-6.jpg"
                    : result.Poster
                }
                title={result.Title}
                style={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h2" noWrap>
                  {result.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {result.Year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                variant="outlined"
                align="right"
                color="red"
                disabled={result.nominated}
                onClick={() => {
                  this.props.nominate();
                }}
              >
                {result.nominated ? "Added" : "Nominate"}
              </Button>
            </CardActions>
          </Card>
        </center>
      </div>
    );
  }
}
export default withStyles(styles)(MovieCard);
