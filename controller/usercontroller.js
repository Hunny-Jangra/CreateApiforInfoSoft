const UserModel = require("../model/userModel");

exports.getUserData = async (req, res) => {
  try {
    const getId = req.query.getID;
    console.log(getId);
    const getUserData = await UserModel.findById({ _id: getId });
    if (getUserData) {
      return res.status(200).send({
        status: true,
        data: getUserData,
      });
    }else{
        return res.status(400).send({
            status: false,
            message: `This userID : ${getId} is not available`
        })
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error,
    });
  }
};

exports.getAllUSerData = async (req, res) => {
  try {
    const getAllUsersData = await UserModel.find();
    if (getAllUsersData) {
      return res.status(200).send({
        status: true,
        data: getAllUsersData,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const getId = req.query.getDeleteID;
    console.log(getId);

    const DeleteUSerData = await UserModel.findByIdAndDelete({ _id: getId });
    return res.status(200).send({
      status: true,
      message: `USerData of this ${getId} is Successfully Deleted ....`,
    });
  }catch (error) {
    return res.status(500).send({
      status: false,
      message: error,
    });
  }
};
