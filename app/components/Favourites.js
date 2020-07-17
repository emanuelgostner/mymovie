import React,{ Component } from "react";
import { render } from 'react-dom';
import "./Favourites.css";
import MovieItemFavourite from "./MovieItemFavourite";
import Carousel from 'react-elastic-carousel';


class Favourites extends React.Component {
    state = {
        "breakPoints": [
                { width: 1, itemsToShow: 2 },
                { width: 400, itemsToShow: 3},
                { width: 850, itemsToShow: 5 },
                { width: 1150, itemsToShow: 7},
                { width: 1450, itemsToShow: 9 },
                { width: 1750, itemsToShow: 10 },
              ]
    }
    componentDidMount() {

    }
    componentDidUpdate() {

    }
    render(){
      return (
          <div className="favouriteList" >
                <h2>Favourites</h2>
                  <div className="favouritesItems glider">
                      <Carousel breakPoints={this.state.breakPoints} pagination={false}>
                          {this.props.favourites.map(
                              (movie,i)=>
                                <MovieItemFavourite index={i} key={i} movie={movie} toggleFavourite={this.props.toggleFavourite}/>
                          )}
                      </Carousel>
                  </div>
              </div>
      )
    }
};

export default Favourites;