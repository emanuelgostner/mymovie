import React from "react";
import "./Register.css";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            responseErrors: [],
            responseMessage: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.postNewUser = this.postNewUser.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        console.log("Register component mounted");
    }

    componentDidUpdate() {

    }

    redirect() {
        if(this.state.status == 200)
            window.location = "/login";
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            formData: {
                email: event.target.querySelector(".email").value,
                username: event.target.querySelector(".username").value,
                password: event.target.querySelector(".password").value,
                role: ["admin", "user"]
            },
            status: null
        }, function(){
            this.postNewUser()
        });

    }
    postNewUser() {

        //TODO change hardcoded localhost to relative path
        fetch('http://localhost:8081/api/auth/signup',{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(this.state.formData) // body data type must match "Content-Type" header
          })
            .then(data=>{
                this.setState({
                    status: data.status
                });
                return data.json()
            })
            .then(data=>{
                console.log(data);
                this.setState({
                    responseErrors: data.errors ? data.errors : [],
                    responseMessage: data.message ? data.message : ""
                }, function() {
                    this.redirect();
                })
            })
            .catch(function(error) {
                console.log("Error creating new user: "+error);
            });
    }

    render() {
        return(
            <div className={"register"}>
                <div>
                    <input type="radio" defaultChecked id="toggle--login" name="toggle" className="ghost"/>
                    <input type="radio" id="toggle--signup" name="toggle" className="ghost"/>
                    <a href={"/app"}>
                        <div className="logo">
                            <div className="a">my</div>
                            <div className="b">Movie</div>
                        </div>
                    </a>
                    <div className={"form form--signup framed"}>
                        <form className="" onSubmit={this.handleSubmit}>
                            <input type="email" placeholder="Email" className="input input--top email" required />
                            <input type="text" placeholder="Username" className="input username" required />
                            <input type="password" placeholder="Password" className="input password" required/>
                            <input type="submit" className="input input--submit" value={"Sign up"}/>
                            <a href={"/login"}><span className="text text--small text--centered">Not new? <b>Log in</b></span></a>
                        </form>
                        <div className={"errorMsgs"}>
                            {this.state.responseMessage.length > 0 &&
                                <div>Message: {this.state.responseMessage}</div>
                            }
                            {this.state.responseErrors.length > 0 &&
                                <div>Error:
                                    {this.state.responseErrors.map(
                                          (error,i)=>
                                            <div key={i}>{error.field}: {error.defaultMessage}</div>
                                      )}
                                </div>
                            }

                        </div>
                    </div>
                    <div className="fullscreen-bg"/>
                </div>
            </div>
        )
    }
}

export default Register;