import React, {Component} from 'react'
import LikeListItem from './like-list-item'

class LikeList extends Component {
    constructor(props) {
        super(props)
        this.state= {}
    }
    render() {
        if (this.props.data == undefined) {
            return false
        }

        let item = this.props.data.map((item, index) => {
            const currentId = this.props.currentId,
                  itemId = item.id,
                  textLength = item.title.substring(0,32),
                  number = parseInt(index) + 1
            return (
                <LikeListItem
                    key={index}
                    id={index}
                    number={number}
                    title={textLength}
                    className={currentId == itemId ? 'likeList__item likeList__item--active' : 'likeList__item'}
                    onClick={this.props.onClick}
                />
            )
        })
        return (
            <div className={this.props.className}>
                <div className="likeList__search">
                    <input
                        onChange={this.props.onChange}
                        type="text"
                        placeholder="Search in your list"
                    />
                    <i className="ion-ios-search-strong"></i>
                </div>
                {item}
            </div>
        )
    }
}

export default LikeList