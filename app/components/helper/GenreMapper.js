class GenreMapper {
    movieGenres = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ];
    weatherToGenreMapping = {
        "Clear": ["Comedy"],
        "Clouds": ["Mystery"],
        "Drizzle": ["Romance"],
        "Rain": ["Romance"],
        "Thunderstorm": ["Horror"],
        "Snow": ["Family"],
        "Mist": ["Mystery"],
        "Smoke": ["Thriller"],
        "Haze": ["Thriller"],
        "Dust": ["Mystery"],
        "Fog": ["Mystery"],
        "Sand": ["Western"],
        "Ash": ["Mystery"],
        "Squall": ["War"],
        "Tornado": ["Western"],
        "":[]
    };

    getTimeGenres() {
        let currentTime = new Date().getHours();
        if(currentTime >= 0 && currentTime < 6)
          return ["Horror"];
        else if(currentTime >= 6 && currentTime < 12)
          return ["Animation"];
        else if(currentTime >= 12 && currentTime < 18)
          return ["Fantasy"];
        else if(currentTime >= 18)
          return ["Science Fiction"];
    }

    getTimeIcon() {
        let currentTime = new Date().getHours();
        if(currentTime >= 0 && currentTime < 6)
          return "https://img.icons8.com/plasticine/100/000000/crescent-moon.png";
        else if(currentTime >= 6 && currentTime < 12)
          return "https://img.icons8.com/cotton/64/000000/sunrise--v1.png";
        else if(currentTime >= 12 && currentTime < 18)
          return "https://img.icons8.com/dusk/64/000000/sun-smiling.png";
        else if(currentTime >= 18)
          return "https://img.icons8.com/cotton/64/000000/sunset--v2.png";
    }

    getWeatherGenres(weather = "") {
        const genre = this.weatherToGenreMapping[weather];
        if(genre)
            return genre;
        else {
            console.log("There is no mapping for this weather: " + weather);
            return [];
        }
    }
    getGenres(weather = "") {
        return this.mapGenre(
            this.getTimeGenres().concat(this.getWeatherGenres(weather))
        );
    }
    mapGenre(arr) {
        console.log(arr);
        let genres = [];
        if (arr.length > 0) {
            arr
                .filter(genre => typeof(genre) == "string" || typeof(genre) == "number")
                .forEach((genre) => {
                genres.push(
                    typeof(arr[0]) == "string"
                        ? this.movieGenres.find(el => el.name == genre).id
                        : typeof(arr[0]) == "number"
                            ? this.movieGenres.find(el => el.id == genre).name
                            : null)
            })
        }
        return genres;
    }
}

export default GenreMapper;