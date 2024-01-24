const Product = require("../Models/product.model.js");
const asyncErrorHandler = require("../Middlewares/asyncErrorHandler.js");
const cloudinary = require("cloudinary");
const SearchFeatures = require("../utils/searchFeatures.js");
const ErrorHandler = require("../utils/errorHandler.js");

// Get All Products
const getAllProducts = asyncErrorHandler(async (req, res, next) => {
  const resultPerPage = 12;
  const productsCount = await Product.countDocuments();

  const searchFeature = new SearchFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await searchFeature.query;
  let filteredProductsCount = products.length;

  searchFeature.pagination(resultPerPage);

  products = await searchFeature.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Products ---Product Sliders
const getProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
const getProductDetails = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products ---ADMIN
const getAdminProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Create Product ---ADMIN
const createProduct = asyncErrorHandler(async (req, res, next) => {
  console.log(req.body)
  try {
    const brandingLogo = req.files["logo"];
    const productImages = req.files["images"];

    const imagesLink = [];

    for (let i = 0; i < productImages.length; i++) {
      const result = await cloudinary.uploader.upload(
        productImages[i].tempFilePath,
        {
          folder: "products",
        }
      );

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const branded = await cloudinary.uploader.upload(
      brandingLogo.tempFilePath,
      {
        folder: "brands",
      }
    );

    const brandLogo = {
      public_id: branded.public_id,
      url: branded.secure_url,
    };

    const productData = {
      name: req.body.name,
      description: req.body.description,
      highlights: req.body.highlights,
      specifications: req.body.specifications,
      price: req.body.price,
      cuttedPrice: req.body.cuttedPrice,
      images: imagesLink,
      brand: {
        name: req.body.brandname,
        logo: brandLogo,
      },
      category: req.body.category,
      stock: req.body.stock,
      warranty: req.body.warranty,
      ratings: req.body.ratings,
      numOfReviews: req.body.numOfReviews,
      reviews: req.body.reviews,
      user: req.body.user,
    };

    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const updateProduct = asyncErrorHandler(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // Update images
    if (req.body.images !== undefined) {
      const images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];

      // Delete old images from cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.uploader.destroy(product.images[i].public_id);
      }

      const imagesLink = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      req.body.images = imagesLink;
    }

    // Update brand logo
    if (req.body.logo && req.body.logo.length > 0) {
      await cloudinary.uploader.destroy(product.brand.logo.public_id);
      const result = await cloudinary.uploader.upload(req.body.logo, {
        folder: "brands",
      });
      const brandLogo = {
        public_id: result.public_id,
        url: result.secure_url,
      };

      req.body.brand = {
        name: req.body.brandname,
        logo: brandLogo,
      };
    }

    // Parse specifications
    let specs = [];
    if (req.body.specifications && req.body.specifications.length > 0) {
      specs = req.body.specifications.map((s) => JSON.parse(s));
    }
    req.body.specifications = specs;

    req.body.user = req.user.id;

    // Update product
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  await Product.deleteOne({ _id: req.params.id });
  res.status(201).json({
    success: true,
    message: "Product deleted successfully!",
  });
});

const createProductReview = asyncErrorHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

const getProductReviews = asyncErrorHandler(async (req, res, next) => {

  const product = await Product.findById(req.query.id);

  if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
      success: true,
      reviews: product.reviews
  });
});

const deleteReview = asyncErrorHandler(async (req, res, next) => {

  const product = await Product.findById(req.query.productId);

  if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
  }

  const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

  let avg = 0;

  reviews.forEach((rev) => {
      avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
      ratings = 0;
  } else {
      ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
      reviews,
      ratings: Number(ratings),
      numOfReviews,
  }, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
  });
});

module.exports = {
  getAllProducts,
  getProducts,
  getProductDetails,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
};
