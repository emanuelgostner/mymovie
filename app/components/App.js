import React from "react";
import "./App.css";
import Header from "./Header"
import Movies from "./Movies";
import Filter from "./Filter";
import GenreMapper from "./helper/GenreMapper";
import Favourites from "./Favourites";

class App extends React.Component {
    genreMapper = new GenreMapper();
    constructor(props) {
        super(props);
        this.state = {
            themeDarkmode: false,
            movieAPIKEY: "f05502e64caa2132313572c4a34beba7", //https://api.themoviedb.org
            weatherAPIKEY: "e060770872a3761274be891a4d125c9f", //https://home.openweathermap.org/
            maxMovieResults: 9,
            currLocation: "2761369",
            currWeather:"",
            currWeatherIcon:"",
            weatherfilter: true,
            timefilter: true,
            weatherLoaded: false,
            userGenres: [],
            genres: [],
            loadingMovies: false,
            movieList: [],
            //movieList: [{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"}, {"title":"Titanic", "vote_average":"2", "popularity": "56.2","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"}],
            //favourites: [{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"},{"title":"Sample","vote_average":"7.8", "popularity": "103","poster_path": "//3nk9UoepYmv1G9oP18q6JJCeYwN.jpg"}],
            favourites: [],
            userState: JSON.parse(localStorage.getItem('JWT'))
        };

        this.fetchFavourites = this.fetchFavourites.bind(this);
        this.postFavourite = this.postFavourite.bind(this);
        this.deleteFavourite = this.deleteFavourite.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
        this.fetchWeather = this.fetchWeather.bind(this);
        this.CheckError = this.CheckError.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.toggleDarkmode = this.toggleDarkmode.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
    }

