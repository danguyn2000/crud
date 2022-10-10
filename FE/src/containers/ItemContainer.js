import * as actions from "../actions/ItemPageAction";
import { connect } from "react-redux";
import ItemComponent from "../components/ItemComponent";
import React, { Component } from "react";

class ItemContainer extends Component {
  componentDidMount() {
    this.props.paginateItem(1);
  }
  render() {
    return (
      <div>
        <ItemComponent {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    listData: state.items.listData,
    totalPage: state.items.totalPage,
    activePage: state.items.activePage,
    nameSearch: state.items.nameSearch,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    paginateItem: (data) => {
      dispatch(actions.paginateItemRequest(data));
    },
    addItem: (data) => {
      dispatch(actions.addItemRequest(data));
    },
    deleteItem: (data) => {
      dispatch(actions.deleteItemRequest(data));
    },
    updateItem: (data) => {
      dispatch(actions.updateItemRequest(data));
    },
    searchItem: (data) => {
      dispatch(actions.searchItemRequest(data));
    },
    deleteOneItem: (data) => {
      dispatch(actions.deleteOneItemRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer);
