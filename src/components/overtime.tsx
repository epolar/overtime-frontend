import React from 'react';
import UserList from './user-list'
import { User } from '../models/user'
import UserApi from '../api/user'
import OvertimeApi from '../api/overtime'
import AddUser from './add-user';

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
        api.joinToday(user.id).then(() => this.loadToday())
    }

    render() {
        return <div>
            <AddUser onAdd={() => { this.loadAll() }} />
            <h3>所有人:</h3>
            <UserList users={this.state.all} itemClickHandle={(user) => this.onClickItemOfAll(user)} />
            <h3>今日加班:</h3>
            <UserList users={this.state.overtime} />
        </div>
    }
}