    componentDidMount() {
        console.log("Main component did mount");
        this.setState({
            themeDarkmode: localStorage.getItem('themeDarkmode') == "true"
        })
        this.fetchWeather();
        if(this.state.userState)
            this.fetchFavourites();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Main component just updated");
        if(prevState.genres != this.state.genres)
            this.fetchMovies();
    }
    logoutUser() {
        localStorage.removeItem('JWT');
        this.setState({
            userState: JSON.parse(localStorage.getItem('JWT'))
        })
        window.location = "/login";
    }
    toggleFavourite(movie) {
        if(this.state.favourites.find(e=>e.id == movie.id)) {
            this.setState({
               favourites: this.state.favourites.filter(e=>e.id != movie.id)
            });
            let movieMatch = this.state.movieList.find(e=>e.id == movie.id);
            if(movieMatch)
                movieMatch["fav"] = "";
            this.deleteFavourite(movie);
        }
        else {
            this.setState({
               favourites: this.state.favourites.concat(movie)
            })
            let movieMatch = this.state.movieList.find(e=>e.id == movie.id);
            if(movieMatch)
                movieMatch["fav"] = "fav";
            this.postFavourite(movie);
        }
    }
    fetchFavourites() {
        //TODO remove hardcoded address
        fetch('http://localhost:8081/api/favourites', {
           method: 'get',
           headers: new Headers({
             'Authorization': 'Bearer '+this.state.userState.accessToken,
             'Content-Type': 'application/x-www-form-urlencoded'
           })
        })
           .then(data=>data.json())
           .then(data=>{
               let favouritesData = data.concat(this.state.favourites);
               this.setState({
                   favourites: favouritesData
               })
           })
           .catch(function(error) {
               console.log("Error loading favourites: "+error);
           });
    }
    postFavourite(movie) {
        //TODO remove hardcoded address
        fetch('http://localhost:8081/api/favourites', {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer '+this.state.userState.accessToken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(movie)
        })
           .catch(function(error) {
               console.log("Error posting favMovie: "+error);
           });
    }
    deleteFavourite(movie) {
            //TODO remove hardcoded address
            fetch('http://localhost:8081/api/favourites', {
                method: 'delete',
                headers: new Headers({
                    'Authorization': 'Bearer '+this.state.userState.accessToken,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(movie)
            })
               .catch(function(error) {
                   console.log("Error posting favMovie: "+error);
               });
        }
    fetchWeather() {
        console.log("Call Function fetchWeather");

        fetch('http://api.openweathermap.org/data/2.5/weather?id='+this.state.currLocation+'&appid='+this.state.weatherAPIKEY+'')
            .then(data=>data.json())
            .then(data=>{
                const weatherCondition = data.weather[0].main;
                const weatherIcon = data.weather[0].icon;
                this.setState({
                    currWeather: weatherCondition,
                    currWeatherIcon: 'http://openweathermap.org/img/wn/'+weatherIcon+'@2x.png',
                    genres: this.genreMapper.getGenres(weatherCondition),
                    weatherLoaded: true
                });
                this.fetchMovies();
            })
            .catch(function(error) {
                console.log("Error loading weather: "+error);
                this.fetchMovies();
            });

    }

    fetchMovies() {
        console.log("Call Function fetchMovies");
        this.setState({loadingMovies:true});
        fetch('https://api.themoviedb.org/3/discover/movie?with_genres='+this.state.userGenres.concat(this.state.genres)+'&api_key='+this.state.movieAPIKEY+'')
            .then(data=>this.CheckError(data))
            .then(data=> {

                let movies = data.results.slice(0,9);

                this.state.favourites.forEach(e=> {
                    let movieMatch = movies.find(m=>m.id == e.id);
                    if (movieMatch)
                        movieMatch["fav"] = "fav";
                });
                this.setState({
                    movieList: movies
                });
            })
            .catch(function(error) {
                console.log("Error loading movies: "+error);
            });

        this.setState({loadingMovies:false});
    }

    CheckError(response) {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    }

    toggleDarkmode(event) {
        this.setState({
            themeDarkmode: event.target.checked
        })
        localStorage.setItem('themeDarkmode', event.target.checked)
    }
    changeUsername(event) {
        var txt;
        var person = prompt("Please enter your new name:");
        if (!(person == null || person == "")) {
            //TODO remove hardcoded address
            fetch('http://localhost:8081/api/user/current', {
                method: 'put',
                headers: new Headers({
                    'Authorization': 'Bearer '+this.state.userState.accessToken,
                    'Content-Type': 'application/json'
                }),
                body: person
            })
            .then((data)=>{
                console.log(data);
                if (data.status === 200) {
                    let newUserState = this.state.userState;
                    newUserState.username = person;
                    this.setState({
                        userState: newUserState
                    })
                    localStorage.setItem("JWT", JSON.stringify(newUserState))
                }
            })
           .catch(function(error) {
               console.log("Error updating username: "+error);
           });
        }
    }

    handleFilterChange(type, genre) {
        if(type == "weather")
            this.setState({
                weatherfilter: !(this.state.weatherfilter)
            })
        else if(type == "time")
            this.setState({
                timefilter: !(this.state.timefilter)
            })

        if(this.state.genres.find(e=>e == this.genreMapper.mapGenre([genre])[0])) {
           this.setState({
              genres: this.state.genres.filter(e=>e != this.genreMapper.mapGenre([genre])[0])
           });
        }
        else {
            this.setState({
              genres: this.state.genres.concat(this.genreMapper.mapGenre([genre])[0])
            })
        }
    }

    render() {
        return(
            <div className={"mainWrapper" + (this.state.themeDarkmode ? " themeDark" : "")}>
                <Header userState={this.state.userState} logoutUser={this.logoutUser} toggleDarkmode={this.toggleDarkmode} changeUsername={this.changeUsername}/>
                <main id="main">
                    <Favourites favourites={this.state.favourites} toggleFavourite={this.toggleFavourite} />

                    <Filter
                        weatherIcon={this.state.currWeatherIcon}
                        weathergenres={this.genreMapper.getWeatherGenres(this.state.currWeather)}
                        timeIcon={this.genreMapper.getTimeIcon()}
                        timegenres={this.genreMapper.getTimeGenres()}
                        handleFilterChange={this.handleFilterChange}
                        timefilter={this.state.timefilter}
                        weatherfilter={this.state.weatherfilter}
                    />

                    <Movies movieList={this.state.movieList} toggleFavourite={this.toggleFavourite} />

                    {this.state.loadingMovies ? "loading..." : ""}
                </main>
            </div>
        )
    }
}

export default App;