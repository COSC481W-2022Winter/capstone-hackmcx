import React from "react";
import { CircularProgress } from "@material-ui/core";

class UserProfile extends React.Component {

    state = {
        isLoaded: false,
        user: null,
        posts: [],
        error: null,
    }
    
    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/username1`)
            .then( res => res.json())
            .then(
                (result) => {
                  this.setState({
                    isLoaded: true,
                    user: result
                  });
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
            )
    }

    render() {
        const style = {
            position: "relative",
            top: "50px"
        }
        const { error, isLoaded, user, posts } = this.state;
      
        if (error) return <div>{error.message}</div>;
        else if (!isLoaded) return <CircularProgress />;
        else {
            return (
                <div>
                    User Page {user.username} {user.first_name} {user.last_name} 
                </div>
            );
        }
    }

}

export default UserProfile;