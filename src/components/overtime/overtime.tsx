import React from 'react';
import UserList from '../user-list/user-list';
import { User } from '../../models/user';
import UserApi from '../../api/user';
import OvertimeApi from '../../api/overtime';
import AddUser from '../add-user/add-user';
import LastOvertime from '../last-overtime/last-overtime';
import { Box, Snackbar } from '@material-ui/core';
import classes from './overtime.module.scss';
import classNames from 'classnames';
import { showNoticeDialog } from '../dialog-notice/dialog-notice';
import LastOvertimeRepo from '../../repo/last-overtime'

interface OvertimeState {
    all: User[]
    overtime: User[]
    isShowWarn: boolean
    snakeMsg: string
    lastUser?: User
}

export default class Overtime extends React.Component<{}, OvertimeState> {

    lastOvertimeRepo: LastOvertimeRepo

    constructor(props: {}) {
        super(props)
        this.lastOvertimeRepo = new LastOvertimeRepo()
        this.state = { all: [], overtime: [], isShowWarn: false, snakeMsg: "", lastUser: this.lastOvertimeRepo.get() }
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

    userOvertime(user: User) {
        let api = new OvertimeApi()
        api.joinToday(user.id).then(() => {
            this.loadToday()
            this.setState({ isShowWarn: true, snakeMsg: `${user.name} 今天加班`, lastUser: user })
            this.lastOvertimeRepo.set(user)
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

    delLastUser() {
        this.lastOvertimeRepo.del()
        this.setState({ lastUser: undefined })
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
            <LastOvertime
                user={this.state.lastUser}
                overtimeHandler={this.userOvertime.bind(this)}
                notMeHandler={this.delLastUser.bind(this)}
            />
            <Box className={containerStyle}>
                <Box width="45%">
                    <h3>所有人:</h3>
                    <UserList users={this.state.all} itemClickHandle={(user) => this.userOvertime(user)} />
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