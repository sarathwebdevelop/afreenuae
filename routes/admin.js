var express = require("express");
var adminHelper = require("../helper/adminHelper");
var fs = require("fs");
const userHelper = require("../helper/userHelper");
var router = express.Router();

const verifySignedIn = (req, res, next) => {
  if (req.session.signedInAdmin) {
    next();
  } else {
    res.redirect("/admin/signin");
  }
};

/* GET admins listing. */
router.get("/", verifySignedIn, function (req, res, next) {
  let administator = req.session.admin;
  adminHelper.getAllproducts().then((products) => {
    res.render("admin/home", { admin: true, layout: "adminlayout", products, administator });
  });
});


///////ALL subsubcategory/////////////////////                                         
router.get("/all-subsubcategories", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsubsubcategories().then((subsubcategories) => {
    res.render("admin/subsubcategory/all-subsubcategories", { admin: true, layout: "adminlayout", subsubcategories, administator });
  });
});

///////ADD subsubcategory/////////////////////                                         
router.get("/add-subsubcategory", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let subcategory = await adminHelper.getAllsubproducts();
  let brands = await adminHelper.getAllBrands("l");

  res.render("admin/subsubcategory/add-subsubcategory", { admin: true, layout: "adminlayout", administator, subcategory ,brands });
});

///////ADD subsubcategory/////////////////////                                         
router.post("/add-subsubcategory", function (req, res) {
  adminHelper.addsubsubcategory(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/subsubcategory-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/subsubcategory/all-subsubcategories");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT subsubcategory/////////////////////                                         
router.get("/edit-subsubcategory/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let subsubcategoryId = req.params.id;
  let categories=await adminHelper.getAllsubproducts();
  let brands = await adminHelper.getAllBrands("l");
  let subsubcategory = await adminHelper.getsubsubcategoryDetails(subsubcategoryId);
  console.log(subsubcategory);
  res.render("admin/subsubcategory/edit-subsubcategory", { admin: true,brands, categories, layout: "adminlayout", subsubcategory, administator });
});

///////EDIT subsubcategory/////////////////////                                         
router.post("/edit-subsubcategory/:id", verifySignedIn, function (req, res) {
  let subsubcategoryId = req.params.id;
  adminHelper.updatesubsubcategory(subsubcategoryId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/subsubcategory-images/" + subsubcategoryId + ".png");
      }
    }
    res.redirect("/admin/subsubcategory/all-subsubcategories");
  });
});

///////DELETE subsubcategory/////////////////////                                         
router.get("/delete-subsubcategory/:id", verifySignedIn, function (req, res) {
  let subsubcategoryId = req.params.id;
  adminHelper.deletesubsubcategory(subsubcategoryId).then((response) => {
    fs.unlinkSync("./public/images/subsubcategory-images/" + subsubcategoryId + ".png");
    res.redirect("/admin/subsubcategory/all-subsubcategories");
  });
});

///////DELETE ALL subsubcategory/////////////////////                                         
router.get("/delete-all-subsubcategories", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsubsubcategories().then(() => {
    res.redirect("/admin/subsubcategory/all-subsubcategories");
  });
});


///////ALL subproduct/////////////////////                                         
router.get("/all-subproducts", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsubproducts().then((subproducts) => {
    res.render("admin/subproduct/all-subproducts", { admin: true, layout: "adminlayout", subproducts, administator });
  });
});

///////ADD subproduct/////////////////////                                         
router.get("/add-subproduct", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let categoryId = req.params.id;
  let categories = await adminHelper.getAllcategories(categoryId);
  let brandId = req.params.id;
  let brands = await adminHelper.getAllBrands(brandId);
  res.render("admin/subproduct/add-subproduct", { admin: true, layout: "adminlayout", administator, categories, brands });
});

///////ADD subproduct/////////////////////                                         
router.post("/add-subproduct", function (req, res) {
  adminHelper.addsubproduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/subproduct-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/subproduct/all-subproducts");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT subproduct/////////////////////                                         
router.get("/edit-subproduct/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let subproductId = req.params.id;
  let productId = req.params.id;
  let categories = await adminHelper.getAllcategories(productId);
  let products = await adminHelper.getAllproducts(productId);
  let brandId = req.params.id;
  let brands = await adminHelper.getAllBrands(brandId);
  let subproduct = await adminHelper.getsubproductDetails(subproductId);
  console.log(subproduct);
  res.render("admin/subproduct/edit-subproduct", { admin: true, categories,layout: "adminlayout", subproduct, administator, products, brands });
});

///////EDIT subproduct/////////////////////                                         
router.post("/edit-subproduct/:id", verifySignedIn, function (req, res) {
  let subproductId = req.params.id;
  adminHelper.updatesubproduct(subproductId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/subproduct-images/" + subproductId + ".png");
      }
    }
    res.redirect("/admin/subproduct/all-subproducts");
  });
});

///////DELETE subproduct/////////////////////                                         
router.get("/delete-subproduct/:id", verifySignedIn, function (req, res) {
  let subproductId = req.params.id;
  adminHelper.deletesubproduct(subproductId).then((response) => {
    fs.unlinkSync("./public/images/subproduct-images/" + subproductId + ".png");
    res.redirect("/admin/subproduct/all-subproducts");
  });
});

///////DELETE ALL subproduct/////////////////////                                         
router.get("/delete-all-subproducts", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsubproducts().then(() => {
    res.redirect("/admin/subproduct/all-subproducts");
  });
});


///////ALL brand/////////////////////                                         
router.get("/all-brands", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllBrands().then((brands) => {
    res.render("admin/brand/all-brands", { admin: true, layout: "adminlayout", brands, administator });
  });
});

