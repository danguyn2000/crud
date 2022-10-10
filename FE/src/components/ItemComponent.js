import React, { Component } from "react";
class ItemComponent extends Component {
  state = {
    name: "",
    id: "",
    fileImg: [],
    linkImg: [],
    nameUpdate: "",
    idUpdate: "",
    nameSearch: "",
  };

  isChange = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };

  handleAdd = (file) => {
    this.setState({
      fileImg: file,
    });
    let imgArr = [];
    for (let i = 0; i < file.length; i++) {
      const url = URL.createObjectURL(file[i]);
      imgArr.push(url);
    }
    this.setState({
      linkImg: imgArr,
    });
  };
  render() {
    let listData = [];
    if (this.props.listData) {
      listData = this.props.listData.map((item, key) => {
        return (
          <tr key={key}>
            <th>{key + 1}</th>
            <th>{item.name}</th>
            <th>
              {item.img.map((value, key) => {
                return (
                  <div key={key}>
                    <img alt="" src={value} width="100px" />
                    <button
                      onClick={() =>
                        this.props.deleteOneItem({ id: item._id, index: key })
                      }
                      style={{
                        visibility: item.img.length > 1 ? "visible" : "hidden",
                      }}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </th>
            <th>
              <button
                onClick={() =>
                  this.setState({
                    nameUpdate: item.name,
                    idUpdate: item._id,
                    linkImg: item.img,
                  })
                }
              >
                EDIT
              </button>
            </th>
            <th>
              <button onClick={() => this.props.deleteItem({ id: item._id })}>
                DELETE
              </button>
            </th>
          </tr>
        );
      });
    }

    let paginate = [];
    let totalPage = this.props.totalPage;
    let activePage = this.props.activePage;
    for (let i = 1; i <= totalPage; i++) {
      let button = (
        <button
          key={i}
          onClick={() =>
            this.props.nameSearch
              ? this.props.searchItem({
                  activePage: i,
                  nameSearch: this.props.nameSearch,
                })
              : this.props.paginateItem(i)
          }
          style={{ backgroundColor: activePage === i ? "red" : null }}
        >
          {i}
        </button>
      );
      paginate.push(button);
    }
    return (
      <div>
        <div>
          {this.state.linkImg.map((link, index) => {
            return (
              <div key={index}>
                <span>
                  <img src={link} alt="" width={90} />
                </span>
              </div>
            );
          })}
        </div>
        <input
          multiple
          type="file"
          onChange={(e) => this.handleAdd(e.target.files)}
        />
        <br />
        <input type="text" onChange={(e) => this.isChange(e, "name")} />
        <button
          onClick={() =>
            this.props.addItem({
              name: this.state.name,
              img: this.state.fileImg,
            })
          }
        >
          ADD
        </button>
        <br />
        <input
          onChange={(e) => this.isChange(e, "nameUpdate")}
          value={this.state.nameUpdate}
        />
        <button
          onClick={() =>
            this.props.updateItem({
              name: this.state.nameUpdate,
              id: this.state.idUpdate,
              img: this.state.fileImg,
            })
          }
        >
          UPDATE
        </button>
        <input onChange={(e) => this.isChange(e, "nameSearch")} />
        <button
          onClick={() =>
            this.props.searchItem({
              nameSearch: this.state.nameSearch,
              activePage: 1,
            })
          }
        >
          SEARCH
        </button>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>IMG</th>
              <th>ACTION</th>
            </tr>
            {listData}
          </tbody>
        </table>
        {paginate}
      </div>
    );
  }
}

export default ItemComponent;
