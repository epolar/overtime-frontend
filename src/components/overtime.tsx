import React from 'react';
import UserList from './user-list'
import { User } from '../models/user'
import UserApi from '../api/user'
import OvertimeApi from '../api/overtime'

interface OvertimeState {
    all: User[]
    overtime: User[]
}

export default class Overtime extends React.Component<{}, OvertimeState> {

    constructor(props: {}) {
        super(props)
        this.state = { all: [], overtime: [] }
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
                // 这个设置和使用js的时候是一样的
                this.setState({ all: response })
            })
    }

    loadToday() {
        let api = new OvertimeApi()
        api.todayList()
            .then((response) => {
                // 这个设置和使用js的时候是一样的
                this.setState({ overtime: response })
            })
    }

    render() {
        return <div>
            <UserList users={this.state.all} />
            <UserList users={this.state.overtime} />
        </div>
    }
}