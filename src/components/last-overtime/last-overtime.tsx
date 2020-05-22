import React from 'react'
import { Button } from '@material-ui/core'
import { User } from '../../models/user'

interface Props {
    user?: User
    overtimeHandler?: (user: User) => any
    notMeHandler?: (user: User) => any
}

export default class LastOvertime extends React.Component<Props> {

    constructor(props: Props) {
        super(props)
    }

    onClickOvertimeClick() {
        if (this.props.user !== undefined) {
            this.props.overtimeHandler?.(this.props.user)
        }
    }

    onNotMeClick() {
        this.props.notMeHandler?.(this.props.user!)
    }

    render() {
        if (this.props.user) {
            return <div>
                {this.props.user.name} 今天加班吗?
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.onClickOvertimeClick()}
                >加班！</Button>
                <Button
                    variant="text"
                    color="primary"
                    onClick={() => this.onNotMeClick()}
                >这不是我</Button>
            </div>
        } else {
            return ""
        }
    }

}