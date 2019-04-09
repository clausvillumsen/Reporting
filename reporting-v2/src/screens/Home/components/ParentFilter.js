import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Popover, PopoverBody,
  Input,
  FormGroup,
  CustomInput
} from 'reactstrap';
import isEmpty from 'lodash.isempty';
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
      name: ''
    };
  }

  changeColumn = (e) => {
    const { value, dataset: { name } } = e.currentTarget;
    this.setState({
      column: value,
      name
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
    const { column, value, name } = this.state;
    if (isEmpty(FilterTypes)) {
      return (
        <div className="c-parent-filter">
          <LabelHeader title="SEARCH FOR USER ATTRIBUTES">BRUGER ATTRIBUTER</LabelHeader>
          <Button id="Popover2" color="link" title="Choose...">
            {(column && value) ? (
              <span>{`${name} = ${value}`}</span>
            ) : (
              <span title="Choose...">Vælg...</span>
            )}
            <i className="caret"/>
          </Button>
        </div>
      )
    }
    return (
      <div className="c-parent-filter">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">BRUGER ATTRIBUTER</LabelHeader>
        <Button id="Popover2" color="link" onClick={this.toggle} title="Choose...">
          {(column && value) ? (
            <span>{`${name} = ${value}`}</span>
          ) : (
            <span title="Choose...">Vælg...</span>
          )}
          <i className="caret"/>
        </Button>
        <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover2" toggle={this.toggle}>
          <PopoverBody>
            <LabelHeader title="SELECT USER ATTRIBUTES">VÆLG BRUGER ATTRIBUTER</LabelHeader>
            <FormGroup tag="fieldset">
              {FilterTypes.map((item, index) => (
                <FormGroup check key={index} style={{ paddingLeft: 0 }}>
                  <CustomInput
                    type="radio"
                    id={`customRadio${index}`}
                    name="customRadio"
                    label={item.Name}
                    value={item.Filter}
                    data-name={item.Name}
                    checked={(item.Filter === column)}
                    onChange={this.changeColumn}
                  />
                </FormGroup>
              ))}
            </FormGroup>
            <LabelHeader title="SEARCH FOR USER ATTRIBUTES">SØG PÅ BRUGER ATTRIBUTER</LabelHeader>
            <div className="form-group">
              <Input className="no-border" required value={value} onChange={this.changeValue} />
            </div>
            <div className="d-flex justify-content-between">
              <Button onClick={this.resetFilter} title="Reset Filter" color="link" size="sm" className="mr-2">Ryd filter</Button>
              <Button title="Add" color="primary" className="common__btn-size" onClick={this.updateFilter}>Tilføj</Button>
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
