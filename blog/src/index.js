const express = require("express");
const morgan = require("morgan");
const path = require("path");
const hbs = require("express-handlebars");
const methodOverride = require("method-override");
const multer = require("multer");
const app = express();
const cors = require("cors");
const route = require("./resources/routes");
const port = process.env.PORT || 3000;
var cookieParser = require("cookie-parser");
const sortMiddleware = require("./resources/middleware/sortMiddleware");
const User = require("./app/models/user");
const Product = require("./app/models/product");
const jwtVerify =require("./resources/services/JwtVerify") 

//Cookie
app.use(cookieParser());

//connect to db
const db = require("./config/db");
const { model } = require("mongoose");
db.connect();

//custom sort middleware
app.use(sortMiddleware.sortMiddleware);
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const storage = multer.diskStorage({
    destination: function (req, file, res) {
        res(null, "./uploads/images");
    },
    filename: function (req, file, res) {
        res(null, file.originalname);
    },
});

var upload = multer({ storage: storage });

app.use("/images", express.static("uploads/images"));
app.post("/uploads", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`,
    });
});

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(methodOverride("_method"));

app.use(morgan("combined"));
//template engine

app.engine(
    ".hbs",
    hbs.engine({
        extname: ".hbs",
        helpers: {
            sum: (a, b) => a + b,
            format: (number) => {
                if (typeof number === "number") {
                    return number
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                }
                return;
            },
            formatSoldProduct: (number) => {
                if (number < 1000) return number;
                else {
                    number = number / 1000;
                    return number.toString() + "k+";
                }
            },
            formatDiscout: (number) => Math.floor(number / 1000),

            
            handleAdmin: (val) => {
                if (val) {
                    return `<li><a
                                class="dropdown-item"
                                href="admin/list-products"
                            >Quản lý </a></li>`;
                }
                return "";
            },

            handleUser: (user) => {
                if(user){
                    if(user.isAdmin){
                        return `
                        <div class="dropdown">
                    <a
                        class="btn btn-main dropdown-toggle btn-user"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                    ${user.name}
                    </a>
                    <ul class="dropdown-menu" style="top:23px">
                        <li><a
                                class="dropdown-item"
                                href="/me/stored/personalinfor"
                            >Tài khoản của tôi</a></li>
                        <li><a
                                class="dropdown-item"
                                href="/products/create"
                            >Đăng bán hàng</a></li>
                        <li><a
                                class="dropdown-item"
                                href="/me/stored/myproducts"
                            >Quản lý sản phẩm</a></li>
                        <li><a
                                class="dropdown-item"
                                href="/admin/list-products"
                            >Quản lý sản phẩm hệ thống</a></li>
                        <li><form
                                action="/api/user/log-out"
                                method="POST"
                                id="form-3"
                                class="dropdown-item"
                            ><button
                                    style="border:none;background-color:#fff"
                                >Đăng xuất</button>
                            </form></li>
                    </ul>
                </div>
                    `
                    }
                    return `
                        <div class="dropdown">
                    <a
                        class="btn btn-main dropdown-toggle btn-user"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                    ${user.name}
                    </a>
                    <ul class="dropdown-menu" style="top:23px">
                        <li><a
                                class="dropdown-item"
                                href="/me/stored/personalinfor"
                            >Tài khoản của tôi</a></li>
                        <li><a
                                class="dropdown-item"
                                href="/products/create"
                            >Đăng bán hàng</a></li>
                        <li><a
                                class="dropdown-item"
                                href="/me/stored/myproducts"
                            >Quản lý sản phẩm</a></li>
                        <li><form
                                action="/api/user/log-out"
                                method="POST"
                                id="form-3"
                                class="dropdown-item"
                            ><button
                                    style="border:none;background-color:#fff"
                                >Đăng xuất</button>
                            </form></li>
                    </ul>
                </div>
                    `
                }
                else{
                    return `
                        <li class="header__navbar-item header__navbar-item-separate btn-register">
                            <a href="/sign-up">Đăng Ký</a>
                        </li>
                        <li class="header__navbar-item btn-login">
                            <a href="/sign-in">Đăng Nhập</a>
                        </li>
                    `
                }
            },
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";
                const icons = {
                    default: "bx bx-sort-alt-2",
                    asc: "bx bx-sort-a-z",
                    desc: "bx bx-sort-z-a",
                };
                const types = {
                    default: "desc",
                    asc: "desc",
                    desc: "asc",
                };
                const icon = icons[sortType];
                const type = types[sortType];
                return `<a href="?_sort&column=${field}&type=${type}"><i class='${icon}'></i></a>`;
            },

            getQuantity:(user)=>{
                if(user){
                    const decoded = jwtVerify.jwtVerifyAccessToken(
                        req.cookies.access_token
                    );
                    const userId = decoded.payload.id;
                }
            }
        },
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));

//Route init
route(app);

app.listen(port, () => {
    console.log(`Link: http://localhost:${port}`);
});
