var db = require("../config/connection");
var collections = require("../config/collections");
const bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;
const { search } = require("../routes/users");



module.exports = {

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },

  getAllbranchpros: () => {
    return new Promise(async (resolve, reject) => {
      let branchpros = await db
        .get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .find()
        .toArray();
      resolve(branchpros);
    });
  },

  getAllteams: () => {
    return new Promise(async (resolve, reject) => {
      let teams = await db
        .get()
        .collection(collections.TEAM_COLLECTION)
        .find()
        .toArray();
      resolve(teams);
    });
  },

  getAllpolicies: () => {
    return new Promise(async (resolve, reject) => {
      let policies = await db
        .get()
        .collection(collections.POLICY_COLLECTION)
        .find()
        .toArray();
      resolve(policies);
    });
  },

  getAllmissions: () => {
    return new Promise(async (resolve, reject) => {
      let missions = await db
        .get()
        .collection(collections.MISSION_COLLECTION)
        .find()
        .toArray();
      resolve(missions);
    });
  },

  getAllvisions: () => {
    return new Promise(async (resolve, reject) => {
      let visions = await db
        .get()
        .collection(collections.VISION_COLLECTION)
        .find()
        .toArray();
      resolve(visions);
    });
  },
  getAllstores: () => {
    return new Promise(async (resolve, reject) => {
      let stores = await db
        .get()
        .collection(collections.STORE_COLLECTION)
        .find()
        .toArray();
      resolve(stores);
    });
  },

  ///////GET ALL gallery/////////////////////                                            
  getAllgalleries: () => {
    return new Promise(async (resolve, reject) => {
      let galleries = await db
        .get()
        .collection(collections.GALLERY_COLLECTION)
        .find()
        .toArray();
      resolve(galleries);
    });
  },


  getsubProductsByBrand: (brands,cat) => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ brand: brands,subcategory:cat } )
        .toArray();
      resolve(products);
    });

  },
  getsubsubProductsByBrand: (brands,cat) => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ brand: brands,subsubcategory:cat } )
        .toArray();
      resolve(products);
    });

  },
  // getsubsubProductsByBrand: (brands,cat) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //     let products = await db
  //       .get()
  //       .collection(collections.PRODUCT_COLLECTION)
  //       .aggregate([
  //         { $match: {brand: brands,subsubcategory:cat  } },
  //         {
  //           $lookup: {
  //             from: collections.SUBSUBCATEGORY_COLLECTION,
  //             localField: "subsubcategory",
  //             foreignField: "name", // Assuming "name" is the field in CATEGORY_COLLECTION that matches with the category field in PRODUCT_COLLECTION
  //             as: "categoryDetails"
  //           }
  //         },
  //         { $unwind: "$categoryDetails" },
  //         {
  //           $group: {
  //             _id: "$category",
  //             doc: { $push: "$$ROOT" },
  //             catid: { $push: "$categoryDetails._id" }
  //           }
  //         },
  //         {
  //           $addFields: {
  //             "doc.catid": "$catid"
  //           }
  //         }

  //       ])
  //       .toArray();
  //       if (products.length > 0) {
  //         resolve(products.map(product => product.doc));
  //       } else {
  //         resolve([]);
  //       }
  //     }catch (error) {
  //       reject(error);
  //     }
  //   });

  // },

  getDistinctCategoryByBrand: (brand) => {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await db
          .get()
          .collection(collections.PRODUCT_COLLECTION)
          .aggregate([
            { $match: { brand: brand } },
            {
              $lookup: {
                from: collections.CATEGORY_COLLECTION,
                localField: "category",
                foreignField: "name", // Assuming "name" is the field in CATEGORY_COLLECTION that matches with the category field in PRODUCT_COLLECTION
                as: "categoryDetails"
              }
            },
            { $unwind: "$categoryDetails" },
            {
              $group: {
                _id: "$category",
                doc: { $first: "$$ROOT" },
                catid: { $first: "$categoryDetails._id" }
              }
            },
            {
              $addFields: {
                "doc.catid": "$catid"
              }
            }
          ])
          .toArray();
  
        if (products.length > 0) {
          resolve(products.map(product => product.doc));
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  
  getDistinctSubCategoryByBrand :(brand,cat) => {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await db
          .get()
          .collection(collections.PRODUCT_COLLECTION)
          .aggregate([
            { $match: { brand: brand,category:cat} },
            {
              $lookup: {
                from: collections.SUBPRODUCT_COLLECTION,
                localField: "subcategory",
                foreignField: "name", // Assuming "name" is the field in CATEGORY_COLLECTION that matches with the category field in PRODUCT_COLLECTION
                as: "categoryDetails"
              }
            },
            { $unwind: "$categoryDetails" },
            { $group: { _id: "$subcategory", doc: { $first: "$$ROOT" } , catid: { $first: "$categoryDetails._id" }} },
            {
              $addFields: {
                "doc.catid": "$catid"
              }
            }
          ])
          .toArray();
  
        if (products.length > 0) {
          resolve(products.map(product => product.doc));
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  getDistinctSubSubCategoryByBrand :(brand,cat) => {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await db
          .get()
          .collection(collections.PRODUCT_COLLECTION)
          .aggregate([
            { $match: { brand: brand,subcategory:cat} },
            {
              $lookup: {
                from: collections.SUBSUBCATEGORY_COLLECTION,
                localField: "subsubcategory",
                foreignField: "name", // Assuming "name" is the field in CATEGORY_COLLECTION that matches with the category field in PRODUCT_COLLECTION
                as: "categoryDetails"
              }
            },
            { $unwind: "$categoryDetails" },
            { $group: { _id: "$subsubcategory", doc: { $first: "$$ROOT" } , catid: { $first: "$categoryDetails._id" }} },
            {
              $addFields: {
                "doc.catid": "$catid"
              }
            }
          ])
          .toArray();
  
        if (products.length > 0) {
          resolve(products.map(product => product.doc));
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  
  

  getProductsByCategory: (cat) => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .find({ maincategory: cat })
        .toArray();
      resolve(products);
    });

  },
  getSubSubProducts:(cat)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .find({ subcategory: cat })
        .toArray();
      resolve(products);
    });
  },
  getSubProducts:(cat)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .find({ head: cat })
        .toArray();
      resolve(products);
    });
  },
  getSubBrdProducts:(cat,brd)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ category: cat,brand:brd })
        .toArray();
      resolve(products);
    });
  },
  getProductsforsubproducts:(cat)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ subcategory: cat })
        .toArray();
      resolve(products);
    });
  },
  getSingleProducts:(name)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ name: name })
        .toArray();
      resolve(products);
    });
  },
  getProductsforsubsubproducts:(cat)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({  subsubcategory: cat })
        .toArray();
      resolve(products);
    });
  },
  getSingleBrdProducts:(cat,brd)=>{
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({ name: cat ,brand:brd})
        .toArray();
      resolve(products);
    });
  },

  getBranchprosByBranch: (bb) => {
    return new Promise(async (resolve, reject) => {
      let branchpros = await db
        .get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .find({ branch: bb })
        .toArray();
      resolve(branchpros);
    });

  },

  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      userData.Password = await bcrypt.hash(userData.Password, 10);
      db.get()
        .collection(collections.USERS_COLLECTION)
        .insertOne(userData)
        .then((data) => {
          resolve(data.ops[0]);
        });
    });
  },

  doSignin: (userData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let user = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .findOne({ Email: userData.Email });
      if (user) {
        bcrypt.compare(userData.Password, user.Password).then((status) => {
          if (status) {
            console.log("Login Success");
            response.user = user;
            response.status = true;
            resolve(response);
          } else {
            console.log("Login Failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("Login Failed");
        resolve({ status: false });
      }
    });
  },

  //   searchProduct: (details) => {
  //     console.log("searched +++++++ ");
  //     return new Promise(async (resolve, reject) => {
  //       var result = await db
  //         .get()
  //         .collection(collections.PRODUCT_COLLECTION)
  //         .find({
  //           Name: new RegExp(details.search, "i"),
  //         })
  //         .toArray();
  //       console.log(result);
  //       resolve(result);
  //     });
  //   },
  // };
  // searchProduct: (details) => {
  //   console.log(details);
  //   return new Promise(async (resolve, reject) => {
  //     let result = await db
  //       .get()
  //       .collection(collections.PRODUCT_COLLECTION)
  //       .find({
  //         $text: {
  //           $search:"HDPE Pipe & Fittings",
  //         },
  //       })
  //       .toArray();
  //     resolve(result);
  //   });
  // },
  searchProduct: (details) => {
    console.log("searched +++++++ ");
    return new Promise(async (resolve, reject) => {
      var result = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find({
          name: new RegExp(details.search, "i"),
        })
        .toArray();
      console.log(result);
      resolve(result);
    });
  },

  updateBrandAll:()=>{
    return new Promise(async (resolve, reject) => {
      const updateOperation = {
        $set: { brand: ["Cosmoplast"] }
      };
      var result = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .updateMany({}, updateOperation, (err, result) => {
          if (err) {
            console.error('Error occurred while updating documents', err);
          } else {
            console.log(`${result.modifiedCount} documents updated successfully`);
          }
        }
        )
       
    
      resolve(result);
    });
  }
  

  // searchProduct: (details) => {
  //   console.log(details);
  //   return new Promise(async (resolve, reject) => {
  //     db.get()
  //       .collection(collections.PRODUCT_COLLECTION)
  //       .createIndex({ name: "text" }).then(async () => {
  //         let result = await db
  //           .get()
  //           .collection(collections.PRODUCT_COLLECTION)
  //           .find({
  //             $text: {
  //               $search: details.search,
  //             },
  //           })
  //           .toArray();
  //         resolve(result);
  //       })

  //   });
  // },
};
