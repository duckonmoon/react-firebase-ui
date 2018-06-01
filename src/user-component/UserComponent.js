import React, { Component } from 'react';
import "./UserComponent.css";
import firebase from '../firebase/FirebaseCDB'

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            activePhoto : ""
        }
    }

    onItemClick = () => {
        this.props.click(this.props.user.id);
    }

    sendPhotoRequest = () => {
        const user = this.props.user;
        if (user.photo && !user.url) {
            firebase.getUserStorage().child(user.id).child(user.photo).getDownloadURL().then((url) => {
                this.setState({ url: url, activePhoto : user.photo });
                user.url = url;
            })
        } else if (user.url){
            this.setState({ url: user.url, activePhoto: user.photo });
        }
    }


    render() {
        if (!this.props.user.photo && this.state.activePhoto !==""){
            this.setState({ activePhoto: "", url: ""});
        } else if (this.state.activePhoto !== this.props.user.photo){
            this.sendPhotoRequest();
        }

        const photo = this.state.url === "" ? "https://www.w3schools.com/Html/img_girl.jpg" : this.state.url;
        console.log(photo);

        return (
            <div className="container" onClick={this.onItemClick}>
                <img className="avatar" src={photo} alt="avatar" width={this.props.width} height={this.props.height} />
                <p>{this.props.user.name} {this.props.user.surname}</p>
            </div>
        );
    }
}

export default UserComponent;