///////ADD brands/////////////////////                                         
router.get("/add-brand", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/brand/add-brand", { admin: true, layout: "adminlayout", administator });
});

///////ADD brands/////////////////////                                         
router.post("/add-brand", function (req, res) {
  adminHelper.addbrand(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/brand-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/brand/all-brands");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT brands/////////////////////                                         
router.get("/edit-brand/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let brandId = req.params.id;
  let brand = await adminHelper.getbrandDetails(brandId);
  console.log(brand);
  res.render("admin/brand/edit-brand", { admin: true, layout: "adminlayout", brand, administator });
});

///////EDIT brands/////////////////////                                         
router.post("/edit-brand/:id", verifySignedIn, function (req, res) {
  let brandId = req.params.id;
  adminHelper.updatebrand(brandId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/brand-images/" + brandId + ".png");
      }
    }
    res.redirect("/admin/brand/all-brands");
  });
});

///////DELETE brands/////////////////////                                         
router.get("/delete-brand/:id", verifySignedIn, function (req, res) {
  let brandId = req.params.id;
  adminHelper.deletebrand(brandId).then((response) => {
    fs.unlinkSync("./public/images/brand-images/" + brandId + ".png");
    res.redirect("/admin/brand/all-brands");
  });
});

///////DELETE ALL brands/////////////////////                                         
router.get("/delete-all-brands", verifySignedIn, function (req, res) {
  adminHelper.deleteAllbrands().then(() => {
    res.redirect("/admin/brand/all-brands");
  });
});


///////ALL mepproduct/////////////////////                                         
router.get("/all-mepproducts", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllmepproducts().then((mepproducts) => {
    res.render("admin/mep/all-mepproducts", { admin: true, layout: "adminlayout", mepproducts, administator });
  });
});

///////ADD mepproduct/////////////////////                                         
router.get("/add-mepproduct", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let mepId = req.params.id;
  let meps = await adminHelper.getAllmeps(mepId);
  res.render("admin/mep/add-mepproduct", { admin: true, layout: "adminlayout", meps, administator });
});

///////ADD mepproduct/////////////////////                                         
router.post("/add-mepproduct", function (req, res) {
  adminHelper.addmepproduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/mepproduct-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/mep/all-mepproducts");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT mepproduct/////////////////////                                         
router.get("/edit-mepproduct/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let mepproductId = req.params.id;
  let mepproduct = await adminHelper.getmepproductDetails(mepproductId);
  console.log(mepproduct);
  res.render("admin/mep/edit-mepproduct", { admin: true, layout: "adminlayout", mepproduct, administator });
});

///////EDIT mepproduct/////////////////////                                         
router.post("/edit-mepproduct/:id", verifySignedIn, function (req, res) {
  let mepproductId = req.params.id;
  adminHelper.updatemepproduct(mepproductId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/mepproduct-images/" + mepproductId + ".png");
      }
    }
    res.redirect("/admin/mep/all-mepproducts");
  });
});

///////DELETE mepproduct/////////////////////                                         
router.get("/delete-mepproduct/:id", verifySignedIn, function (req, res) {
  let mepproductId = req.params.id;
  adminHelper.deletemepproduct(mepproductId).then((response) => {
    fs.unlinkSync("./public/images/mepproduct-images/" + mepproductId + ".png");
    res.redirect("/admin/mep/all-mepproducts");
  });
});

///////DELETE ALL mepproduct/////////////////////                                         
router.get("/delete-all-mepproducts", verifySignedIn, function (req, res) {
  adminHelper.deleteAllmepproducts().then(() => {
    res.redirect("/admin/mep/all-mepproducts");
  });
});
///////ALL mep/////////////////////                                         
router.get("/all-meps", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllmeps().then((meps) => {
    res.render("admin/mep/all-meps", { admin: true, layout: "adminlayout", meps, administator });
  });
});

///////ADD mep/////////////////////                                         
router.get("/add-mep", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/mep/add-mep", { admin: true, layout: "adminlayout", administator });
});

///////ADD mep/////////////////////                                         
router.post("/add-mep", function (req, res) {
  adminHelper.addmep(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/mep-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/mep/all-meps");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT mep/////////////////////                                         
router.get("/edit-mep/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let mepId = req.params.id;
  let mep = await adminHelper.getmepDetails(mepId);
  console.log(mep);
  res.render("admin/mep/edit-mep", { admin: true, layout: "adminlayout", mep, administator });
});

///////EDIT mep/////////////////////                                         
router.post("/edit-mep/:id", verifySignedIn, function (req, res) {
  let mepId = req.params.id;
  adminHelper.updatemep(mepId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/mep-images/" + mepId + ".png");
      }
    }
    res.redirect("/admin/mep/all-meps");
  });
});

///////DELETE mep/////////////////////                                         
router.get("/delete-mep/:id", verifySignedIn, function (req, res) {
  let mepId = req.params.id;
  adminHelper.deletemep(mepId).then((response) => {
    fs.unlinkSync("./public/images/mep-images/" + mepId + ".png");
    res.redirect("/admin/mep/all-meps");
  });
});

///////DELETE ALL mep/////////////////////                                         
router.get("/delete-all-meps", verifySignedIn, function (req, res) {
  adminHelper.deleteAllmeps().then(() => {
    res.redirect("/admin/mep/all-meps");
  });
});

///////ALL pumpproduct/////////////////////                                         
router.get("/all-pumpproducts", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllpumpproducts().then((pumpproducts) => {
    res.render("admin/pump/all-pumpproducts", { admin: true, layout: "adminlayout", pumpproducts, administator });
  });
});

