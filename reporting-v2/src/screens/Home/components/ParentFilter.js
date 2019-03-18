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
    updateFilter: PropTypes.func.isRequired
  }

  static defaultProps = {
    FilterTypes: []
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      column: '',
      value: '',
    };
  }

  changeColumn = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      column: value
    })
  }

  changeValue = (e) => {
    const { value } = e.currentTarget;
    this.setState({
      value
    })
  }

  resetFilter = () => {
    this.setState({
      value: '',
      column: '',
      popoverOpen: false
    })
  }

  updateFilter = () => {
    const { column, value } = this.state;
    const { updateFilter } = this.props;
    if (value && column) {
      updateFilter(column, value);
      this.setState({
        popoverOpen: false
      })
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }


  render() {
    const { FilterTypes } = this.props;
    const { column, value } = this.state;
    return (
      <div className="c-parent-filter">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">SØG PÅ BRUGER ATTRIBUTER</LabelHeader>
        <Button id="Popover2" color="link" onClick={this.toggle} title="Choose...">
          {(column && value) ? (
            <span>{`${column} = ${value}`}</span>
          ) : (
            <span>Vælg...</span>
          )}
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover2" toggle={this.toggle}>
          <PopoverBody>
            <h6 title="SELECT USER ATTRIBUTES">VÆLG BRUGER ATTRIBUTER</h6>
            <FormGroup tag="fieldset">
              {FilterTypes.map((item, index) => (
                <FormGroup check key={index}>
                  <CustomInput
                    type="radio"
                    id={`customRadio${index}`}
                    name="customRadio"
                    label={item}
                    value={item}
                    checked={(item === column)}
                    onChange={this.changeColumn}
                  />
                </FormGroup>
              ))}
            </FormGroup>
            <h6 title="SEARCH FOR USER ATTRIBUTES">SØG PÅ BRUGER ATTRIBUTER</h6>
            <div className="form-group">
              <Input required value={value} onChange={this.changeValue} />
            </div>
            <div className="form-group d-flex justify-content-end">
              <Button onClick={this.resetFilter} title="Reset Filter" className="mr-2" outline>Ryd filter</Button>
              <Button title="Add" color="primary" onClick={this.updateFilter}>Tilføj</Button>
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
