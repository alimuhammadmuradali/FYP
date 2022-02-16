//const { schema } = require("../models/Office");
const advanceResults = (model, populate) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query }; //copy

  //field to exclude
  const removeFields = ["select", "sort", "limit", "page"];

  //loop and delete from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery); //query string

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //console.log(JSON.parse(queryStr));
  let strQuery = JSON.parse(queryStr);

  console.log(strQuery);
  query = model.find(strQuery);

  //select field
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  //paginatiion
  const total = await model.countDocuments();
  const page = parseInt(req.query.page, 10) || 1; //10 base  // page 1 default
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalPages = Math.ceil(total / limit);

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }
  var results = await query;

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.advanceResults = {
    success: true,
    count: results.length,
    total,
    totalPages,
    pagination,
    data: results,
  };
  console.log("in ad");
  next();
};

module.exports = advanceResults;