///////ADD pumpproduct/////////////////////                                         
router.get("/add-pumpproduct", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let pumpId = req.params.id;
  let pumps = await adminHelper.getAllpumps(pumpId);
  res.render("admin/pump/add-pumpproduct", { admin: true, layout: "adminlayout", pumps, administator });
});

///////ADD pumpproduct/////////////////////                                         
router.post("/add-pumpproduct", function (req, res) {
  adminHelper.addpumpproduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/pumpproduct-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/pump/all-pumpproducts");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT pumpproduct/////////////////////                                         
router.get("/edit-pumpproduct/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let pumpproductId = req.params.id;
  let pumpproduct = await adminHelper.getpumpproductDetails(pumpproductId);
  console.log(pumpproduct);
  res.render("admin/pump/edit-pumpproduct", { admin: true, layout: "adminlayout", pumpproduct, administator });
});

///////EDIT pumpproduct/////////////////////                                         
router.post("/edit-pumpproduct/:id", verifySignedIn, function (req, res) {
  let pumpproductId = req.params.id;
  adminHelper.updatepumpproduct(pumpproductId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/pumpproduct-images/" + pumpproductId + ".png");
      }
    }
    res.redirect("/admin/pump/all-pumpproducts");
  });
});

///////DELETE pumpproduct/////////////////////                                         
router.get("/delete-pumpproduct/:id", verifySignedIn, function (req, res) {
  let pumpproductId = req.params.id;
  adminHelper.deletepumpproduct(pumpproductId).then((response) => {
    fs.unlinkSync("./public/images/pumpproduct-images/" + pumpproductId + ".png");
    res.redirect("/admin/pump/all-pumpproducts");
  });
});

///////DELETE ALL pumpproduct/////////////////////                                         
router.get("/delete-all-pumpproducts", verifySignedIn, function (req, res) {
  adminHelper.deleteAllpumpproducts().then(() => {
    res.redirect("/admin/pump/all-pumpproducts");
  });
});

///////ALL pump/////////////////////                                         
router.get("/all-pumps", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllpumps().then((pumps) => {
    res.render("admin/pump/all-pumps", { admin: true, layout: "adminlayout", pumps, administator });
  });
});

///////ADD pump/////////////////////                                         
router.get("/add-pump", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/pump/add-pump", { admin: true, layout: "adminlayout", administator });
});

///////ADD pump/////////////////////                                         
router.post("/add-pump", function (req, res) {
  adminHelper.addpump(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/pump-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/pump/all-pumps");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT pump/////////////////////                                         
router.get("/edit-pump/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let pumpId = req.params.id;
  let pump = await adminHelper.getpumpDetails(pumpId);
  console.log(pump);
  res.render("admin/pump/edit-pump", { admin: true, layout: "adminlayout", pump, administator });
});

///////EDIT pump/////////////////////                                         
router.post("/edit-pump/:id", verifySignedIn, function (req, res) {
  let pumpId = req.params.id;
  adminHelper.updatepump(pumpId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/pump-images/" + pumpId + ".png");
      }
    }
    res.redirect("/admin/pump/all-pumps");
  });
});

///////DELETE pump/////////////////////                                         
router.get("/delete-pump/:id", verifySignedIn, function (req, res) {
  let pumpId = req.params.id;
  adminHelper.deletepump(pumpId).then((response) => {
    fs.unlinkSync("./public/images/pump-images/" + pumpId + ".png");
    res.redirect("/admin/pump/all-pumps");
  });
});

///////DELETE ALL pump/////////////////////                                         
router.get("/delete-all-pumps", verifySignedIn, function (req, res) {
  adminHelper.deleteAllpumps().then(() => {
    res.redirect("/admin/pump/all-pumps");
  });
});

///////ALL store/////////////////////                                         
router.get("/all-stores", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllstores().then((stores) => {
    res.render("admin/store/all-stores", { admin: true, layout: "adminlayout", stores, administator });
  });
});

///////ADD store/////////////////////                                         
router.get("/add-store", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/store/add-store", { admin: true, layout: "adminlayout", administator });
});

///////ADD store/////////////////////                                         
router.post("/add-store", function (req, res) {
  adminHelper.addstore(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/store-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/store/all-stores");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT store/////////////////////                                         
router.get("/edit-store/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let storeId = req.params.id;
  let store = await adminHelper.getstoreDetails(storeId);
  console.log(store);
  res.render("admin/store/edit-store", { admin: true, layout: "adminlayout", store, administator });
});

///////EDIT store/////////////////////                                         
router.post("/edit-store/:id", verifySignedIn, function (req, res) {
  let storeId = req.params.id;
  adminHelper.updatestore(storeId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/store-images/" + storeId + ".png");
      }
    }
    res.redirect("/admin/store/all-stores");
  });
});

///////DELETE store/////////////////////                                         
router.get("/delete-store/:id", verifySignedIn, function (req, res) {
  let storeId = req.params.id;
  adminHelper.deletestore(storeId).then((response) => {
    fs.unlinkSync("./public/images/store-images/" + storeId + ".png");
    res.redirect("/admin/store/all-stores");
  });
});

///////DELETE ALL store/////////////////////                                         
router.get("/delete-all-stores", verifySignedIn, function (req, res) {
  adminHelper.deleteAllstores().then(() => {
    res.redirect("/admin/store/all-stores");
  });
});


///////ALL gallery/////////////////////                                         
router.get("/all-galleries", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllgalleries().then((galleries) => {
    res.render("admin/gallery/all-galleries", { admin: true, layout: "adminlayout", galleries, administator });
  });
});

