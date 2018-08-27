import * as React from "react";
import * as ReactDOM from "react-dom";
import { HomeComponent } from "./components/home/HomeComponent";

export class Main extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
    };

    render() {
        return(
            <HomeComponent></HomeComponent>
        );
    };
}
ReactDOM.render(<Main/>, document.getElementById("main"));