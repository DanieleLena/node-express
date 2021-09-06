const { StatusCodes } = require("http-status-codes");
const path = require('path');
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// const uploadProductImageLocal = async (req, res) => {
//   if(!req.files) {
//     throw new CustomError.BadRequestError('No files uploaded')
//   }
//   const productImage = req.files.image;
//   if(!productImage.mimetype.startsWith('image')) {
//         throw new CustomError.BadRequestError("Please provide an image");
//   }
//   const maxSize = 1024 * 1024; // 1MB

//   if(productImage.size > maxSize) {
//         throw new CustomError.BadRequestError("The files is too big");

//   }

// const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`,);
// console.log(imagePath)
// await productImage.mv(imagePath);
// return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
// };

const uploadProductImage = async (req,res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename:true,
      folder: 'file-uploaded-tutorial'
    }
  )
fs.unlinkSync(req.files.image.tempFilePath); //remove the temp file from our server
  return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}



module.exports = {
  uploadProductImage,
};