///////ADD gallery/////////////////////                                         
router.get("/add-gallery", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/gallery/add-gallery", { admin: true, layout: "adminlayout", administator });
});

///////ADD gallery/////////////////////                                         
router.post("/add-gallery", function (req, res) {
  adminHelper.addgallery(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/gallery-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/gallery/all-galleries");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT gallery/////////////////////                                         
router.get("/edit-gallery/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let galleryId = req.params.id;
  let gallery = await adminHelper.getgalleryDetails(galleryId);
  console.log(gallery);
  res.render("admin/gallery/edit-gallery", { admin: true, layout: "adminlayout", gallery, administator });
});

///////EDIT gallery/////////////////////                                         
router.post("/edit-gallery/:id", verifySignedIn, function (req, res) {
  let galleryId = req.params.id;
  adminHelper.updategallery(galleryId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/gallery-images/" + galleryId + ".png");
      }
    }
    res.redirect("/admin/gallery/all-galleries");
  });
});

///////DELETE gallery/////////////////////                                         
router.get("/delete-gallery/:id", verifySignedIn, function (req, res) {
  let galleryId = req.params.id;
  adminHelper.deletegallery(galleryId).then((response) => {
    fs.unlinkSync("./public/images/gallery-images/" + galleryId + ".png");
    res.redirect("/admin/gallery/all-galleries");
  });
});



///////ALL team/////////////////////                                         
router.get("/all-teams", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllteams().then((teams) => {
    res.render("admin/about/all-teams", { admin: true, layout: "adminlayout", teams, administator });
  });
});

///////ADD team/////////////////////                                         
router.get("/add-team", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-team", { admin: true, layout: "adminlayout", administator });
});

///////ADD team/////////////////////                                         
router.post("/add-team", function (req, res) {
  adminHelper.addteam(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/team-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/about/all-teams");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT team/////////////////////                                         
router.get("/edit-team/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let teamId = req.params.id;
  let team = await adminHelper.getteamDetails(teamId);
  console.log(team);
  res.render("admin/about/edit-team", { admin: true, layout: "adminlayout", team, administator });
});

///////EDIT team/////////////////////                                         
router.post("/edit-team/:id", verifySignedIn, function (req, res) {
  let teamId = req.params.id;
  adminHelper.updateteam(teamId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/team-images/" + teamId + ".png");
      }
    }
    res.redirect("/admin/about/all-teams");
  });
});

///////DELETE team/////////////////////                                         
router.get("/delete-team/:id", verifySignedIn, function (req, res) {
  let teamId = req.params.id;
  adminHelper.deleteteam(teamId).then((response) => {
    fs.unlinkSync("./public/images/team-images/" + teamId + ".png");
    res.redirect("/admin/about/all-teams");
  });
});




///////ALL policy/////////////////////                                         
router.get("/all-policies", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllpolicies().then((policies) => {
    res.render("admin/about/all-policies", { admin: true, layout: "adminlayout", policies, administator });
  });
});

///////ADD policy/////////////////////                                         
router.get("/add-policy", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-policy", { admin: true, layout: "adminlayout", administator });
});

///////ADD policy/////////////////////                                         
router.post("/add-policy", function (req, res) {
  adminHelper.addpolicy(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/policy-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/about/all-policies");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT policy/////////////////////                                         
router.get("/edit-policy/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let policyId = req.params.id;
  let policy = await adminHelper.getpolicyDetails(policyId);
  console.log(policy);
  res.render("admin/about/edit-policy", { admin: true, layout: "adminlayout", policy, administator });
});

///////EDIT policy/////////////////////                                         
router.post("/edit-policy/:id", verifySignedIn, function (req, res) {
  let policyId = req.params.id;
  adminHelper.updatepolicy(policyId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/policy-images/" + policyId + ".png");
      }
    }
    res.redirect("/admin/about/all-policies");
  });
});

///////DELETE policy/////////////////////                                         
router.get("/delete-policy/:id", verifySignedIn, function (req, res) {
  let policyId = req.params.id;
  adminHelper.deletepolicy(policyId).then((response) => {
    fs.unlinkSync("./public/images/policy-images/" + policyId + ".png");
    res.redirect("/admin/about/all-policies");
  });
});




///////ALL mission/////////////////////                                         
router.get("/all-missions", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllmissions().then((missions) => {
    res.render("admin/about/all-missions", { admin: true, layout: "adminlayout", missions, administator });
  });
});

///////ADD mission/////////////////////                                         
router.get("/add-mission", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-mission", { admin: true, layout: "adminlayout", administator });
});

///////ADD mission/////////////////////                                         
router.post("/add-mission", function (req, res) {
  adminHelper.addmission(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/mission-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/about/all-missions");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT mission/////////////////////                                         
router.get("/edit-mission/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let missionId = req.params.id;
  let mission = await adminHelper.getmissionDetails(missionId);
  console.log(mission);
  res.render("admin/about/edit-mission", { admin: true, layout: "adminlayout", mission, administator });
});

///////EDIT mission/////////////////////                                         
router.post("/edit-mission/:id", verifySignedIn, function (req, res) {
  let missionId = req.params.id;
  adminHelper.updatemission(missionId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/mission-images/" + missionId + ".png");
      }
    }
    res.redirect("/admin/about/all-missions");
  });
});

///////DELETE mission/////////////////////                                         
router.get("/delete-mission/:id", verifySignedIn, function (req, res) {
  let missionId = req.params.id;
  adminHelper.deletemission(missionId).then((response) => {
    fs.unlinkSync("./public/images/mission-images/" + missionId + ".png");
    res.redirect("/admin/about/all-missions");
  });
});



