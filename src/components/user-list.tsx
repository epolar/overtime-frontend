import React from 'react';
import { User } from '../models/user';
import { List, ListItem, ListItemText } from '@material-ui/core';

interface ElementProps {
    name: string
    clickHandle?: () => any
}

class UserElement extends React.Component<ElementProps> {
    render() {
        return <ListItem button>
            <ListItemText primary={this.props.name} onClick={this.props.clickHandle} />
        </ListItem>
    }
}

interface ListProps {
    users: User[]
    itemClickHandle?: (user: User) => any
}

// React.Component<Props, State>，如果不要State可以不传，不要Props可以传一个{}表示any
// TypeScript 可以不写 constructor
export default class UserList extends React.Component<ListProps> {
    render() {
        if (this.props.users.length === 0) {
            return <span>此处空空如也...</span>
        }
        return this.props && <List>
            {
                this.props.users.map((user) => {
                    // 每个user.id需要key，这个是react标准，如果不写这个key则console会有警告
                    // clickHandle={() => this.itemClickHandle(user)} 会要求 itemCLickHandle 必须有值，而可选值可以使用下面句式做
                    return <UserElement key={user.id} name={user.name} clickHandle={this.props.itemClickHandle?.bind(this, user)} />
                })
            }
        </List>
    }
}