import React, {Component} from 'react'

class LikeListItem extends Component {
    render() {
        return (
            <div
                className={this.props.className}
                id={this.props.id}
                onClick={this.props.onClick}>
                <div>
                    <span>{this.props.number}</span>
                    <span>{this.props.title}</span>
                </div>
                <span></span>
            </div>
        )
    }
}

export default LikeListItem