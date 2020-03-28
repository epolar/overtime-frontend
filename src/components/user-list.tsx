import React from 'react';
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
export default class UserList extends React.Component<UserListContent> {

    render() {
        return this.props && <List>
            {
                this.props.users.map((user) => {
                    // 每个user.id需要key，这个是react标准，如果不写这个key则console会有警告
                    return <UserElement key={user.id} name={user.name} />
                })
            }
        </List>
    }
}