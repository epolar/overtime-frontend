import React from 'react'
import ReactDOM from 'react-dom'
import { Dialog, DialogContentText, Button } from '@material-ui/core'

interface props {
    message: string
}

interface state {
    open: boolean
}

export default class DialogNotice extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = { open: true }
    }

    close() {
        this.setState({ open: false })
        ReactDOM.render(
            <div id="dialog" />,
            document.getElementById("dialog")
        )
    }

    render() {
        return <Dialog
            open={this.state.open}
            id="dialog"
        >
            <DialogContentText>
                {this.props.message}
            </DialogContentText>
            <Button onClick={this.close.bind(this)}>确认</Button>
        </Dialog>
    }
}

export function showNoticeDialog(message: string) {
    ReactDOM.render(
        <DialogNotice message={message} />,
        document.getElementById("dialog")
    )
}