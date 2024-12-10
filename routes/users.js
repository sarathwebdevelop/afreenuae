var express = require("express");
var userHelper = require("../helper/userHelper");
var adminHelper = require("../helper/adminHelper");

var router = express.Router();

const verifySignedIn = (req, res, next) => {
  if (req.session.signedIn) {
    next();
  } else {
    res.redirect("/signin");
  }
};


/* GET home page. */
router.get("/", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  brands=await adminHelper.getAllBrands();

  res.render("users/home", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories ,brands});
});







router.get("/prd-view/:name", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsByCategory(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    subsubcat= await adminHelper.getAllsubsubcategories(cat);
    brands=await adminHelper.getAllBrands();

    res.render("users/prd-view", { admin: false, sites,brands, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches ,subsubcat});

  })
});


router.get("/subproducts/:name", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsforsubproducts(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    subcategories= await adminHelper.getAllsubsubcategories();
    brands=await adminHelper.getAllBrands();
  
    res.render("users/sub-prd-view", { admin: false,brands, sites,subcategories, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});

router.get("/sub-subproducts/:name", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getSubSubProducts(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/sub-sub-view", { admin: false,brands, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});
router.get("/sub-brd-view/:name/:brand", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  let brd=req.params.brand;
  await userHelper.getDistinctSubCategoryByBrand(brd,cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    // console.log("subbbbbb------subbbbbb")
    // console.log(products,"productsproductsproducts")
    // console.log("subbbbbb------productsproducts")
    res.render("users/sub-brd-view", { admin: false, brands,sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});
router.get("/single-sub-brd-view/:name/:brand", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  let brd=req.params.brand;
  await userHelper.getsubProductsByBrand(brd,cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/single-sub-brd-view", { admin: false, brands,sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});

router.get("/single-sub-sub-brd-view/:name/:brand", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  let brd=req.params.brand;
  await userHelper.getDistinctSubSubCategoryByBrand(brd,cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    // console.log("SSSSSSSSSSSSSUBBBBBBBBB------productsproducts")
    // console.log(products,"productsproductsproducts")
    // console.log("SSSSSSSSSSSSSUBBBBBBBBB------productsproducts")
    res.render("users/single-sub-sub-brd-view", { admin: false, brands,sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});
router.get("/inner-sub-sub-brd-view/:name/:brand", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  let brd=req.params.brand;
  await userHelper.getsubsubProductsByBrand(brd,cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    // console.log("SSSSSSSSSSSSSUBBBBBBBBB------productsproducts")
    // console.log(products,"productsproductsproducts")
    // console.log("SSSSSSSSSSSSSUBBBBBBBBB------productsproducts")
    res.render("users/inner-sub-sub-brd-view", { admin: false, brands,sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});
// router.get("/single-sub-sub-brd-view/:name/:brand", async function (req, res, next) {
//   let user = req.session.user;
//   let cat = req.params.name;
//   let brd=req.params.brand;
//   await userHelper.getsubsubProductsByBrand(brd,cat).then(async (products) => {
//     sites = await adminHelper.getAllsites();
//     socials = await adminHelper.getAllsocials();
//     banners = await adminHelper.getAllbanners();
//     abouts = await adminHelper.getAllabouts();
//     contacts = await adminHelper.getAllcontacts();
//     branches = await adminHelper.getAllbranches();
//     sones = await adminHelper.getAllsones();
//     categories = await adminHelper.getAllcategories();
//     brands=await adminHelper.getAllBrands();
//     res.render("users/single-sub-sub-brd-view", { admin: false, brands,sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

//   })
// });
router.get("/single-product/:name", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getSingleProducts(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/single-prd-view", { admin: false,brands, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});
router.get("/single-sub-product/:name", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsforsubsubproducts(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/sub-sub-single-view", { admin: false, brands, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});

router.get("/single-brd-product/:name/:brand", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  let brd=req.params.brand;
  await userHelper.getSingleBrdProducts(cat,brd).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/single-prd-view", { admin: false, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});

router.get("/brd-view/:name", async function (req, res, next) {
  let user = req.session.user;
  let brand = req.params.name;
  await userHelper. getDistinctCategoryByBrand(brand).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();

    // console.log("products------productsproducts")
    // console.log(products,"productsproductsproducts")
    // console.log("products------productsproducts")
    res.render("users/brd-view", { admin: false, sites, brands, abouts, contacts, sones, categories, socials, user, banners, products, branches });

  })
});


router.get("/store", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsByCategory(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    stores = await adminHelper.getAllstores();

    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    res.render("users/store", { admin: false, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches, stores });

  })
});

router.get("/mep", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsByCategory(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    meps = await adminHelper.getAllmeps();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    res.render("users/mep", { admin: false, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches, meps });
    
  })
});

router.get("/pump", async function (req, res, next) {
  let user = req.session.user;
  let cat = req.params.name;
  await userHelper.getProductsByCategory(cat).then(async (products) => {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    pumps = await adminHelper.getAllpumps();
    banners = await adminHelper.getAllbanners();
    abouts = await adminHelper.getAllabouts();
    contacts = await adminHelper.getAllcontacts();
    branches = await adminHelper.getAllbranches();
    sones = await adminHelper.getAllsones();
    categories = await adminHelper.getAllcategories();
    res.render("users/pump", { admin: false, sites, cat, abouts, contacts, sones, categories, socials, user, banners, products, branches, pumps });

  })
});



router.get("/Pumps-and-MEP-Works", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/Pumps-and-MEP-Works", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

router.get("/National-Paint", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/National-Paint", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

router.get("/Asian-Paint", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/Asian-Paint", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});


router.get("/gallery", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  galleries = await adminHelper.getAllgalleries();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/gallery", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories, galleries });
});



router.get("/valves-accessories", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/valves-accessories", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

router.get("/mixers-sanitary-accessories", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/mixers-sanitary-accessories", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

router.get("/hand-tools-equipments", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/hand-tools-equipments", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

router.get("/hardwares-safety-equipments", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/hardwares-safety-equipments", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});


router.get("/privacy", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/privacy", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});



router.get("/contact", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/contact", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});

///////ADD support/////////////////////                                         
router.post("/contact", function (req, res) {
  adminHelper.addsupport(req.body, (id) => {
    res.redirect("/contact");
  });
});



router.get("/pipes-fittings", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/pipes-fittings", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});


router.get("/career", async function (req, res, next) {
  let user = req.session.user;
  sites = await adminHelper.getAllsites();
  socials = await adminHelper.getAllsocials();
  banners = await adminHelper.getAllbanners();
  abouts = await adminHelper.getAllabouts();
  products = await adminHelper.getAllproducts();
  contacts = await adminHelper.getAllcontacts();
  sones = await adminHelper.getAllsones();
  categories = await adminHelper.getAllcategories();
  res.render("users/career", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories });
});


router.get("/about-us", async function (req, res, next) {
  sites = await adminHelper.getAllsites();
  missions = await adminHelper.getAllmissions();
  visions = await adminHelper.getAllvisions();
  teams = await adminHelper.getAllteams();
  policies = await adminHelper.getAllpolicies();
  socials = await adminHelper.getAllsocials();
  abouts = await adminHelper.getAllabouts();
  contacts = await adminHelper.getAllcontacts();
  categories = await adminHelper.getAllcategories();
  brands=await adminHelper.getAllBrands();
  res.render("users/about-us", { admin: false, sites,brands, socials, abouts, contacts, categories, missions, visions, teams, policies });
}),

  router.get("/contact-us", async function (req, res, next) {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    contacts = await adminHelper.getAllcontacts();
    categories = await adminHelper.getAllcategories();
    res.render("users/contact-us", { admin: false, sites, socials, contacts, categories });
  }),

  router.get("/products", async function (req, res, next) {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    products = await adminHelper.getAllproducts();
    contacts = await adminHelper.getAllcontacts();
    categories = await adminHelper.getAllcategories();
    res.render("users/products", { admin: false, sites, socials, products, contacts, categories });
  }),

  router.get("/brands", async function (req, res, next) {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    products = await adminHelper.getAllproducts();
    contacts = await adminHelper.getAllcontacts();
    categories = await adminHelper.getAllcategories();
    brands=await adminHelper.getAllBrands();
    res.render("users/brands", { admin: false, sites, socials, products, contacts, categories,brands });
  }),

  router.get("/service", async function (req, res, next) {
    sites = await adminHelper.getAllsites();
    socials = await adminHelper.getAllsocials();
    products = await adminHelper.getAllproducts();
    contacts = await adminHelper.getAllcontacts();
    categories = await adminHelper.getAllcategories();
    res.render("users/service", { admin: false, sites, socials, products, contacts, categories });
  }),




  router.get("/signup", function (req, res) {
    if (req.session.signedIn) {
      res.redirect("/");
    } else {
      res.render("users/signup", { admin: false });
    }
  });

router.post("/signup", function (req, res) {
  userHelper.doSignup(req.body).then((response) => {
    req.session.signedIn = true;
    req.session.user = response;
    res.redirect("/");
  });
});

router.get("/signin", function (req, res) {
  if (req.session.signedIn) {
    res.redirect("/");
  } else {
    res.render("users/signin", {
      admin: false,
      signInErr: req.session.signInErr,
    });
    req.session.signInErr = null;
  }
});

router.post("/signin", function (req, res) {
  userHelper.doSignin(req.body).then((response) => {
    if (response.status) {
      req.session.signedIn = true;
      req.session.user = response.user;
      res.redirect("/");
    } else {
      req.session.signInErr = "Invalid Email/Password";
      res.redirect("/signin");
    }
  });
});

router.get("/signout", function (req, res) {
  req.session.signedIn = false;
  req.session.user = null;
  res.redirect("/");
});

// router.get("/brandupdate",async function (req, res) {
//   let response = await userHelper.updateBrandAll(req.body);
//   res.status(200).json(response);
// });

router.post("/search", async function (req, res) {

  try {
    let user = req.session.user;
    let sites = await adminHelper.getAllsites();
    let missions = await adminHelper.getAllmissions();
    let visions = await adminHelper.getAllvisions();
    let teams = await adminHelper.getAllteams();
    let policies = await adminHelper.getAllpolicies();
    let socials = await adminHelper.getAllsocials();
    let abouts = await adminHelper.getAllabouts();
    let contacts = await adminHelper.getAllcontacts();
    let categories = await adminHelper.getAllcategories();
    let response = await userHelper.searchProduct(req.body);
    // console.log("*************",response,"*******************")
    res.render("users/search-result", { admin: false, sites, socials, abouts, contacts, categories, missions, visions, teams, policies, response, sites });
  } catch (error) {
    // Handle errors appropriately
    console.error("Error in search route:", error);
    res.status(500).send("Internal Server Error");
  }
});


// router.post("/search", async function (req, res) {
//   let user = req.session.user;
//   userHelper.searchProduct(req.body).then((response) => {
//     res.render("users/search-result", { admin: false, user, layout: '', response });
//   });
// });

// router.post("/search", async function (req, res) {
//   let user = req.session.user;
//   sites = await adminHelper.getAllsites();
//   galleries = await adminHelper.getAllgalleries();
//   socials = await adminHelper.getAllsocials();
//   banners = await adminHelper.getAllbanners();
//   abouts = await adminHelper.getAllabouts();
//   products = await adminHelper.getAllproducts();
//   contacts = await adminHelper.getAllcontacts();
//   sones = await adminHelper.getAllsones();
//   categories = await adminHelper.getAllcategories();
//   response = await userHelper.searchProduct();
//   res.render("users/search-result", { admin: false, sites, socials, user, banners, abouts, products, contacts, sones, categories, galleries, response });
// });

module.exports = router;
