import React, { ReactElement } from "react";
import ReactDOM from "react-dom";

export function show(element: ReactElement) {
    ReactDOM.render(
        element,
        document.getElementById("dialog")
    )
}
export function dismiss() {
    ReactDOM.render(
        <div id="dialog" />,
        document.getElementById("dialog")
    )
}