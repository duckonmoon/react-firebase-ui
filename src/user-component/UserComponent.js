import React, { Component } from 'react';
import "./UserComponent.css";

class UserComponent extends Component {
    render() {
        return (
            <div className="container">
                <img className="avatar" src="https://www.w3schools.com/Html/img_girl.jpg" alt="avatar" width={this.props.width} height={this.props.height}/>
                <p>{this.props.user.name} {this.props.user.surname}</p>
            </div>
        );
    }
}

export default UserComponent;