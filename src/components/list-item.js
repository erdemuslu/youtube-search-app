import React, {Component} from 'react'

class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div
                id={this.props.arrayNumber}
                onClick={this.props.onClick}
                className={this.props.className}>
                <div className="cover">
                    <div className="opacity"></div>
                    <img src={this.props.cover} alt="youtube-cover"/>
                </div>
                <div className="details">
                    <div>{this.props.title}</div>
                    <div>{this.props.date}</div>
                </div>
                <div className="back">
                    <img src={this.props.cover} alt="youtube-cover"/>
                    <div className="title">{this.props.title}</div>
                    <div className="date">{this.props.date}</div>
                    <div className="play"><i className={this.props.icon}></i></div>
                </div>
            </div>
        )
    }
}

export default ListItem