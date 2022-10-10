const Models = require("../model/index");
const fs = require("fs");
exports.addItem = async (req, res) => {
  try {
    const fileImg = req.files;
    let arrImg = [];
    for (let i = 0; i < fileImg.length; i++) {
      const url = `http://localhost:3001/${fileImg[i].filename}`;
      arrImg.push(url);
    }
    await Models.create({ name: req.body.name, img: arrImg, time: Date.now() });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Models.findByIdAndDelete(id);
    for (let i = 0; i < data.img.length; i++) {
      fs.unlinkSync(`media/${data.img[i].slice(22)}`);
    }
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const fileImg = req.files;
    let arrImg = [];
    for (let i = 0; i < fileImg.length; i++) {
      const url = `http://localhost:3001/${fileImg[i].filename}`;
      arrImg.push(url);
    }
    if (fileImg.length === 0) {
      await Models.findByIdAndUpdate(id, { name: name });
    } else {
      const data = await Models.findByIdAndUpdate(id, {
        name: name,
        img: arrImg,
      });
      for (let i = 0; i < data.img.length; i++) {
        fs.unlinkSync(`media/${data.img[i].slice(22)}`);
      }
    }
    res.send({ message: "Success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.paginateItem = async (req, res) => {
  try {
    const limit = +req.query.limit;
    const activePage = +req.query.activePage;
    const skip = (activePage - 1) * limit;
    const totalRecord = await Models.countDocuments({});
    const totalPage = Math.ceil(totalRecord / limit);
    const listData = await Models.find({}).skip(skip).limit(limit);
    res.send({ listData, totalPage, message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.searchItem = async (req, res) => {
  try {
    const nameSearch = req.query.nameSearch;
    const limit = +req.query.limit;
    const activePage = +req.query.activePage;
    const skip = (activePage - 1) * limit;
    const totalRecord = await Models.countDocuments({
      name: { $regex: nameSearch, $options: "i" },
    });
    const totalPage = Math.ceil(totalRecord / limit);
    const listData = await Models.find({
      name: { $regex: nameSearch, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    res.send({ listData, totalPage, message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};

exports.deleteOneItem = async (req, res) => {
  try {
    const id = req.query.id;
    const index = req.query.index;
    const Item = await Models.findById(id);
    fs.unlinkSync(`media/${Item.img[index].slice(22)}`);
    await Item.img.splice(index, 1);
    await Models.findByIdAndUpdate(id, { img: Item.img });
    res.send({ message: "success" });
  } catch (error) {
    res.send({ message: "error" });
  }
};