///////ALL vision/////////////////////                                         
router.get("/all-visions", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllvisions().then((visions) => {
    res.render("admin/about/all-visions", { admin: true, layout: "adminlayout", visions, administator });
  });
});

///////ADD vision/////////////////////                                         
router.get("/add-vision", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-vision", { admin: true, layout: "adminlayout", administator });
});

///////ADD vision/////////////////////                                         
router.post("/add-vision", function (req, res) {
  adminHelper.addvision(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/vision-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/about/all-visions");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT vision/////////////////////                                         
router.get("/edit-vision/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let visionId = req.params.id;
  let vision = await adminHelper.getvisionDetails(visionId);
  console.log(vision);
  res.render("admin/about/edit-vision", { admin: true, layout: "adminlayout", vision, administator });
});

///////EDIT vision/////////////////////                                         
router.post("/edit-vision/:id", verifySignedIn, function (req, res) {
  let visionId = req.params.id;
  adminHelper.updatevision(visionId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/vision-images/" + visionId + ".png");
      }
    }
    res.redirect("/admin/about/all-visions");
  });
});

///////DELETE vision/////////////////////                                         
router.get("/delete-vision/:id", verifySignedIn, function (req, res) {
  let visionId = req.params.id;
  adminHelper.deletevision(visionId).then((response) => {
    fs.unlinkSync("./public/images/vision-images/" + visionId + ".png");
    res.redirect("/admin/about/all-visions");
  });
});





///////ALL support/////////////////////                                         
router.get("/all-supports", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsupports().then((supports) => {
    res.render("admin/all-supports", { admin: true, layout: "adminlayout", supports, administator });
  });
});



///////DELETE support/////////////////////                                         
router.get("/delete-support/:id", verifySignedIn, function (req, res) {
  let supportId = req.params.id;
  adminHelper.deletesupport(supportId).then((response) => {
    res.redirect("/admin/all-supports");
  });
});

///////DELETE ALL support/////////////////////                                         
router.get("/delete-all-supports", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsupports().then(() => {
    res.redirect("/admin/all-supports");
  });
});


///////ALL branchpro/////////////////////                                         
router.get("/all-branchpros", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllbranchpros().then((branchpros) => {
    res.render("admin/branchpro/all-branchpros", { admin: true, layout: "adminlayout", branchpros, administator });
  });
});

///////ADD branchpro/////////////////////                                         
router.get("/add-branchpro", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let branchId = req.params.id;
  let branches = await adminHelper.getAllbranches(branchId);
  res.render("admin/branchpro/add-branchpro", { admin: true, layout: "adminlayout", administator, branches });
});

///////ADD branchpro/////////////////////                                         
router.post("/add-branchpro", function (req, res) {
  adminHelper.addbranchpro(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/branchpro-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/branchpro/all-branchpros");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT branchpro/////////////////////                                         
router.get("/edit-branchpro/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let branchproId = req.params.id;
  let branchpro = await adminHelper.getbranchproDetails(branchproId);
  console.log(branchpro);
  res.render("admin/branchpro/edit-branchpro", { admin: true, layout: "adminlayout", branchpro, administator });
});

///////EDIT branchpro/////////////////////                                         
router.post("/edit-branchpro/:id", verifySignedIn, function (req, res) {
  let branchproId = req.params.id;
  adminHelper.updatebranchpro(branchproId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/branchpro-images/" + branchproId + ".png");
      }
    }
    res.redirect("/admin/branchpro/all-branchpros");
  });
});

///////DELETE branchpro/////////////////////                                         
router.get("/delete-branchpro/:id", verifySignedIn, function (req, res) {
  let branchproId = req.params.id;
  adminHelper.deletebranchpro(branchproId).then((response) => {
    fs.unlinkSync("./public/images/branchpro-images/" + branchproId + ".png");
    res.redirect("/admin/branchpro/all-branchpros");
  });
});

///////DELETE ALL branchpro/////////////////////                                         
router.get("/delete-all-branchpros", verifySignedIn, function (req, res) {
  adminHelper.deleteAllbranchpros().then(() => {
    res.redirect("/admin/branchpro/all-branchpros");
  });
});


///////ALL branch/////////////////////                                         
router.get("/all-branches", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllbranches().then((branches) => {
    res.render("admin/branch/all-branches", { admin: true, layout: "adminlayout", branches, administator });
  });
});

///////ADD branches/////////////////////                                         
router.get("/add-branch", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/branch/add-branch", { admin: true, layout: "adminlayout", administator });
});

///////ADD branches/////////////////////                                         
router.post("/add-branch", function (req, res) {
  adminHelper.addbranch(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/branch-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/branch/all-branches");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT branches/////////////////////                                         
router.get("/edit-branch/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let branchId = req.params.id;
  let branch = await adminHelper.getbranchDetails(branchId);
  console.log(branch);
  res.render("admin/branch/edit-branch", { admin: true, layout: "adminlayout", branch, administator });
});

///////EDIT branches/////////////////////                                         
router.post("/edit-branch/:id", verifySignedIn, function (req, res) {
  let branchId = req.params.id;
  adminHelper.updatebranch(branchId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/branch-images/" + branchId + ".png");
      }
    }
    res.redirect("/admin/branch/all-branches");
  });
});

///////DELETE branches/////////////////////                                         
router.get("/delete-branch/:id", verifySignedIn, function (req, res) {
  let branchId = req.params.id;
  adminHelper.deletebranch(branchId).then((response) => {
    fs.unlinkSync("./public/images/branch-images/" + branchId + ".png");
    res.redirect("/admin/branch/all-branches");
  });
});

