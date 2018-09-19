import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import { DropdownSection } from "./DropdownSection";
import { GridSection } from "./GridSection";
import { FooterSection } from "./FooterSection";
import { Exportlinks } from "./Exportlinks";
import "./HomeStyles.css";
import { GetReportAction } from "../../actions/GetReportAction";

class State {
    loading: boolean = false
}
export class HomeComponent extends ComponentBase<any, State> {
    constructor(props: any) {
        super(props);
        this.state = new State();
        new GetReportAction().start();
    }
    render() {
        return (
            <div className="HomePage">
                <DropdownSection onLoading={(isLoading: boolean) => this.handleLoading(isLoading)} />
                <Exportlinks onLoading={(isLoading: boolean) => this.handleLoading(isLoading)} />
                <GridSection onLoading={(isLoading: boolean) => this.handleLoading(isLoading)} />
                <FooterSection onLoading={(isLoading: boolean) => this.handleLoading(isLoading)} />
                {this.state.loading && <div><div className="loadingContainer"></div><i className="fa fa-refresh fa-spin loading"></i></div>}
            </div>
        );
    }

    handleLoading = (isLoading: boolean) => {
        this.setState({ loading: isLoading })
    }
}
