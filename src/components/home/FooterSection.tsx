import * as React from "react";
import { ComponentBase } from "../ComponentBase";
import './HomeStyles.css';
import { ReportingStore } from "../../stores/ReportingStore";
import { ToastContainer, toast, ToastType } from 'react-toastify';

class State {
    enable: boolean
    constructor(enable: boolean) {
        this.enable = enable
    }
}
export class FooterSection extends ComponentBase<any, any> {

    constructor(props: any) {
        super(props)
        this.state = new State(false)
        this.subscription.add(ReportingStore.dataSourceGridObservable.pipe().subscribe(objs => {
            this.setState({ enable: objs && objs.Data && objs.Data.length > 0 })
        }))
    }
    handleLoadMore = () => {
        if (!this.state.enable) {
            this.notify("Please Search Data First or waiting data loading")
            return
        }

        this.setState({ enable: false })
        setTimeout(() => {
            this.setState({ enable: true })
        }, 2000);
    }
    render() {
        return (
            <div>
                <div className="bottomCenterButton">
                    <div className={this.state.enable ?
                        "ableButton btn btn-default btnCommon btnHeader longButton" :
                        "disableButton btn btn-default btnCommon btnHeader longButton"}
                        onClick={() => this.handleLoadMore()}>
                        <span>Load more</span>
                    </div>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        )
    }

    notify = (message: string) => {
        toast(message, { type: ToastType.WARNING })
    }
}