///////DELETE ALL branches/////////////////////                                         
router.get("/delete-all-branches", verifySignedIn, function (req, res) {
  adminHelper.deleteAllbranches().then(() => {
    res.redirect("/admin/branch/all-branches");
  });
});





///////ALL category/////////////////////                                         
router.get("/all-categories", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllcategories().then((categories) => {
    res.render("admin/category/all-categories", { admin: true, layout: "adminlayout", categories, administator });
  });
});

///////ADD Category/////////////////////                                         
router.get("/add-category", verifySignedIn, function (req, res) {
  let administator = req.session.admin;

  res.render("admin/category/add-category", { admin: true, layout: "adminlayout", administator, });
});

///////ADD Category/////////////////////                                         
router.post("/add-category", function (req, res) {
  adminHelper.addcategory(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/category-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/category/all-categories");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT Category/////////////////////                                         
router.get("/edit-category/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let categoryId = req.params.id;
  let category = await adminHelper.getcategoryDetails(categoryId);
  console.log(category);
  res.render("admin/category/edit-category", { admin: true, layout: "adminlayout", category, administator });
});

///////EDIT Category/////////////////////                                         
router.post("/edit-category/:id", verifySignedIn, function (req, res) {
  let categoryId = req.params.id;
  adminHelper.updatecategory(categoryId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/category-images/" + categoryId + ".png");
      }
    }
    res.redirect("/admin/category/all-categories");
  });
});

///////DELETE Category/////////////////////                                         
router.get("/delete-category/:id", verifySignedIn, function (req, res) {
  let categoryId = req.params.id;
  adminHelper.deletecategory(categoryId).then((response) => {
    fs.unlinkSync("./public/images/category-images/" + categoryId + ".png");
    res.redirect("/admin/category/all-categories");
  });
});

///////DELETE ALL Category/////////////////////                                         
router.get("/delete-all-categories", verifySignedIn, function (req, res) {
  adminHelper.deleteAllcategories().then(() => {
    res.redirect("/admin/category/all-categories");
  });
});




///////ALL contact/////////////////////                                         
router.get("/all-contacts", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllcontacts().then((contacts) => {
    res.render("admin/contact/all-contacts", { admin: true, layout: "adminlayout", contacts, administator });
  });
});

///////ADD contact/////////////////////                                         
router.get("/add-contact", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/contact/add-contact", { admin: true, layout: "adminlayout", administator });
});

///////ADD contact/////////////////////                                         
router.post("/add-contact", function (req, res) {
  adminHelper.addcontact(req.body, (id) => {
    res.redirect("/admin/contact/all-contacts");
  });
});

///////EDIT contact/////////////////////                                         
router.get("/edit-contact/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let contactId = req.params.id;
  let contact = await adminHelper.getcontactDetails(contactId);
  console.log(contact);
  res.render("admin/contact/edit-contact", { admin: true, layout: "adminlayout", contact, administator });
});

///////EDIT contact/////////////////////                                         
router.post("/edit-contact/:id", verifySignedIn, function (req, res) {
  let contactId = req.params.id;
  adminHelper.updatecontact(contactId, req.body).then(() => {
    res.redirect("/admin/contact/all-contacts");
  });
});

///////DELETE contact/////////////////////                                         
router.get("/delete-contact/:id", verifySignedIn, function (req, res) {
  let contactId = req.params.id;
  adminHelper.deletecontact(contactId).then((response) => {
    fs.unlinkSync("./public/images/contact-images/" + contactId + ".png");
    res.redirect("/admin/contact/all-contacts");
  });
});

///////DELETE ALL contact/////////////////////                                         
router.get("/delete-all-contacts", verifySignedIn, function (req, res) {
  adminHelper.deleteAllcontacts().then(() => {
    res.redirect("/admin/contact/all-contacts");
  });
});


///////ALL sone/////////////////////                                         
router.get("/all-sones", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsones().then((sones) => {
    res.render("admin/sone/all-sones", { admin: true, layout: "adminlayout", sones, administator });
  });
});

///////ADD sectionone/////////////////////                                         
router.get("/add-sone", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/sone/add-sone", { admin: true, layout: "adminlayout", administator });
});

///////ADD sectionone/////////////////////                                         
router.post("/add-sone", function (req, res) {
  adminHelper.addsone(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/sone-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/sone/all-sones");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT sectionone/////////////////////                                         
router.get("/edit-sone/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let soneId = req.params.id;
  let sone = await adminHelper.getsoneDetails(soneId);
  console.log(sone);
  res.render("admin/sone/edit-sone", { admin: true, layout: "adminlayout", sone, administator });
});

///////EDIT sectionone/////////////////////                                         
router.post("/edit-sone/:id", verifySignedIn, function (req, res) {
  let soneId = req.params.id;
  adminHelper.updatesone(soneId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/sone-images/" + soneId + ".png");
      }
    }
    res.redirect("/admin/sone/all-sones");
  });
});

///////DELETE sectionone/////////////////////                                         
router.get("/delete-sone/:id", verifySignedIn, function (req, res) {
  let soneId = req.params.id;
  adminHelper.deletesone(soneId).then((response) => {
    fs.unlinkSync("./public/images/sone-images/" + soneId + ".png");
    res.redirect("/admin/sone/all-sones");
  });
});

///////DELETE ALL sectionone/////////////////////                                         
router.get("/delete-all-sones", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsones().then(() => {
    res.redirect("/admin/sone/all-sones");
  });
});


