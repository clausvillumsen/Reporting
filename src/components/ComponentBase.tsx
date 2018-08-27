import * as React from "react";
import * as ReactDOM from "react-dom";
import { Subscription } from "rxjs";

export class ComponentBase<P, S> extends React.Component<P, S> {
    protected subscription: Subscription
    constructor(props: any) {
        super(props)
        this.subscription = new Subscription();
    }

    componentWillUnmount(){
        this.subscription.unsubscribe();
    }
}