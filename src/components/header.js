import React from 'react'

const Header = (props) => {
    return(
        <div className="header">
            <div
                className="header__logo"
                onClick={props.onClick}>
                Youtube Search
            </div>
            <div className="header__icons">
                <a href="https://trello.com/b/TejBS8sR/youtube-search-app" target="_blank"><i className="ion-android-list"></i></a>
                <a href="https://github.com/erdemuslu/youtube-search-app"><i className="ion-social-github"></i></a>
            </div>
        </div>
    )
}

export default Header