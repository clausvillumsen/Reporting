import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import './HomeStyles.css';
export class HeaderSection extends ComponentBase<any, any> {
    render() {
        return (
            <div className="header">
                <div className="headerLeft">
                    <img className="applicationLogo" src={require("../../../img/logo.png")}></img>
                    <div className="Anvendelsesrapporter">Anvendelsesrapporter</div>
                </div>
            </div>
        )
    }
}

