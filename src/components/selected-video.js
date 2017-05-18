import React, {Component} from 'react'

class SelectedVideo extends Component {
    render() {
        return (
            <div className={this.props.className}>
                <div className="selectedVideo__photo">
                    <img src={this.props.photo} />
                </div>
                <div className="selectedVideo__title">
                    {this.props.title}
                </div>
                <div
                    onClick={this.props.onClick}
                    className="selectedVideo__backToList">
                    back to list
                </div>
            </div>
        )
    }
}

export default SelectedVideo