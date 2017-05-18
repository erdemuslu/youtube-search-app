import React, {Component} from 'react'

class Alert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isClosed: false
        }
    }

    render() {
        if(!this.props) {
            return false
        }

        let className = null,
            icon = null,
            text = null
        switch (this.props.className) {
            case 'success':
                className = 'alert--success',
                icon = 'ion-android-done'
                text = 'The song has added'
                break
            case 'error':
                className = 'alert--error',
                icon = 'ion-alert'
                break
            case 'warning':
                className = 'alert-warning',
                icon = 'ion-alert'
                break
            case 'info':
                className = 'alert--info',
                icon = 'ion-information',
                text = 'The song has removed'
                break
        }

        return (
            <div className={(this.state.isOpened && !this.state.isClosed ? 'alert alert--opened ' : '') + className}>
                <div className="alert__icon">
                    <i className={icon}></i>
                </div>
                <div className="alert__text">{text}</div>
            </div>
        )
    }
}

export default Alert