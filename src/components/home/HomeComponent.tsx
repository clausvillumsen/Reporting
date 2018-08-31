import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import { HeaderSection } from "./HeaderSection";
import { DropdownSection } from "./DropdownSection";
import { GridSection } from "./GridSection";
import { FooterSection } from "./FooterSection";
import './HomeStyles.css';
export class HomeComponent extends ComponentBase<any, any> {

    render() {
        return (<div className="HomePage">
            <HeaderSection />
            <DropdownSection />
            <GridSection />
            <FooterSection/>
        </div>)
    }

}