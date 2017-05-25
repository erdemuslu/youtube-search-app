import React, {Component} from "react"
import ListItem from "./list-item"
import Player from './player'
import SelectedBackground from './selected-background'
import SelectedVideo from './selected-video'
import LikeList from './like-list'

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playFromLike: false,
            videoMode: false,
            isOpened: false,
            shuffle: false,
            repeat: false,
            likeActive: false,
            likeList: [],
            controlLike: false,
            videoId: '',
            activeUserList: false
        }
        this.handleVideo = this.handleVideo.bind(this)
        this.handleVideoMode = this.handleVideoMode.bind(this)
        this.backToList = this.backToList.bind(this)
        this.onEnd = this.onEnd.bind(this)
        this.skipBackWard = this.skipBackWard.bind(this)
        this.skipNextWard = this.skipNextWard.bind(this)
        this.skipNextWardForLike = this.skipNextWardForLike.bind(this)
        this.shuffleForLike = this.shuffleForLike.bind(this)
        this.shuffle = this.shuffle.bind(this)
        this.repeat = this.repeat.bind(this)
        this.reOpen = this.reOpen.bind(this)
        this.like = this.like.bind(this)
        this.handleUserList = this.handleUserList.bind(this)
        this.handleFromList = this.handleFromList.bind(this)
        this.searchFromList = this.searchFromList.bind(this)
    }

    render() {
        if (this.props.data == undefined) {
            return false
        }
        let item = this.props.data.map((item, index) => {
            let textLength = item.snippet.title.substring(0, 48)
            let dateLength = item.snippet.publishedAt.substring(0, 10)
            return (
                <ListItem
                    key={index}
                    arrayNumber={index}
                    cover={item.snippet.thumbnails.high.url}
                    title={textLength}
                    date={dateLength}
                    onClick={this.handleVideo}
                    id={item.id.videoId}
                    className={this.state.videoId == item.id.videoId ? 'list__item list__item--selected' : 'list__item'}
                    icon={this.state.videoId == item.id.videoId ? '' : 'ion-ios-play'}
                />
            )
        })

        return (
            <div className={this.props.visibility ? '' : 'displayNone'}>
                <div
                    className='list'
                    id={this.state.videoId}>
                    {item}
                </div>
                <Player
                    videoMode={this.state.videoMode}
                    title={this.state.title}
                    onEnd={this.onEnd}
                    skipBackWard={this.skipBackWard}
                    skipNextWard={this.skipNextWard}
                    shuffle={this.shuffle}
                    repeat={this.repeat}
                    shuffleControl={this.state.shuffle}
                    repeatControl={this.state.repeat}
                    videoId={this.state.videoId}
                    pause={this.state.pause}
                    reOpen={this.reOpen}
                    like={this.like}
                    likeActive={this.state.likeActive}
                    handleUserList={this.handleUserList}
                    activeUserList={this.state.activeUserList}
                    handleVideoMode={this.handleVideoMode}
                    photo={this.state.photo}
                />
                <SelectedBackground
                    className={this.state.isOpened ? 'selectedBackground selectedBackground--opened' : 'selectedBackground'}
                />
                <SelectedVideo
                    onClick={this.backToList}
                    className={this.state.isOpened ? 'selectedVideo selectedVideo--opened' : 'selectedVideo'}
                    photo={this.state.photo}
                    title={this.state.title}
                />
                <LikeList
                    currentId={this.state.videoId}
                    className={this.state.activeUserList ? 'likeList likeList--opened' : 'likeList'}
                    data={this.state.likeList}
                    onClick={this.handleFromList}
                    onChange={this.searchFromList}
                />
            </div>
        )
    }

    handleVideo(event) {
        this.setState({
            arrayNumber: event.target.id,
            title: this.props.data[event.target.id].snippet.title,
            photo: this.props.data[event.target.id].snippet.thumbnails.high.url,
            videoId: this.props.data[event.target.id].id.videoId,
            isOpened: !this.state.videoMode,
            playFromLike: false
        })

        // Check the item that didn't liked or liked
        let result = false,
            currentVideoId = this.props.data[event.target.id].id.videoId

        function findElement(item) {
            if (item.id == currentVideoId) {
                return (
                    result = true
                )
            } else {
                return (
                    result = false
                )
            }
        }

        let list = this.state.likeList
        list.find(findElement)
        if (result) {
            this.setState({
                likeActive: true
            })
            console.log('item has added before')
        } else {
            this.setState({
                likeActive: false
            })
            console.log('item has not added yet')
        }
    }

    skipBackWard(event) {
        let index = null
        if (parseInt(this.state.arrayNumber) == 0) {
            index = 19
        } else {
            index = parseInt(this.state.arrayNumber) - 1
        }
        this.setState({
            arrayNumber: index,
            title: this.props.data[index].snippet.title,
            photo: this.props.data[index].snippet.thumbnails.high.url,
            videoId: this.props.data[index].id.videoId,
            isOpened: !this.state.videoMode
        })
    }

    skipNextWard(event) {
        let index = null
        if (parseInt(this.state.arrayNumber) == 19) {
            index = 0
        } else {
            index = parseInt(this.state.arrayNumber) + 1
        }
        this.setState({
            arrayNumber: index,
            title: this.props.data[index].snippet.title,
            photo: this.props.data[index].snippet.thumbnails.high.url,
            videoId: this.props.data[index].id.videoId,
            isOpened: !this.state.videoMode
        })
    }

    skipNextWardForLike() {
        let likeListLength = parseInt(this.state.likeList.length) - 1,
            arrayNumber = parseInt(this.state.arrayNumber),
            index = null
        if (likeListLength == arrayNumber) {
            index = 0
        } else {
            index = arrayNumber + 1
        }
        this.setState({
            arrayNumber: index,
            title: this.state.likeList[index].title,
            photo: this.state.likeList[index].photo,
            videoId: this.state.likeList[index].id,
            isOpened: !this.state.videoMode
        })
    }

    shuffleForLike() {
        let likeListLength = parseInt(this.state.likeList.length) - 1,
            arrayNumber = parseInt(this.state.arrayNumber),
            index = null
        const randomNumber = Math.floor(Math.random() * likeListLength)
        this.setState({
            arrayNumber: randomNumber,
            title: this.state.likeList[randomNumber].title,
            photo: this.state.likeList[randomNumber].photo,
            videoId: this.state.likeList[randomNumber].id,
            isOpened: !this.state.videoMode
        })
    }

    onEnd() {
        if (this.state.repeat && !this.state.shuffle) {
            if (this.state.playFromLike) {
                this.skipNextWardForLike()
            } else {
                this.skipNextWard()
            }
        } else if (this.state.shuffle) {
            if (this.state.playFromLike) {
                this.shuffleForLike()
            } else {
                const randomNumber = Math.floor(Math.random() * 20)
                this.setState({
                    arrayNumber: randomNumber,
                    title: this.props.data[randomNumber].snippet.title,
                    photo: this.props.data[randomNumber].snippet.thumbnails.high.url,
                    videoId: this.props.data[randomNumber].id.videoId,
                    isOpened: !this.state.videoMode
                })
            }
        }
    }

    shuffle() {
        this.setState({
            shuffle: !this.state.shuffle,
            repeat: false
        })
    }

    repeat() {
        this.setState({
            shuffle: false,
            repeat: !this.state.repeat
        })
    }

    backToList(event) {
        this.setState({
            isOpened: false
        })
    }

    reOpen() {
        this.setState({
            isOpened: !this.state.videoMode
        })
    }

    like(event) {
        let arrayNumber = null,
            result = false,
            currentVideoId = this.state.videoId

        function findElement(item, index) {
            if (item.id == currentVideoId) {
                return (
                    result = true,
                        arrayNumber = index
                )
            } else {
                return (
                    result = false
                )
            }
        }

        let newItem = {
            id: this.state.videoId,
            title: this.state.title,
            photo: this.state.photo
        }
        let newList = this.state.likeList
        newList.find(findElement)
        if (result) {
            newList.splice(arrayNumber, 1)
            this.setState({
                likeActive: false
            })
            console.log('item removed')
        } else {
            newList.push(newItem)
            this.setState({
                likeList: newList,
                likeActive: true
            })
        }
        // Add to LocalStorage
        const source = this.state.likeList
        localStorage.setItem('likeList', JSON.stringify(source))
        console.log('local storage is work')
    }

    handleUserList() {
        this.setState({
            activeUserList: !this.state.activeUserList
        })
    }

    handleFromList(event) {
        const id = event.target.id,
            title = this.state.likeList[id].title,
            photo = this.state.likeList[id].photo,
            videoId = this.state.likeList[id].id
        this.setState({
            arrayNumber: id,
            title: title,
            photo: photo,
            videoId: videoId,
            activeUserList: false,
            likeActive: true,
            playFromLike: true
        })
    }

    handleVideoMode() {
        this.setState({
            videoMode: !this.state.videoMode,
            isOpened: this.state.videoMode
        });
    }

    searchFromList(event) {
        const value = event.target.value,
            length = value.length,
            likeList = this.state.likeList,
            searchList = []

        if (length > 0) {
            likeList.filter((item) => {
                if (item.title.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                    return searchList.push(item)
                }
            })
            setTimeout(() => {
                this.setState({
                    likeList: searchList
                })
            }, 100)
        } else {
            const source = JSON.parse(localStorage.getItem('likeList'))
            if (source == null) {
                return false
            } else {
                this.setState({
                    likeList: source
                })
            }
        }
    }

    componentDidMount() {
        const source = JSON.parse(localStorage.getItem('likeList'))
        if (source == null) {
            return false
        } else {
            this.setState({
                likeList: source
            })
        }
    }
}

export default List