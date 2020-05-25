import React from "react";
import AddUser from "../add-user/add-user";
import UserApi from "../../api/user";
import { User } from "../../models/user";
import UserList from "../user-list/user-list";
import { showNoticeAsk } from "../dialog/ask";

interface State {
    all: User[]
}

export default class Manage extends React.Component<{}, State>{

    constructor(props: {}) {
        super(props)
        this.state = {
            all: []
        }

    }

    componentDidMount() {
        this.loadAll()
    }

    loadAll() {
        let api = new UserApi()
        api.all()
            .then((response) => {
                this.setState({ all: response })
            })
    }

    onItemClick(user: User) {
        showNoticeAsk(`确认删除${user.name}?`, () => {
            let api = new UserApi()
            api.del(user.id)
                .then(() => {
                    this.loadAll()
                })
        })
    }

    render() {
        return <div>
            <AddUser />
            <UserList
                users={this.state.all}
                itemClickHandle={this.onItemClick.bind(this)}
            />
            <div id="dialog" />
        </div>
    }
}