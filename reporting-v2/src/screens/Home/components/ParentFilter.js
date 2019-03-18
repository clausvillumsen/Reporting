import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Popover, PopoverBody,
  Input,
  FormGroup,
  CustomInput
} from 'reactstrap';
import LabelHeader from '../../../components/LabelHeader';

class ParentFilter extends Component {
  static propTypes = {
    FilterTypes: PropTypes.array,
  }

  static defaultProps = {
    FilterTypes: []
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  render() {
    const { FilterTypes } = this.props;
    const radios = FilterTypes.map((item, index) => (
      <FormGroup check key={index}>
        <CustomInput type="radio" id={`customRadio${index}`} name="customRadio" label={item} />
      </FormGroup>
    ))
    return (
      <div>
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">SØG PÅ BRUGER ATTRIBUTER</LabelHeader>
        <Button id="Popover2" color="link" onClick={this.toggle} title="Choose...">
          Vælg...
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover2" toggle={this.toggle}>
          <PopoverBody>
            <h6 title="SELECT USER ATTRIBUTES">VÆLG BRUGER ATTRIBUTER</h6>
            <FormGroup tag="fieldset">
              {radios}
            </FormGroup>
            <h6 title="SEARCH FOR USER ATTRIBUTES">SØG PÅ BRUGER ATTRIBUTER</h6>
            <div className="form-group">
              <Input />
            </div>
            <div className="form-group d-flex justify-content-end">
              <Button title="Reset Filter" className="mr-2" outline>Ryd filter</Button>
              <Button title="Add" color="primary">Tilføj</Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    )
  }
}

export default connect(state => ({
  FilterTypes: state.report.FilterTypes
}))(ParentFilter);
