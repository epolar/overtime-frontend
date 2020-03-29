import React from 'react'
import UserApi from '../api/user'
import { Input, Button } from '@material-ui/core'

interface Props {
    onAdd?: () => any
}

interface State {
    inputName: string
    inputLabel: string
}

export default class AddUser extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            inputName: "",
            inputLabel: ""
        }
    }

    onInputName(text: string) {
        this.setState({ inputName: text })
    }

    onInputLabel(text: string) {
        this.setState({ inputLabel: text })
    }

    add() {
        let name = this.state.inputName
        if (name.length === 0) {
            alert("请输入姓名")
            return
        }
        let label = this.state.inputLabel
        if (label.length === 0) {
            alert("请输入标签")
            return
        }

        let api = new UserApi()
        api.add(name, label).then(() => {
            this.props.onAdd && this.props.onAdd()
            this.setState({
                inputName: "",
                inputLabel: ""
            })
        })
    }

    render() {
        return <div>
            姓名: <Input
                value={this.state.inputName}
                onChange={(e) => this.onInputName(e.target.value)}
            />
            标签: <Input
                value={this.state.inputLabel}
                onChange={(e) => this.onInputLabel(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={() => this.add()}
            >添加</Button>
        </div>
    }
}