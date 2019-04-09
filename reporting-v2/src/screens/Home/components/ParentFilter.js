import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Popover,
  PopoverBody,
  Input,
  FormGroup,
  CustomInput
} from 'reactstrap';
import isEmpty from 'lodash.isempty';
import LabelHeader from '../../../components/LabelHeader';
import { updateFilterColumn } from '../redux/action';

class ParentFilter extends Component {
  static propTypes = {
    FilterTypes: PropTypes.array,
    updateFilter: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
    column: PropTypes.string.isRequired,
    popoverOpen: PropTypes.bool.isRequired
  }

  static defaultProps = {
    FilterTypes: [],
    name: ''
  };

  changeColumn = (e) => {
    const { value, dataset: { name } } = e.currentTarget;
    const { dispatch } = this.props;
    dispatch(updateFilterColumn({ column: value, name }))
  }

  changeValue = e => {
    const { value } = e.currentTarget;
    const { dispatch } = this.props;
    dispatch(updateFilterColumn({ value }))
  }

  resetFilter = () => {
    const { dispatch } = this.props;
    dispatch(updateFilterColumn({
      value: '',
      column: '',
      popoverOpen: false
    }))
  }

  updateFilter = () => {
    const {
      updateFilter,
      column,
      value,
      dispatch
    } = this.props;
    if (value && column) {
      updateFilter(column, value);
      dispatch(updateFilterColumn({
        popoverOpen: false
      }))
    }
  };

  toggle = () => {
    const { dispatch, popoverOpen } = this.props;
    dispatch(updateFilterColumn({ popoverOpen: !popoverOpen }))
  }

  render() {
    const {
      FilterTypes,
      column,
      value,
      name,
      popoverOpen
    } = this.props;
    if (isEmpty(FilterTypes)) {
      return (
        <div className="c-parent-filter">
          <LabelHeader title="SEARCH FOR USER ATTRIBUTES">
            BRUGER ATTRIBUTER
          </LabelHeader>
          <Button id="Popover2" color="link" title="Choose...">
            {column && value ? (
              <span>{`${name} = ${value}`}</span>
            ) : (
              <span title="Choose...">Vælg...</span>
            )}
            <i className="caret" />
          </Button>
        </div>
      );
    }
    return (
      <div className="c-parent-filter">
        <LabelHeader title="SEARCH FOR USER ATTRIBUTES">
          BRUGER ATTRIBUTER
        </LabelHeader>
        <Button
          id="Popover2"
          color="link"
          onClick={this.toggle}
          title="Choose..."
        >
          {column && value ? (
            <span>{`${name} = ${value}`}</span>
          ) : (
            <span title="Choose...">Vælg...</span>
          )}
          <i className="caret" />
        </Button>
        <Popover placement="bottom" isOpen={popoverOpen} target="Popover2" toggle={this.toggle}>
          <PopoverBody>
            <LabelHeader title="SELECT USER ATTRIBUTES">
              VÆLG BRUGER ATTRIBUTER
            </LabelHeader>
            <FormGroup tag="fieldset">
              {FilterTypes.map((item, index) => (
                <FormGroup check key={index} style={{ paddingLeft: 0 }}>
                  <CustomInput
                    type="radio"
                    id={`customRadio${index}`}
                    name="customRadio"
                    label={item.Name}
                    value={item.Filter}
                    checked={item.Filter === column}
                    data-name={item.Name}
                    onChange={this.changeColumn}
                  />
                </FormGroup>
              ))}
            </FormGroup>
            <LabelHeader title="SEARCH FOR USER ATTRIBUTES">
              SØG PÅ BRUGER ATTRIBUTER (forskel på store og små bogstaver)
            </LabelHeader>
            <div className="form-group">
              <Input
                className="no-border"
                required
                value={value}
                onChange={this.changeValue}
              />
            </div>
            <div className="d-flex justify-content-between">
              <Button
                onClick={this.resetFilter}
                title="Reset Filter"
                color="link"
                size="sm"
                className="mr-2"
              >
                Ryd filter
              </Button>
              <Button
                title="Add"
                color="primary"
                className="common__btn-size"
                onClick={this.updateFilter}
              >
                Tilføj
              </Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}

export default connect(state => ({
  FilterTypes: state.report.FilterTypes,
  parentFilter: state.report.parentFilter,
  column: state.report.parentFilter.column,
  value: state.report.parentFilter.value,
  name: state.report.parentFilter.name,
  popoverOpen: state.report.parentFilter.popoverOpen,
}))(ParentFilter);
