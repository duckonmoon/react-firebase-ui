import React, { Component } from 'react';
import "./UserComponent.css";
import firebase from '../firebase/FirebaseCDB'

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            activePhoto: ""
        }
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    onItemClick = () => {
        this.props.click(this.props.user.id);
    }

    sendPhotoRequest = () => {
        const user = this.props.user;
        if (user.photo && !user.url) {
            firebase.getUserStorage().child(user.id).child(user.photo).getDownloadURL().then((url) => {
                this.setState({ url: url, activePhoto: user.photo });
                user.url = url;
            })
        } else if (user.url) {
            this.setState({ url: user.url, activePhoto: user.photo });
        }
    }

    fileChangedHandler = (event) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();

        let file = event.target.files[0];
        let id = this.props.user.id;
        let user = {}
        user[id] = {
            id: this.props.user.id,
            name: this.props.user.name,
            surname: this.props.user.surname,
            photo: 'hi'
        }
        firebase.getUserStorage().child(this.props.user.id).child('hi').put(file).then(function (snapshot) {
            firebase.getUserReference().update(user);
        });
    }


    render() {
        if (!this.props.user.photo && this.state.activePhoto !== "") {
            this.setState({ activePhoto: "", url: "" });
        } else if (this.state.activePhoto !== this.props.user.photo) {
            this.sendPhotoRequest();
        }

        const photo = this.state.url === "" ? "https://www.w3schools.com/Html/img_girl.jpg" : this.state.url;

        const condonStyle = {
            display: this.props.displaying
        }

        return (
            <div className="contain" onClick={this.onItemClick}>
                <img className="avatar" src={photo} alt="avatar" width={this.props.width} height={this.props.height} />
                <p>{this.props.user.name} {this.props.user.surname}</p>
                <div className="condom" style={condonStyle}>
                    <label htmlFor="file-upload" className="custom-file-upload btn btn-success">
                        <i className="fa fa-cloud-upload"></i> Upload
                        <input id="file-upload" type="file" accept="image/*" onChange={this.fileChangedHandler} />
                    </label>
                    <button type="button" className="btn btn-info">Do Smth!</button>
                </div>

            </div>
        );
    }
}

export default UserComponent;