import React from 'react';
import UserApi from '../api/user';
import { User } from '../models/user';
import { List, ListItem } from '@material-ui/core';

interface Username {
    name: string
}

class UserElement extends React.Component<Username> {
    render() {
        return <ListItem>
            {this.props.name}
        </ListItem>
    }
}

interface UserListContent {
    users: User[]
}

// React.Component<Props, State>，如果不要State可以不传，不要Props可以传一个{}表示any
// TypeScript 可以不写 constructor
export default class UserList extends React.Component<{}, UserListContent> {

    // 组件挂载的时候加载数据
    componentDidMount() {
        this.load();
    }

    // 调用api获取到数据
    load() {
        let api = new UserApi()
        api.all()
            .then((response) => {
                // 这个设置和使用js的时候是一样的
                this.setState({ users: response })
            })
    }

    render() {
        return this.state && <List>
            {
                this.state.users.map((user) => {
                    // 每个user.id需要key，这个是react标准，如果不写这个key则console会有警告
                    return <UserElement key={user.id} name={user.name} />
                })
            }
        </List>
    }
}