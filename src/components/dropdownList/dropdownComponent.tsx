import * as React from "react";
import Select from "react-select";
import styledComponents, { StyledComponentClass } from "styled-components";
import { DropdownModel } from "../../models/DropdownModel";

export interface DropdownProps {
  header: string;
  className: string;
  currentValue: DropdownModel;
  data: DropdownModel[];
}

class DropdownState {
  currentValue: DropdownModel;
  options: DropdownModel[];
  constructor(value: DropdownModel) {
    this.currentValue = value;
  }
}

export class DropdownComponent extends React.Component<
  DropdownProps,
  DropdownState
> {
  constructor(props: any) {
    super(props);
    this.state = new DropdownState(props.currentValue);
  }

  handleChange = (selected: DropdownModel) => {
    this.setState(prev => {
      return { ...prev, currentValue: selected };
    });
  };

  render() {
    //const customStyles = {
    //  control: this.props. => ({ ...styles, backgroundColor: "white" })
    //};

    return (
      <div className={this.props.className}>
        <div className="labelHeader">{this.props.header}</div>
        <Select
          value={this.state.currentValue}
          onChange={this.handleChange}
          options={this.props.data}
          //styles={customStyles}
        />
      </div>
    );
  }
}
