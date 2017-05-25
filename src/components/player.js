import React, {Component} from 'react'
import YouTube from 'react-youtube'

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pause: false,
            volume: 10,
            currentDuration: 0,
            ration: 0
        }
        this.onStateChange = this.onStateChange.bind(this)
        this.handleVideo = this.handleVideo.bind(this)
        this.onPauseVideo = this.onPauseVideo.bind(this)
        this.onPlayVideo = this.onPlayVideo.bind(this)
        this.onEnd = this.onEnd.bind(this)
        this.setVolume = this.setVolume.bind(this)
        this.like = this.like.bind(this)
        this.updateDuration = this.updateDuration.bind(this)
        this.changeDuration = this.changeDuration.bind(this)
        this.browserNotification = this.browserNotification.bind(this)
    }
    render() {
        const opts = {
            width: 0,
            height: 0,
            playerVars: {
                autoplay: 1
            }
        }

        const barStyle = {
                width: parseInt(this.state.volume) + '%'
        }

        let durationBarStyle = {
            width: this.state.ratio + '%'
        }

        return (
            <div className="player">
                <div className="player__left">
                    <div
                        onClick={this.props.handleUserList}
                        className={this.props.activeUserList ? 'userList userList--active' : 'userList'}>
                        List
                    </div>
                    <div
                        className={this.props.likeActive ? 'like like--active' : 'like'}
                        onClick={this.like}>
                        <i className="ion-heart"></i>
                    </div>
                    <div
                        className="title"
                        onClick={this.props.reOpen}>
                        <div>
                            <span>{this.props.title}</span>
                            <span>{this.props.title}</span>
                        </div>
                    </div>
                </div>
                <div className="player__control">
                    <div
                        className={this.props.shuffleControl ? 'shuffle shuffle--selected' : 'shuffle'}
                        onClick={this.props.shuffle}>
                        <i className="ion-shuffle"></i>
                    </div>
                    <div
                        className="backward"
                        onClick={this.props.skipBackWard}>
                        <i className="ion-ios-skipbackward"></i>
                    </div>
                    <div
                        onClick={this.handleVideo}
                        className="play">
                        <i className={this.state.pause ? 'ion-pause' : 'ion-ios-play'}></i>
                    </div>
                    <div
                        className="nextward"
                        onClick={this.props.skipNextWard}>
                        <i className="ion-ios-skipforward"></i>
                    </div>
                    <div
                        className={this.props.repeatControl ? 'repeat repeat--selected' : 'repeat'}
                        onClick={this.props.repeat}>
                        <i className="ion-ios-refresh"></i>
                    </div>
                </div>
                <div className="player__right">
                    <div
                        className={this.props.videoMode ? 'videoMode videoMode--active' : 'videoMode'}
                        onClick={this.props.handleVideoMode}>
                        <i className="ion-ios-photos"></i>
                    </div>
                    <div className="volume">
                        <i className="ion-android-volume-down"></i>
                    </div>
                    <div className="volumeBar">
                        <input
                            type="range"
                            onChange={this.setVolume}
                            defaultValue={this.state.volume}/>
                        <div className="volumeBar__active" style={barStyle}></div>
                    </div>
                </div>
                <div className="duration">
                    <div
                        style={durationBarStyle} 
                        className="duration__bar">
                    </div>
                    <div className="duration__control">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step={this.state.eachSeconds}
                            value={this.state.ratio}
                            onChange={this.changeDuration}
                        />
                    </div>
                </div>
                <div className="player__hidden">
                    <YouTube
                        videoId={this.props.videoId}
                        opts={opts}
                        className="youtube-player"
                        onStateChange={this.onStateChange}
                        onPlay={this.onPlayVideo}
                        onPause={this.onPauseVideo}
                        onEnd={this.onEnd}
                    />
                </div>
            </div>
        )
    }

    browserNotification() {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification")
        }
        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            var notification = new Notification(this.props.title, {
            icon: this.props.photo
            });
        }
        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    var notification = new Notification(this.props.title, {
                        icon: this.props.photo
                    })
                }
            })
        }
        // At last, if the user has denied notifications, and you 
        // want to be respectful there is no need to bother them any more.
    }

    changeDuration(event) {
        const seekTo = Math.floor(this.state.fullDuration * event.target.value / 100)
        this.state.player.seekTo(seekTo)
    }

    updateDuration() {
        let updateDuration = setInterval(() => {
            if (this.state.updateDuration) {
                let currentDuration = Math.floor(this.state.player.getCurrentTime()),
                    fullDuration = Math.floor(this.state.player.getDuration()),
                    ratio = currentDuration * 100 / fullDuration
                this.setState({
                    currentDuration: currentDuration,
                    fullDuration: fullDuration,
                    ratio: ratio
                })
            } else {
                console.log(this.state.currentDuration)
            }
        }, 1000)
    }

    onStateChange(event) {
        this.setState({
            player: event.target,
            pause: true
        })
    }

    onPauseVideo() {
        this.state.player.pauseVideo()
        this.setState({
            pause: false,
        })
    }
    
    onPlayVideo() {
        let eachSeconds = 100 / Math.floor(this.state.player.getDuration())
        this.setState({
            pause: true,
            eachSeconds: eachSeconds,
            updateDuration: true
        })
        this.state.player.setVolume(parseInt(this.state.volume))
        this.updateDuration()
        this.state.player.playVideo()
        this.browserNotification()
    }

    onEnd() {
        this.setState({
            pause: false,
            currentDuration: 0,
            updateDuration: false
        })
        this.props.onEnd()
    }
    
    handleVideo(event) {
        const control = this.state.pause
        if (control) {
            this.setState({
                updateDuration: false
            })
            this.onPauseVideo()
        } else {
            this.onPlayVideo()
        }
    }

    setVolume(event) {
        this.setState({
            volume: event.target.value
        })
        this.state.player.setVolume(parseInt(event.target.value))
    }

    like(event) {
        this.props.like(event)
    }
}

export default Player