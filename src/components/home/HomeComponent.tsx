import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import { HeaderSection } from "./HeaderSection";
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
                <GridSection />
                <FooterSection onLoading={(isLoading: boolean) => this.handleLoading(isLoading)} />
                {this.state.loading && <div className="loadingContainer"><img className="loading" src={require("../../../img/loading.gif")} /></div>}
            </div>
        );
    }

    handleLoading = (isLoading: boolean) => {
        this.setState({ loading: isLoading })
    }
}