///////ALL about/////////////////////                                         
router.get("/all-abouts", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllabouts().then((abouts) => {
    res.render("admin/about/all-abouts", { admin: true, layout: "adminlayout", abouts, administator });
  });
});

///////ADD About/////////////////////                                         
router.get("/add-about", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-about", { admin: true, layout: "adminlayout", administator });
});

///////ADD About/////////////////////                                         
router.post("/add-about", function (req, res) {
  adminHelper.addabout(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/about-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/about/all-abouts");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT About/////////////////////                                         
router.get("/edit-about/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let aboutId = req.params.id;
  let about = await adminHelper.getaboutDetails(aboutId);
  console.log(about);
  res.render("admin/about/edit-about", { admin: true, layout: "adminlayout", about, administator });
});

///////EDIT About/////////////////////                                         
router.post("/edit-about/:id", verifySignedIn, function (req, res) {
  let aboutId = req.params.id;
  adminHelper.updateabout(aboutId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/about-images/" + aboutId + ".png");
      }
    }
    res.redirect("/admin/about/all-abouts");
  });
});

///////DELETE About/////////////////////                                         
router.get("/delete-about/:id", verifySignedIn, function (req, res) {
  let aboutId = req.params.id;
  adminHelper.deleteabout(aboutId).then((response) => {
    fs.unlinkSync("./public/images/about-images/" + aboutId + ".png");
    res.redirect("/admin/about/all-abouts");
  });
});

///////DELETE ALL About/////////////////////                                         
router.get("/delete-all-abouts", verifySignedIn, function (req, res) {
  adminHelper.deleteAllabouts().then(() => {
    res.redirect("/admin/about/all-abouts");
  });
});


///////ALL banner/////////////////////                                         
router.get("/all-banners", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllbanners().then((banners) => {
    res.render("admin/banner/all-banners", { admin: true, layout: "adminlayout", banners, administator });
  });
});

///////ADD Banner/////////////////////                                         
router.get("/add-banner", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/banner/add-banner", { admin: true, layout: "adminlayout", administator });
});

///////ADD Banner/////////////////////                                         
router.post("/add-banner", function (req, res) {
  adminHelper.addbanner(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/banner-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/banner/all-banners");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT Banner/////////////////////                                         
router.get("/edit-banner/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let bannerId = req.params.id;
  let banner = await adminHelper.getbannerDetails(bannerId);
  console.log(banner);
  res.render("admin/banner/edit-banner", { admin: true, layout: "adminlayout", banner, administator });
});

///////EDIT Banner/////////////////////                                         
router.post("/edit-banner/:id", verifySignedIn, function (req, res) {
  let bannerId = req.params.id;
  adminHelper.updatebanner(bannerId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/banner-images/" + bannerId + ".png");
      }
    }
    res.redirect("/admin/banner/all-banners");
  });
});

///////DELETE Banner/////////////////////                                         
router.get("/delete-banner/:id", verifySignedIn, function (req, res) {
  let bannerId = req.params.id;
  adminHelper.deletebanner(bannerId).then((response) => {
    fs.unlinkSync("./public/images/banner-images/" + bannerId + ".png");
    res.redirect("/admin/banner/all-banners");
  });
});

///////DELETE ALL Banner/////////////////////                                         
router.get("/delete-all-banners", verifySignedIn, function (req, res) {
  adminHelper.deleteAllbanners().then(() => {
    res.redirect("/admin/banner/all-banners");
  });
});

///////ALL social/////////////////////                                         
router.get("/all-socials", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsocials().then((socials) => {
    res.render("admin/social/all-socials", { admin: true, layout: "innerlayout", socials, administator });
  });
});

///////ADD Social/////////////////////                                         
router.get("/add-social", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/social/add-social", { admin: true, layout: "innerlayout", administator });
});

///////ADD Social/////////////////////                                         
router.post("/add-social", function (req, res) {
  adminHelper.addsocial(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/social-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/social/all-socials");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT Social/////////////////////                                         
router.get("/edit-social/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let socialId = req.params.id;
  let social = await adminHelper.getsocialDetails(socialId);
  console.log(social);
  res.render("admin/social/edit-social", { admin: true, layout: "innerlayout", social, administator });
});

///////EDIT Social/////////////////////                                         
router.post("/edit-social/:id", verifySignedIn, function (req, res) {
  let socialId = req.params.id;
  adminHelper.updatesocial(socialId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/social-images/" + socialId + ".png");
      }
    }
    res.redirect("/admin/social/all-socials");
  });
});

///////DELETE Social/////////////////////                                         
router.get("/delete-social/:id", verifySignedIn, function (req, res) {
  let socialId = req.params.id;
  adminHelper.deletesocial(socialId).then((response) => {
    fs.unlinkSync("./public/images/social-images/" + socialId + ".png");
    res.redirect("/admin/social/all-socials");
  });
});

///////DELETE ALL Social/////////////////////                                         
router.get("/delete-all-socials", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsocials().then(() => {
    res.redirect("/admin/social/all-socials");
  });
});

///////ALL site/////////////////////                                         
router.get("/all-sites", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllsites().then((sites) => {
    res.render("admin/site/all-sites", { admin: true, layout: "innerlayout", sites, administator });
  });
});

///////ADD Site-Settings/////////////////////                                         
router.get("/add-site", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/site/add-site", { admin: true, layout: "innerlayout", administator });
});

