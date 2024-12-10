var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("express-handlebars");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var fileUpload = require("express-fileupload");
var db = require("./config/connection");
var session = require("express-session");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "layout",
    layoutsDir: __dirname + "/views/layout/",
    partialsDir: [
      __dirname + "/views/header-partials/",
      __dirname + "/views/footer-partials/",
    ],
    helpers: {

      incremented: function (index) {
        index++;
        return index;
      },
      ifinclude: function(array, value, options) {
        // Check if the array contains an object with the specified subcategory name
        // console.log(array,"soomme",value)
        if (Array.isArray(array) && array.some(item => item.subcategory === value)) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
      },
      ifeq: function(a, b, options) {
        if (a === b) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
      eq:function(a, b) {
        return a === b;
      }

    },
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(
  session({
    secret: "Key",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day in milliseconds
  })
);


db.connect((err) => {
  if (err) console.log("Error" + err);
  else console.log("Database Connected Successfully");
});
app.use("/", usersRouter);
app.use("/admin", adminRouter);
app.use("/admin/site", adminRouter);
app.use("/admin/social", adminRouter);
app.use("/admin/banner", adminRouter);
app.use("/admin/brand", adminRouter);
app.use("/admin/about", adminRouter);
app.use("/admin/sone", adminRouter);
app.use("/admin/product", adminRouter);
app.use("/admin/contact", adminRouter);
app.use("/admin/category", adminRouter);
app.use("/admin/gallery", adminRouter);
app.use("/admin/store", adminRouter);
app.use("/admin/pump", adminRouter);
app.use("/admin/mep", adminRouter);
app.use("/admin/subproduct", adminRouter);
app.use("/admin/subsubcategory", adminRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;


