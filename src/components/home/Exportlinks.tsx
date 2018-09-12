import { ComponentBase } from "../ComponentBase";
import * as React from "react";
import "./HomeStyles.css";

export class Exportlinks extends ComponentBase<any, any> {
  render() {
    return (
      <div className="header">
        <div className="headerRight">
          <p className="text-left">
            Download hele rapporten her:
            <a href="insert link from API here">CSV</a>
            &nbsp;
            <a href="insert link from API here">PDF</a>
            &nbsp;
            <a href="insert link from API here">XML</a>
            &nbsp;
            <a href="insert link from API here">JSON</a>
            &nbsp;
          </p>
        </div>
      </div>
    );
  }
}
