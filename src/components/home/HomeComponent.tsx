import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import { HeaderSection } from "./HeaderSection";
import { DropdownSection } from "./DropdownSection";
import { GridSection } from "./GridSection";
import { FooterSection } from "./FooterSection";
import './HomeStyles.css';
import { GetReportAction } from "../../actions/GetReportAction";
export class HomeComponent extends ComponentBase<any, any> {
    constructor(props: any) {
        super(props)
        new GetReportAction().start();
    }
    render() {
        return (<div className="HomePage">
            <HeaderSection />
            <DropdownSection />
            <GridSection />
            <FooterSection/>
        </div>)
    }

}