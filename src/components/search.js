import React, {Component} from 'react'


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleValue = this.handleValue.bind(this)
    }

    render() {
        return (
            <form className={this.props.position ? 'search search--top' : 'search'}>
                <input
                    onChange={this.handleValue}
                    value={this.state.value}
                    type="text"
                    placeholder="type someting to search"
                    autoFocus
                />
                <button
                    value={this.state.value}
                    className="search__icon"
                    onClick={this.props.onClick}>
                    <i className="ion-ios-search-strong"></i>
                </button>
            </form>
        )
    }

    handleValue(event) {
        const value = event.target.value
        this.setState({
            value: value
        })
    }
}

export default Search
