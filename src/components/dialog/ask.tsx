import React from 'react';
import { dismiss, show } from './action';
import { Dialog, DialogContentText, Button } from '@material-ui/core';

interface props {
    message: string
    onConfirmHandler?: () => any
}

interface state {
    open: boolean
}

export default class DialogAsk extends React.Component<props, state> {

    constructor(props: props) {
        super(props)
        this.state = { open: true }
    }

    close() {
        this.setState({ open: false })
        dismiss()
    }

    onClickConfirm() {
        this.close()
        this.props.onConfirmHandler?.()
    }

    render() {
        return <Dialog
            open={this.state.open}
            id="dialog"
        >
            <DialogContentText>
                {this.props.message}
            </DialogContentText>
            <Button onClick={this.close.bind(this)}>取消</Button>
            <Button onClick={this.onClickConfirm.bind(this)}>确定</Button>
        </Dialog>
    }
}

export function showNoticeAsk(msg: string, callback?: () => any) {
    show(<DialogAsk message={msg} onConfirmHandler={callback} />)
}