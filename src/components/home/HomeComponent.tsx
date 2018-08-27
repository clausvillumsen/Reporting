import { ComponentBase } from "../ComponentBase";
import {StoreFactory} from "../../stores/StoreFactory"
import { ReactNode } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HomeStore } from "../../stores/HomeStore";

interface Props {

}

class UiState {

}
export class HomeComponent extends ComponentBase<Props, UiState> {
    constructor(props: any) {
        super(props)
        this.state = new UiState()
        StoreFactory.GetStore(HomeStore).test();
    }

    render(): ReactNode {
        return (<div >Hello It's Khoa</div>)
    }
}