const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      message: "Category created",
      category
    });

  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  console.log(req.user)
   try {
    const category = await Category.find();
    res.status(200).json({
      status: "success",
      category,
    });
 
  }catch (error) {
    console.log(error)
    res.status(400).json({
      message: "you can't get all",
      status: "fail",
      error,
    });
  } 
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(200).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteCategory = async (req, res) =>  {
  try {
    const category = await Category.deleteOne({_id:req.params.id})
    res.status(200).json({
      status: "success",
      message: "success deleted",
      category
    })
  }catch (error) {
    res.status(200).json({
      message:"category can not be deleted",
      error
    })
  }
}