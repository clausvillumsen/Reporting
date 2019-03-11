import * as React from "react";
import * as ReactDOM from "react-dom";
import 'font-awesome/css/font-awesome.min.css';
import { HomeComponent } from "./src/components/home/HomeComponent";

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