import React from 'react';
import UserList from '../user-list/user-list';
import { User } from '../../models/user';
import UserApi from '../../api/user';
import OvertimeApi from '../../api/overtime';
import AddUser from '../add-user/add-user';
import { Box, Snackbar } from '@material-ui/core';
import classes from './overtime.module.scss';
import classNames from 'classnames';
import { showNoticeDialog } from '../dialog-notice/dialog-notice';

interface OvertimeState {
    all: User[]
    overtime: User[]
    isShowWarn: boolean
    snakeMsg: string
}

export default class Overtime extends React.Component<{}, OvertimeState> {

    constructor(props: {}) {
        super(props)
        this.state = { all: [], overtime: [], isShowWarn: false, snakeMsg: "" }
    }

    componentDidMount() {
        this.load()
    }

    load() {
        this.loadAll()
        this.loadToday()
    }

    loadAll() {
        let api = new UserApi()
        api.all()
            .then((response) => {
                this.setState({ all: response })
            })
    }

    loadToday() {
        let api = new OvertimeApi()
        api.todayList()
            .then((response) => {
                this.setState({ overtime: response })
            })
    }

    onClickItemOfAll(user: User) {
        let api = new OvertimeApi()
        api.joinToday(user.id).then(() => {
            this.loadToday()
            this.setState({ isShowWarn: true, snakeMsg: `${user.name} 今天加班` })
        })
    }

    copyTodayUsers() {
        if (this.state.overtime.length === 0) {
            showNoticeDialog("今天没人加班")
            return
        }
        const list = this.state.overtime.map((user) => user.name).join(",")
        navigator.clipboard.writeText(`加班人员: ${list}`)
        this.setState({ isShowWarn: true, snakeMsg: "加班名单拷贝完成" })
    }

    onWarnClose() {
        this.setState({ isShowWarn: false })
    }

    render() {
        const containerStyle = classNames(
            classes.container,
        )
        const clickableStyle = classNames(
            classes.clickable,
        )
        return <div>
            <AddUser onAdd={() => { this.loadAll() }} />
            <Box className={containerStyle}>
                <Box width="45%">
                    <h3>所有人:</h3>
                    <UserList users={this.state.all} itemClickHandle={(user) => this.onClickItemOfAll(user)} />
                </Box>
                <Box width="45%">
                    <h3
                        className={clickableStyle}
                        onClick={this.copyTodayUsers.bind(this)
                        }>今日加班({this.state.overtime.length}):</h3>
                    <UserList users={this.state.overtime} />
                </Box>
            </Box>
            <Snackbar
                open={this.state.isShowWarn}
                onClose={this.onWarnClose.bind(this)}
                autoHideDuration={1000}
                message={this.state.snakeMsg}
            />
            <div id="dialog" />
        </div>
    }
}