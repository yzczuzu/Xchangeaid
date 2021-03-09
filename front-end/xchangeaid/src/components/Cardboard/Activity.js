import React, { Component } from 'react';
import Cardboard from './Cardboard';
import { CardDeck } from 'react-bootstrap';

class Activity extends Component {
    render() {
        return (
            <CardDeck>
                <Cardboard username={this.props.username} img={this.props.img} title={this.props.title} content={this.props.content} userid={this.props.userid}  idpost={this.props.idpost} date={this.props.date} activityId={this.props.activityId} />
                
            </CardDeck>
        );
    }
}
export default Activity;