///////ADD Site-Settings/////////////////////                                         
router.post("/add-site", function (req, res) {
  adminHelper.addsite(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/site-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/site/all-sites");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT Site-Settings/////////////////////                                         
router.get("/edit-site/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let siteId = req.params.id;
  let site = await adminHelper.getsiteDetails(siteId);
  console.log(site);
  res.render("admin/site/edit-site", { admin: true, layout: "innerlayout", site, administator });
});

///////EDIT Site-Settings/////////////////////                                         
router.post("/edit-site/:id", verifySignedIn, function (req, res) {
  let siteId = req.params.id;
  adminHelper.updatesite(siteId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/site-images/" + siteId + ".png");
      }
    }
    res.redirect("/admin/site/all-sites");
  });
});

///////DELETE Site-Settings/////////////////////                                         
router.get("/delete-site/:id", verifySignedIn, function (req, res) {
  let siteId = req.params.id;
  adminHelper.deletesite(siteId).then((response) => {
    fs.unlinkSync("./public/images/site-images/" + siteId + ".png");
    res.redirect("/admin/site/all-sites");
  });
});

///////DELETE ALL Site-Settings/////////////////////                                         
router.get("/delete-all-sites", verifySignedIn, function (req, res) {
  adminHelper.deleteAllsites().then(() => {
    res.redirect("/admin/site/all-sites");
  });
});


///////ALL product/////////////////////                                         
router.get("/all-products", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllproducts().then((products) => {
    res.render("admin/product/all-products", { admin: true, layout: "adminlayout", products, administator });
  });
});

///////ADD Products/////////////////////                                         
router.get("/add-product", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let categoryId = req.params.id;
  let categories = await adminHelper.getAllcategories(categoryId);
  let subproducts=await adminHelper.getAllsubproducts();
  let subcategories=await adminHelper.getAllsubsubcategories();
  let brandId = req.params.id;
  let brands = await adminHelper.getAllBrands(brandId);
  res.render("admin/product/add-product", { admin: true, layout: "adminlayout",subproducts,subcategories, administator, categories, brands });
});

///////ADD Products/////////////////////                                         
router.post("/add-product", function (req, res) {
  adminHelper.addproduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/product-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/product/all-products");
      } else {
        console.log(err);
      }
    });
  });
});

///////EDIT Products/////////////////////                                         
router.get("/edit-product/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let productId = req.params.id;
  let categoryId = req.params.id;
  let categories = await adminHelper.getAllcategories(categoryId);
  let brandId = req.params.id;
  let brands = await adminHelper.getAllBrands(brandId);
  let product = await adminHelper.getproductDetails(productId);
  console.log(product);
  res.render("admin/product/edit-product", { admin: true, layout: "adminlayout", product, categories, brands, administator });
});

///////EDIT Products/////////////////////                                         
router.post("/edit-product/:id", verifySignedIn, function (req, res) {
  let productId = req.params.id;
  adminHelper.updateproduct(productId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/product-images/" + productId + ".png");
      }
    }
    res.redirect("/admin/product/all-products");
  });
});

///////DELETE Products/////////////////////                                         
router.get("/delete-product/:id", verifySignedIn, function (req, res) {
  let productId = req.params.id;
  adminHelper.deleteproduct(productId).then((response) => {
    fs.unlinkSync("./public/images/product-images/" + productId + ".png");
    res.redirect("/admin/product/all-products");
  });
});

///////DELETE ALL Products/////////////////////                                         
router.get("/delete-all-products", verifySignedIn, function (req, res) {
  adminHelper.deleteAllproducts().then(() => {
    res.redirect("/admin/product/all-products");
  });
});




router.get("/signup", function (req, res) {
  if (req.session.signedInAdmin) {
    res.redirect("/admin");
  } else {
    res.render("admin/signup", {
      admin: true, layout: "adminlayout",
      signUpErr: req.session.signUpErr,
    });
  }
});

router.post("/signup", function (req, res) {
  adminHelper.doSignup(req.body).then((response) => {
    console.log(response);
    if (response.status == false) {
      req.session.signUpErr = "Invalid Admin Code";
      res.redirect("/admin/signup");
    } else {
      req.session.signedInAdmin = true;
      req.session.admin = response;
      res.redirect("/admin");
    }
  });
});

router.get("/signin", function (req, res) {
  if (req.session.signedInAdmin) {
    res.redirect("/admin");
  } else {
    res.render("admin/signin", {
      admin: true, layout: "adminlayout",
      signInErr: req.session.signInErr,
    });
    req.session.signInErr = null;
  }
});

router.post("/signin", function (req, res) {
  adminHelper.doSignin(req.body).then((response) => {
    if (response.status) {
      req.session.signedInAdmin = true;
      req.session.admin = response.admin;
      res.redirect("/admin");
    } else {
      req.session.signInErr = "Invalid Email/Password";
      res.redirect("/admin/signin");
    }
  });
});

router.get("/signout", function (req, res) {
  req.session.signedInAdmin = false;
  req.session.admin = null;
  res.redirect("/admin");
});

router.get("/all-users", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllUsers().then((users) => {
    res.render("admin/all-users", { admin: true, layout: "adminlayout", administator, users });
  });
});

router.get("/remove-user/:id", verifySignedIn, function (req, res) {
  let userId = req.params.id;
  adminHelper.removeUser(userId).then(() => {
    res.redirect("/admin/all-users");
  });
});

router.get("/remove-all-users", verifySignedIn, function (req, res) {
  adminHelper.removeAllUsers().then(() => {
    res.redirect("/admin/all-users");
  });
});


router.post("/search", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.searchProduct(req.body).then((response) => {
    res.render("admin/search-result", { admin: true, layout: "adminlayout", administator, response });
  });
});


module.exports = router;
