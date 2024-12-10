var db = require("../config/connection");
var collections = require("../config/collections");
var bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;

module.exports = {


  ///////ADD subsubcategory/////////////////////                                         
  addsubsubcategory: (subsubcategory, callback) => {
    // console.log(subsubcategory);
    subsubcategory.Price = parseInt(subsubcategory.Price);
    db.get()
      .collection(collections.SUBSUBCATEGORY_COLLECTION)
      .insertOne(subsubcategory)
      .then((data) => {
        // console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL subsubcategory/////////////////////                                            
  getAllsubsubcategories: () => {
    return new Promise(async (resolve, reject) => {
      let subsubcategories = await db
        .get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .find()
        .toArray();
      resolve(subsubcategories);
    });
  },

  ///////ADD subsubcategory DETAILS/////////////////////                                            
  getsubsubcategoryDetails: (subsubcategoryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .findOne({
          _id: objectId(subsubcategoryId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE subsubcategory/////////////////////                                            
  deletesubsubcategory: (subsubcategoryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .removeOne({
          _id: objectId(subsubcategoryId)
        })
        .then((response) => {
          // console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE subsubcategory/////////////////////                                            
  updatesubsubcategory: (subsubcategoryId, subsubcategoryDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .updateOne(
          {
            _id: objectId(subsubcategoryId)
          },
          {
            $set: {
              Name: subsubcategoryDetails.Name,
              Category: subsubcategoryDetails.Category,
              Price: subsubcategoryDetails.Price,
              Description: subsubcategoryDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL subsubcategory/////////////////////                                            
  deleteAllsubsubcategories: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBSUBCATEGORY_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD subproduct/////////////////////                                         
  addsubproduct: (subproduct, callback) => {
    console.log(subproduct);
    subproduct.Price = parseInt(subproduct.Price);
    db.get()
      .collection(collections.SUBPRODUCT_COLLECTION)
      .insertOne(subproduct)
      .then((data) => {
        // console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL subproduct/////////////////////                                            
  getAllsubproducts: () => {
    return new Promise(async (resolve, reject) => {
      let subproducts = await db
        .get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(subproducts);
    });
  },

  ///////ADD subproduct DETAILS/////////////////////                                            
  getsubproductDetails: (subproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .findOne({
          _id: objectId(subproductId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE subproduct/////////////////////                                            
  deletesubproduct: (subproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .removeOne({
          _id: objectId(subproductId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE subproduct/////////////////////                                            
  updatesubproduct: (subproductId, subproductDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .updateOne(
          {
            _id: objectId(subproductId)
          },
          {
            $set: {
              name: subproductDetails.name,
              head: subproductDetails.head,
              brand: subproductDetails.brand,
              desc: subproductDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL subproduct/////////////////////                                            
  deleteAllsubproducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUBPRODUCT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD mepproduct/////////////////////                                         
  addmepproduct: (mepproduct, callback) => {
    console.log(mepproduct);
    mepproduct.Price = parseInt(mepproduct.Price);
    db.get()
      .collection(collections.MEPPRODUCT_COLLECTION)
      .insertOne(mepproduct)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL mepproduct/////////////////////                                            
  getAllmepproducts: () => {
    return new Promise(async (resolve, reject) => {
      let mepproducts = await db
        .get()
        .collection(collections.MEPPRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(mepproducts);
    });
  },

  ///////ADD mepproduct DETAILS/////////////////////                                            
  getmepproductDetails: (mepproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEPPRODUCT_COLLECTION)
        .findOne({
          _id: objectId(mepproductId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE mepproduct/////////////////////                                            
  deletemepproduct: (mepproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEPPRODUCT_COLLECTION)
        .removeOne({
          _id: objectId(mepproductId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE mepproduct/////////////////////                                            
  updatemepproduct: (mepproductId, mepproductDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEPPRODUCT_COLLECTION)
        .updateOne(
          {
            _id: objectId(mepproductId)
          },
          {
            $set: {
              Name: mepproductDetails.Name,
              Category: mepproductDetails.Category,
              Price: mepproductDetails.Price,
              Description: mepproductDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL mepproduct/////////////////////                                            
  deleteAllmepproducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEPPRODUCT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD mep/////////////////////                                         
  addmep: (mep, callback) => {
    console.log(mep);
    mep.Price = parseInt(mep.Price);
    db.get()
      .collection(collections.MEP_COLLECTION)
      .insertOne(mep)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL mep/////////////////////                                            
  getAllmeps: () => {
    return new Promise(async (resolve, reject) => {
      let meps = await db
        .get()
        .collection(collections.MEP_COLLECTION)
        .find()
        .toArray();
      resolve(meps);
    });
  },

  ///////ADD mep DETAILS/////////////////////                                            
  getmepDetails: (mepId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEP_COLLECTION)
        .findOne({
          _id: objectId(mepId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE mep/////////////////////                                            
  deletemep: (mepId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEP_COLLECTION)
        .removeOne({
          _id: objectId(mepId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE mep/////////////////////                                            
  updatemep: (mepId, mepDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEP_COLLECTION)
        .updateOne(
          {
            _id: objectId(mepId)
          },
          {
            $set: {
              name: mepDetails.name,

            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL mep/////////////////////                                            
  deleteAllmeps: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MEP_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD pumpproduct/////////////////////                                         
  addpumpproduct: (pumpproduct, callback) => {
    console.log(pumpproduct);
    pumpproduct.Price = parseInt(pumpproduct.Price);
    db.get()
      .collection(collections.PUMPPRODUCT_COLLECTION)
      .insertOne(pumpproduct)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL pumpproduct/////////////////////                                            
  getAllpumpproducts: () => {
    return new Promise(async (resolve, reject) => {
      let pumpproducts = await db
        .get()
        .collection(collections.PUMPPRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(pumpproducts);
    });
  },

  ///////ADD pumpproduct DETAILS/////////////////////                                            
  getpumpproductDetails: (pumpproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMPPRODUCT_COLLECTION)
        .findOne({
          _id: objectId(pumpproductId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE pumpproduct/////////////////////                                            
  deletepumpproduct: (pumpproductId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMPPRODUCT_COLLECTION)
        .removeOne({
          _id: objectId(pumpproductId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE pumpproduct/////////////////////                                            
  updatepumpproduct: (pumpproductId, pumpproductDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMPPRODUCT_COLLECTION)
        .updateOne(
          {
            _id: objectId(pumpproductId)
          },
          {
            $set: {
              Name: pumpproductDetails.Name,
              Category: pumpproductDetails.Category,
              Price: pumpproductDetails.Price,
              Description: pumpproductDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL pumpproduct/////////////////////                                            
  deleteAllpumpproducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMPPRODUCT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD pump/////////////////////                                         
  addpump: (pump, callback) => {
    console.log(pump);
    db.get()
      .collection(collections.PUMP_COLLECTION)
      .insertOne(pump)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL pump/////////////////////                                            
  getAllpumps: () => {
    return new Promise(async (resolve, reject) => {
      let pumps = await db
        .get()
        .collection(collections.PUMP_COLLECTION)
        .find()
        .toArray();
      resolve(pumps);
    });
  },

  ///////ADD pump DETAILS/////////////////////                                            
  getpumpDetails: (pumpId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMP_COLLECTION)
        .findOne({
          _id: objectId(pumpId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE pump/////////////////////                                            
  deletepump: (pumpId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMP_COLLECTION)
        .removeOne({
          _id: objectId(pumpId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE pump/////////////////////                                            
  updatepump: (pumpId, pumpDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMP_COLLECTION)
        .updateOne(
          {
            _id: objectId(pumpId)
          },
          {
            $set: {
              name: pumpDetails.name,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL pump/////////////////////                                            
  deleteAllpumps: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PUMP_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  ///////ADD store/////////////////////                                         
  addstore: (store, callback) => {
    console.log(store);
    db.get()
      .collection(collections.STORE_COLLECTION)
      .insertOne(store)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL store/////////////////////                                            
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

  ///////ADD store DETAILS/////////////////////                                            
  getstoreDetails: (storeId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.STORE_COLLECTION)
        .findOne({
          _id: objectId(storeId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE store/////////////////////                                            
  deletestore: (storeId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.STORE_COLLECTION)
        .removeOne({
          _id: objectId(storeId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE store/////////////////////                                            
  updatestore: (storeId, storeDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.STORE_COLLECTION)
        .updateOne(
          {
            _id: objectId(storeId)
          },
          {
            $set: {
              name: storeDetails.name,
              location: storeDetails.location,
              desc: storeDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL store/////////////////////                                            
  deleteAllstores: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.STORE_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD gallery/////////////////////                                         
  addgallery: (gallery, callback) => {
    console.log(gallery);
    db.get()
      .collection(collections.GALLERY_COLLECTION)
      .insertOne(gallery)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
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

  ///////ADD gallery DETAILS/////////////////////                                            
  getgalleryDetails: (galleryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.GALLERY_COLLECTION)
        .findOne({
          _id: objectId(galleryId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE gallery/////////////////////                                            
  deletegallery: (galleryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.GALLERY_COLLECTION)
        .removeOne({
          _id: objectId(galleryId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE gallery/////////////////////                                            
  updategallery: (galleryId, galleryDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.GALLERY_COLLECTION)
        .updateOne(
          {
            _id: objectId(galleryId)
          },
          {
            $set: {
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL gallery/////////////////////                                            
  deleteAllgalleries: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.GALLERY_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD team/////////////////////                                         
  addteam: (team, callback) => {
    console.log(team);
    db.get()
      .collection(collections.TEAM_COLLECTION)
      .insertOne(team)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL team/////////////////////                                            
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

  ///////ADD team DETAILS/////////////////////                                            
  getteamDetails: (teamId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.TEAM_COLLECTION)
        .findOne({
          _id: objectId(teamId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE team/////////////////////                                            
  deleteteam: (teamId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.TEAM_COLLECTION)
        .removeOne({
          _id: objectId(teamId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE team/////////////////////                                            
  updateteam: (teamId, teamDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.TEAM_COLLECTION)
        .updateOne(
          {
            _id: objectId(teamId)
          },
          {
            $set: {
              heading: teamDetails.heading,
              desc: teamDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },




  ///////ADD policy/////////////////////                                         
  addpolicy: (policy, callback) => {
    console.log(policy);
    db.get()
      .collection(collections.POLICY_COLLECTION)
      .insertOne(policy)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL policy/////////////////////                                            
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

  ///////ADD policy DETAILS/////////////////////                                            
  getpolicyDetails: (policyId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.POLICY_COLLECTION)
        .findOne({
          _id: objectId(policyId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE policy/////////////////////                                            
  deletepolicy: (policyId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.POLICY_COLLECTION)
        .removeOne({
          _id: objectId(policyId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE policy/////////////////////                                            
  updatepolicy: (policyId, policyDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.POLICY_COLLECTION)
        .updateOne(
          {
            _id: objectId(policyId)
          },
          {
            $set: {
              heading: policyDetails.heading,
              desc: policyDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL policy/////////////////////                                            
  deleteAllpolicies: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.POLICY_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD mission/////////////////////                                         
  addmission: (mission, callback) => {
    console.log(mission);
    db.get()
      .collection(collections.MISSION_COLLECTION)
      .insertOne(mission)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL mission/////////////////////                                            
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

  ///////ADD mission DETAILS/////////////////////                                            
  getmissionDetails: (missionId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MISSION_COLLECTION)
        .findOne({
          _id: objectId(missionId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE mission/////////////////////                                            
  deletemission: (missionId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MISSION_COLLECTION)
        .removeOne({
          _id: objectId(missionId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE mission/////////////////////                                            
  updatemission: (missionId, missionDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MISSION_COLLECTION)
        .updateOne(
          {
            _id: objectId(missionId)
          },
          {
            $set: {
              heading: missionDetails.heading,
              desc: missionDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL mission/////////////////////                                            
  deleteAllmissions: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.MISSION_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  ///////ADD vision/////////////////////                                         
  addvision: (vision, callback) => {
    console.log(vision);
    db.get()
      .collection(collections.VISION_COLLECTION)
      .insertOne(vision)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL vision/////////////////////                                            
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

  ///////ADD vision DETAILS/////////////////////                                            
  getvisionDetails: (visionId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.VISION_COLLECTION)
        .findOne({
          _id: objectId(visionId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE vision/////////////////////                                            
  deletevision: (visionId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.VISION_COLLECTION)
        .removeOne({
          _id: objectId(visionId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE vision/////////////////////                                            
  updatevision: (visionId, visionDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.VISION_COLLECTION)
        .updateOne(
          {
            _id: objectId(visionId)
          },
          {
            $set: {
              heading: visionDetails.heading,
              desc: visionDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },



  ///////ADD support/////////////////////                                         
  addsupport: (support, callback) => {
    console.log(support);
    db.get()
      .collection(collections.SUPPORT_COLLECTION)
      .insertOne(support)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL support/////////////////////                                            
  getAllsupports: () => {
    return new Promise(async (resolve, reject) => {
      let supports = await db
        .get()
        .collection(collections.SUPPORT_COLLECTION)
        .find()
        .toArray();
      resolve(supports);
    });
  },

  ///////ADD support DETAILS/////////////////////                                            
  getsupportDetails: (supportId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUPPORT_COLLECTION)
        .findOne({
          _id: objectId(supportId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE support/////////////////////                                            
  deletesupport: (supportId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUPPORT_COLLECTION)
        .removeOne({
          _id: objectId(supportId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE support/////////////////////                                            
  updatesupport: (supportId, supportDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUPPORT_COLLECTION)
        .updateOne(
          {
            _id: objectId(supportId)
          },
          {
            $set: {
              Name: supportDetails.Name,
              Category: supportDetails.Category,
              Price: supportDetails.Price,
              Description: supportDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL support/////////////////////                                            
  deleteAllsupports: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SUPPORT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD branchpro/////////////////////                                         
  addbranchpro: (branchpro, callback) => {
    console.log(branchpro);
    branchpro.Price = parseInt(branchpro.Price);
    db.get()
      .collection(collections.BRANCHPRO_COLLECTION)
      .insertOne(branchpro)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL branchpro/////////////////////                                            
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

  ///////ADD branchpro DETAILS/////////////////////                                            
  getbranchproDetails: (branchproId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .findOne({
          _id: objectId(branchproId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE branchpro/////////////////////                                            
  deletebranchpro: (branchproId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .removeOne({
          _id: objectId(branchproId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE branchpro/////////////////////                                            
  updatebranchpro: (branchproId, branchproDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .updateOne(
          {
            _id: objectId(branchproId)
          },
          {
            $set: {
              Name: branchproDetails.Name,
              Category: branchproDetails.Category,
              Price: branchproDetails.Price,
              Description: branchproDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL branchpro/////////////////////                                            
  deleteAllbranchpros: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCHPRO_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD branches/////////////////////                                         
  addbranch: (branch, callback) => {
    console.log(branch);
    branch.Price = parseInt(branch.Price);
    db.get()
      .collection(collections.BRANCH_COLLECTION)
      .insertOne(branch)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL branches/////////////////////                                            
  getAllbranches: () => {
    return new Promise(async (resolve, reject) => {
      let branches = await db
        .get()
        .collection(collections.BRANCH_COLLECTION)
        .find()
        .toArray();
      resolve(branches);
    });
  },

  ///////ADD branches DETAILS/////////////////////                                            
  getbranchDetails: (branchId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCH_COLLECTION)
        .findOne({
          _id: objectId(branchId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE branches/////////////////////                                            
  deletebranch: (branchId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCH_COLLECTION)
        .removeOne({
          _id: objectId(branchId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE branches/////////////////////                                            
  updatebranch: (branchId, branchDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCH_COLLECTION)
        .updateOne(
          {
            _id: objectId(branchId)
          },
          {
            $set: {
              Name: branchDetails.Name,
              Category: branchDetails.Category,
              Price: branchDetails.Price,
              Description: branchDetails.Description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL branches/////////////////////                                            
  deleteAllbranches: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANCH_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD Category/////////////////////                                         
  addcategory: (category, callback) => {
    console.log(category);
    category.Price = parseInt(category.Price);
    db.get()
      .collection(collections.CATEGORY_COLLECTION)
      .insertOne(category)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },


  ///////ADD brands/////////////////////                                         
  addbrand: (brand, callback) => {
    console.log(brand);
    db.get()
      .collection(collections.BRANDS_COLLECTION)
      .insertOne(brand)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL brands/////////////////////                                            
  getAllBrands: () => {
    return new Promise(async (resolve, reject) => {
      let brands = await db
        .get()
        .collection(collections.BRANDS_COLLECTION)
        .find()
        .toArray();
      resolve(brands);
    });
  },
  ///////ADD brands DETAILS/////////////////////                                            
  getbrandDetails: (brandId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANDS_COLLECTION)
        .findOne({
          _id: objectId(brandId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE brands/////////////////////                                            
  deletebrand: (brandId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANDS_COLLECTION)
        .removeOne({
          _id: objectId(brandId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE brands/////////////////////                                            
  updatebrand: (brandId, brandDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANDS_COLLECTION)
        .updateOne(
          {
            _id: objectId(brandId)
          },
          {
            $set: {
              name: brandDetails.name,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL brands/////////////////////                                            
  deleteAllbrands: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BRANDS_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////GET ALL Category/////////////////////                                            
  getAllcategories: () => {
    return new Promise(async (resolve, reject) => {
      let categories = await db
        .get()
        .collection(collections.CATEGORY_COLLECTION)
        .find()
        .toArray();
      resolve(categories);
    });
  },

  ///////ADD Category DETAILS/////////////////////                                            
  getcategoryDetails: (categoryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORY_COLLECTION)
        .findOne({
          _id: objectId(categoryId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE Category/////////////////////                                            
  deletecategory: (categoryId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORY_COLLECTION)
        .removeOne({
          _id: objectId(categoryId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE Category/////////////////////                                            
  updatecategory: (categoryId, categoryDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORY_COLLECTION)
        .updateOne(
          {
            _id: objectId(categoryId)
          },
          {
            $set: {
              name: categoryDetails.name,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL Category/////////////////////                                            
  deleteAllcategories: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CATEGORY_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD contact/////////////////////                                         
  addcontact: (contact, callback) => {
    console.log(contact);
    contact.Price = parseInt(contact.Price);
    db.get()
      .collection(collections.CONTACT_COLLECTION)
      .insertOne(contact)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL contact/////////////////////                                            
  getAllcontacts: () => {
    return new Promise(async (resolve, reject) => {
      let contacts = await db
        .get()
        .collection(collections.CONTACT_COLLECTION)
        .find()
        .toArray();
      resolve(contacts);
    });
  },

  ///////ADD contact DETAILS/////////////////////                                            
  getcontactDetails: (contactId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONTACT_COLLECTION)
        .findOne({
          _id: objectId(contactId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE contact/////////////////////                                            
  deletecontact: (contactId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONTACT_COLLECTION)
        .removeOne({
          _id: objectId(contactId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE contact/////////////////////                                            
  updatecontact: (contactId, contactDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONTACT_COLLECTION)
        .updateOne(
          {
            _id: objectId(contactId)
          },
          {
            $set: {
              Phone: contactDetails.Phone,
              Email: contactDetails.Email,
              Location: contactDetails.Location,
              maplink: contactDetails.maplink,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL contact/////////////////////                                            
  deleteAllcontacts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.CONTACT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD sectionone/////////////////////                                         
  addsone: (sone, callback) => {
    console.log(sone);
    sone.Price = parseInt(sone.Price);
    db.get()
      .collection(collections.SONE_COLLECTION)
      .insertOne(sone)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL sectionone/////////////////////                                            
  getAllsones: () => {
    return new Promise(async (resolve, reject) => {
      let sones = await db
        .get()
        .collection(collections.SONE_COLLECTION)
        .find()
        .toArray();
      resolve(sones);
    });
  },

  ///////ADD sectionone DETAILS/////////////////////                                            
  getsoneDetails: (soneId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SONE_COLLECTION)
        .findOne({
          _id: objectId(soneId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE sectionone/////////////////////                                            
  deletesone: (soneId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SONE_COLLECTION)
        .removeOne({
          _id: objectId(soneId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE sectionone/////////////////////                                            
  updatesone: (soneId, soneDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SONE_COLLECTION)
        .updateOne(
          {
            _id: objectId(soneId)
          },
          {
            $set: {
              Mheading: soneDetails.Mheading,
              desc: soneDetails.desc,
              btnlink: soneDetails.btnlink,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL sectionone/////////////////////                                            
  deleteAllsones: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SONE_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD About/////////////////////                                         
  addabout: (about, callback) => {
    console.log(about);
    about.Price = parseInt(about.Price);
    db.get()
      .collection(collections.ABOUT_COLLECTION)
      .insertOne(about)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL About/////////////////////                                            
  getAllabouts: () => {
    return new Promise(async (resolve, reject) => {
      let abouts = await db
        .get()
        .collection(collections.ABOUT_COLLECTION)
        .find()
        .toArray();
      resolve(abouts);
    });
  },

  ///////ADD About DETAILS/////////////////////                                            
  getaboutDetails: (aboutId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .findOne({
          _id: objectId(aboutId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE About/////////////////////                                            
  deleteabout: (aboutId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .removeOne({
          _id: objectId(aboutId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE About/////////////////////                                            
  updateabout: (aboutId, aboutDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .updateOne(
          {
            _id: objectId(aboutId)
          },
          {
            $set: {
              subtitle: aboutDetails.subtitle,
              Mheading: aboutDetails.Mheading,
              desc: aboutDetails.desc,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL About/////////////////////                                            
  deleteAllabouts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  ///////ADD Banner/////////////////////                                         
  addbanner: (banner, callback) => {
    console.log(banner);
    banner.Price = parseInt(banner.Price);
    db.get()
      .collection(collections.BANNER_COLLECTION)
      .insertOne(banner)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL Banner/////////////////////                                            
  getAllbanners: () => {
    return new Promise(async (resolve, reject) => {
      let banners = await db
        .get()
        .collection(collections.BANNER_COLLECTION)
        .find()
        .toArray();
      resolve(banners);
    });
  },

  ///////ADD Banner DETAILS/////////////////////                                            
  getbannerDetails: (bannerId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BANNER_COLLECTION)
        .findOne({
          _id: objectId(bannerId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE Banner/////////////////////                                            
  deletebanner: (bannerId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BANNER_COLLECTION)
        .removeOne({
          _id: objectId(bannerId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE Banner/////////////////////                                            
  updatebanner: (bannerId, bannerDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BANNER_COLLECTION)
        .updateOne(
          {
            _id: objectId(bannerId)
          },
          {
            $set: {
              subtitle: bannerDetails.subtitle,
              Mheading: bannerDetails.Mheading,
              desc: bannerDetails.desc,
              btnlink: bannerDetails.btnlink,
              quote: bannerDetails.quote,

            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL Banner/////////////////////                                            
  deleteAllbanners: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.BANNER_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  ///////ADD Site/////////////////////                                         
  addsite: (site, callback) => {
    console.log(site);
    db.get()
      .collection(collections.SITE_COLLECTION)
      .insertOne(site)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL Site/////////////////////                                            
  getAllsites: () => {
    return new Promise(async (resolve, reject) => {
      let sites = await db
        .get()
        .collection(collections.SITE_COLLECTION)
        .find()
        .toArray();
      resolve(sites);
    });
  },

  ///////ADD Site DETAILS/////////////////////                                            
  getsiteDetails: (siteId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SITE_COLLECTION)
        .findOne({
          _id: objectId(siteId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE Site/////////////////////                                            
  deletesite: (siteId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SITE_COLLECTION)
        .removeOne({
          _id: objectId(siteId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE Site/////////////////////                                            
  updatesite: (siteId, siteDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SITE_COLLECTION)
        .updateOne(
          {
            _id: objectId(siteId)
          },
          {
            $set: {
              Sname: siteDetails.Sname,
              Saddress: siteDetails.Saddress,
              Sphone: siteDetails.Sphone,
              Semail: siteDetails.Semail,
              Slocation: siteDetails.Slocation,
              primarycolor: siteDetails.primarycolor,
              secondarycolor: siteDetails.secondarycolor,
              btncolor: siteDetails.btncolor,
              navtext: siteDetails.navtext,



            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL Site/////////////////////                                            
  deleteAllsites: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SITE_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },



  ///////ADD Social/////////////////////                                         
  addsocial: (social, callback) => {
    console.log(social);
    db.get()
      .collection(collections.SOCIAL_COLLECTION)
      .insertOne(social)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL Social/////////////////////                                            
  getAllsocials: () => {
    return new Promise(async (resolve, reject) => {
      let socials = await db
        .get()
        .collection(collections.SOCIAL_COLLECTION)
        .find()
        .toArray();
      resolve(socials);
    });
  },

  ///////ADD Social DETAILS/////////////////////                                            
  getsocialDetails: (socialId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SOCIAL_COLLECTION)
        .findOne({
          _id: objectId(socialId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE Social/////////////////////                                            
  deletesocial: (socialId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SOCIAL_COLLECTION)
        .removeOne({
          _id: objectId(socialId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE Social/////////////////////                                            
  updatesocial: (socialId, socialDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SOCIAL_COLLECTION)
        .updateOne(
          {
            _id: objectId(socialId)
          },
          {
            $set: {
              name: socialDetails.name,
              url: socialDetails.url,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL Social/////////////////////                                            
  deleteAllsocials: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.SOCIAL_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  ///////ADD Products/////////////////////                                         
  addproduct: (product, callback) => {
    console.log(product);
    product.Price = parseInt(product.Price);
    db.get()
      .collection(collections.PRODUCT_COLLECTION)
      .insertOne(product)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  ///////GET ALL Products/////////////////////                                            
  getAllproducts: () => {
    return new Promise(async (resolve, reject) => {
      let products = await db
        .get()
        .collection(collections.PRODUCT_COLLECTION)
        .find()
        .toArray();
      resolve(products);
    });
  },

  ///////ADD Products DETAILS/////////////////////                                            
  getproductDetails: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PRODUCT_COLLECTION)
        .findOne({
          _id: objectId(productId)
        })
        .then((response) => {
          resolve(response);
        });
    });
  },

  ///////DELETE Products/////////////////////                                            
  deleteproduct: (productId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PRODUCT_COLLECTION)
        .removeOne({
          _id: objectId(productId)
        })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  ///////UPDATE Products/////////////////////                                            
  updateproduct: (productId, productDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PRODUCT_COLLECTION)
        .updateOne(
          {
            _id: objectId(productId)
          },
          {
            $set: {
              name: productDetails.name,
              category: productDetails.category,
              brand: productDetails.brand,

              desc: productDetails.desc,
              // size: productDetails.size,
              // model: productDetails.model,
              // material: productDetails.material,

            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },


  ///////DELETE ALL Products/////////////////////                                            
  deleteAllproducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PRODUCT_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  doSignup: (adminData) => {
    return new Promise(async (resolve, reject) => {
      if (adminData.Code == "admin123") {
        adminData.Password = await bcrypt.hash(adminData.Password, 10);
        db.get()
          .collection(collections.ADMIN_COLLECTION)
          .insertOne(adminData)
          .then((data) => {
            resolve(data.ops[0]);
          });
      } else {
        resolve({ status: false });
      }
    });
  },

  doSignin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let admin = await db
        .get()
        .collection(collections.ADMIN_COLLECTION)
        .findOne({ Email: adminData.Email });
      if (admin) {
        bcrypt.compare(adminData.Password, admin.Password).then((status) => {
          if (status) {
            console.log("Login Success");
            response.admin = admin;
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



  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .find()
        .toArray();
      resolve(users);
    });
  },

  removeUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.USERS_COLLECTION)
        .removeOne({ _id: objectId(userId) })
        .then(() => {
          resolve();
        });
    });
  },

  removeAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.USERS_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },


  searchProduct: (details) => {
    console.log(details);
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .createIndex({ Name: "text" }).then(async () => {
          let result = await db
            .get()
            .collection(collections.PRODUCTS_COLLECTION)
            .find({
              $text: {
                $search: details.search,
              },
            })
            .toArray();
          resolve(result);
        })

    });
  },
};
