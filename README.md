# mymovie
Webapp that suggests a specific amount of movies based on various parameters like current weather and time of the day<br/>
# Stack
## Backend
Spring boot<br/>
Thymeleaf<br/>
JPA<br/>
MySQL<br/>
Spring security (JWT)
## Frontend
HTML <br/>
CSS <br/>
Javascript <br/>
React <br/>
Webpack <br/>
## View
## APP (mobile)<br/>
![app3-min](https://user-images.githubusercontent.com/13123637/87776793-a161a700-c828-11ea-8263-0ac8acb849c1.PNG)
## App<br/>
![app1-min](https://user-images.githubusercontent.com/13123637/87776798-a32b6a80-c828-11ea-89c0-7da345ee4114.PNG)
## Login<br/>
![app2-min](https://user-images.githubusercontent.com/13123637/87776802-a4f52e00-c828-11ea-9099-ede75d4a6c2c.PNG)

-----------------------

# Third-Party API's
### http://api.openweathermap.org/data/2.5/
### https://api.themoviedb.org/3/
# myMovie API
# Favourites
using GET, POST, DELETE to manage favourite movies in a mySQL database<br>
implemented in MainController.java
### GET
requestMovie (UserDetailsImpl customUser)<br>
return values: 
- a json with all movies which are saved in the database for the<br>
current logged in user 
- HTTPstatuscode 200 (OK)
- HTTPstatuscode 204 (no Content, if there's no movie saved for the user)
- HTTPstatuscode 401 (Unauthorized, if no user is logged in)

Optional return value:<br>
GET with optional Header XML and value yes returns a XML

### POST
saveMovie(String json,UserDetailsImpl customUser)<br>
needs a JSON-String for the movie, which should be saved in the database<br>
(for the current logged in user)
return values:
- HTTPstatuscode 200 (OK)
- HTTPstatuscode 401 (Unauthorized, if no user is logged in)

### DELETE
deleteMovie(String json, UserDetailsImpl customUser)
needs a JSON-String for the movie, which should be deleted in the database<br>
(for the current logged in user)
return values:
- HTTPstatuscode 200 (OK)
- HTTPstatuscode 204 (no Content, if there's no movie saved for the user)
- HTTPstatuscode 401 (Unauthorized, if no user is logged in)

using PUT to change username<br>
implemented in Usercontroller.java
return values:
- HTTPstatuscode 200 (OK)
- HTTPstatuscode 401 (Unauthorized, if no user is logged in)

### PUT
changeUsername(String newUsername, UserDetailsImpl customUser)
needs a String for the new username<br>
#myMovie Authentication
Authentication is done with JWT and Spring Security.

### Signup:
```

POST to server /api/auth/signup  
{
	"username": "Emanuel",
	"email": "emanuel.gostner@stud.fh-campuswien.ac.at",
	"password":"123456",
	"role": ["admin", "user"]
}

response from server
{
    "message": "User registered successfully!"
}
```

### Signin:
```

POST to server /api/auth/signin  
{
	"username": "Emanuel",
	"password": "123456"
}

response from server
{
    "id": 1,
    "username": "Emanuel",
    "email": "emanuel.gostner@stud.fh-campuswien.ac.at",
    "roles": [
        "ROLE_ADMIN",
        "ROLE_USER"
    ],
    "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJFbWFudWVsIiwiaWF0IjoxNTkzMjQzODU0LCJleHAiOjE1OTMzMzAyNTR9.tO8VOCM6ZA5vxlCPaVkp3YjJFJ2M-NvWfpI8U2wFPed-ObbPZIX28xnWPIDHJPAydkBhpdHVhgeVtoU2vW2MAg",
    "tokenType": "Bearer"
}
```

### Resources for Learning
#### Authentication
https://bezkoder.com/spring-boot-jwt-authentication/

