// show modal
const btnLogin = document.querySelector(".btn-login");
const btnRegister = document.querySelector(".btn-register");
const btnBackRegister = document.querySelector("#modal-register .back");
const btnBackLogin = document.querySelector("#modal .back");
const modal = document.getElementById("modal");

btnRegister.addEventListener("click", () => {
    render("1");
});

btnLogin.addEventListener("click", () => {
    render("2");
});

function render(value) {
    var renderHTML = `
      <div class="modal_overlay"></div>
      <div class="modal_body">
        <!--Register form-->
        <form action="" method="post" id="form-${value}" class="form">
          <div class="${value === "1" ? "register" : "login"}">
            
            <div class="auth-form_exit">
              <div><i class="fa-solid fa-xmark icon-xmark${
                  value == "1" ? "" : "_login"
              }"></i></div>
            </div>
            <div class="auth-form_container">
              <div class="auth-form_header">
                <h3 class="auth-form_heading">${
                    value === "1" ? "Đăng ký" : "Đăng nhập"
                }</h3>
                <span class="switch-btn_auth">${
                    value === "1" ? "Đăng nhập" : "Đăng ký"
                }</span>
            
              </div>
    
                ${
                    value == 1
                        ? `
                <label for="name${value}" class="form-label"></label>
                  <input
                    type="text"
                    name="name${value}"
                    id="name${value}"
                    class="auth-form_input"
                    placeholder="Nhập họ và tên"
                  />
                  <span class="form-message"></span>
                  
                  <label for="name${value}" class="form-label"></label>
              
                  <input
                    type="text"
                    name="phoneNumber${value}"
                    id="phoneNumber${value}"
                    class="auth-form_input"
                    placeholder="Nhập SĐT"
                  />
              
                  <span class="form-message"></span>
                  `
                        : ""
                }
    
              <div class="auth-form_form">
                <div class="auth-form_gr">
                  <label for="email${value}" class="form-label"></label>
              
                  <input
                    type="text"
                    name="email${value}"
                    id="email${value}"
                    class="auth-form_input"
                    placeholder="Email của bạn hoặc tên đăng nhập"
                  />
              
                  <span class="form-message"></span>
                </div>
                <div class="auth-form_gr">
                  <label for="password${value}" class="form-label"></label>
              
                  <input
                    type="password"
                    name="password${value}"
                    id="password${value}"
                    class="auth-form_input"
                    placeholder="Mật khẩu của bạn"
                  />
              
                  <span class="form-message"></span>
                </div>
    
                ${
                    value === "1"
                        ? `
                <div class="auth-form_gr">
                <label for="password-confirm" class="form-label"></label>
                <input
                  type="password"
                  id="password-confirm"
                  name="password-confirm"
                  class="auth-form_input"
                  placeholder="Nhập lại mật khẩu của bạn"
                />
                <span class="form-message"></span>
              </div>
            </div>
                `
                        : ``
                }
                ${
                    value === "1"
                        ? `
                <div class="auth-form_aside">
                <p>
                  Bằng việc đăng kí, bạn đã đồng ý với shopee về
                  <a href="">điều khoản dịch vụ</a> &
                  <a href="">Chính sách bảo mật</a>
                </p>
              </div>
      
              <div class="auth-form_controls">
                <button class="btn back">Trở lại</button>
                <button class="btn btn-primary">Đăng kí</button>
              </div>
            </div>
                `
                        : `
                <div class="auth-form_aside">
                <div class="auth-form_help">
                  <a href="">Quên mật khẩu</a>
                  <span class="separate"></span>
                  <a href="" class="text_need-help">Cần trợ giúp ?</a>
                </div>
              </div>
    
              <div class="auth-form_controls">
                <button class="btn back">Trở lại</button>
                <button class="btn btn-primary">Đăng nhập</button>
              </div>
            </div>
                `
                }
    
            ${
                value === "1"
                    ? `
            <div class="auth-form_sociaty">
              <a href="" class="btn-icon btn-icon_size btn-facebook">
                <i class="bx bxl-facebook-circle icon-facebook"></i>
                <span>Kết nối với facebook</span>
              </a>
              <a href="" class="btn-icon btn-icon_size btn-gg">
                <i class="fa-brands fa-google icon-gg"></i>
                <span>Kết nối với Google</span>
              </a>
            </div>
          </div>
        </form>
      </div>
            `
                    : `
            <div class="auth-form_sociaty">
              <a href="" class="btn-icon btn-icon_size btn-facebook">
                <i class="bx bxl-facebook-circle icon-facebook"></i>
                <span>Đăng nhập facebook</span>
              </a>
              <a href="" class="btn-icon btn-icon_size btn-gg">
                <i class="fa-brands fa-google icon-gg"></i>
                <span>Đăng nhập Google</span>
              </a>
            </div>
          </div>
        </form>
      </div>
            `
            }
    
    
      `;

    modal.innerHTML = renderHTML;
    modal.style.pointerEvents = "all";
    const switchBtn = document.querySelector(".switch-btn_auth");

    switchBtn.addEventListener("click", () => {
        modal.innerHTML = "";
        modal.style.pointerEvents = "none";
        return render(value === "1" ? "2" : "1");
    });

    //validator
    if (value === "1") {
        Validator({
            form: "#form-1",
            formGroupSelector: ".auth-form_gr",
            errorSelector: ".form-message",
            rules: [
                Validator.isRequired("#email1", "Vui long nhap email"),
                Validator.isEmail("#email1"),
                Validator.minLength("#password1", 6),
                Validator.isRequired("#password-confirm"),
                Validator.isConfirm(
                    "#password-confirm",
                    function () {
                        return document.querySelector("#form-1 #password1")
                            .value;
                    },
                    "Mật khẩu nhập lại không chính xác"
                ),
            ],
            onSubmit: function (data) {
                console.log(data);
            },
        });
        const exitModalRegister = document.querySelector(".icon-xmark");
        // var formRegister = document.querySelector(".register");
        exitModalRegister.addEventListener("click", () => {
            modal.innerHTML = "";
            modal.style.pointerEvents = "none";
        });

        // modal.addEventListener("click", (e) => {
        //   if (!formRegister.contains(e.target)) {
        //     formRegister = "";
        //     exitModalRegister.click();
        //   }
        // });
    } else {
        Validator({
            form: "#form-2",
            formGroupSelector: ".auth-form_gr",
            errorSelector: ".form-message",
            rules: [
                Validator.isRequired("#email2", "Vui long nhap email"),
                Validator.isEmail("#email2"),
                Validator.minLength("#password2", 6),
            ],
            onSubmit: function (data) {
                console.log(data);
            },
        });
        const exitModalLogin = document.querySelector(".icon-xmark_login");
        // var formLogin = document.querySelector(".login");
        exitModalLogin.addEventListener("click", () => {
            modal.innerHTML = "";
            modal.style.pointerEvents = "none";
        });

        // modal.addEventListener("click", (e) => {
        //   if (!formLogin.contains(e.target)) {
        //     formLogin = "";
        //     exitModalLogin.click();
        //   }
        // });
    }
}

/*Validator */
function Validator(options) {
    var selectorRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function validate(inputElement, rule) {
        var errorMessage;
        var errorElement = getParent(
            inputElement,
            options.formGroupSelector
        ).querySelector(options.errorSelector);

        var rules = selectorRules[rule.selector];
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement.value);
            if (errorMessage) break;
        }
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(
                "invalid"
            );
        } else {
            errorElement.innerText = "";
            getParent(inputElement, options.formGroupSelector).classList.remove(
                "invalid"
            );
        }
        return !errorMessage;
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                if (typeof options.onSubmit === "function") {
                    var enableInputs = formElement.querySelectorAll("[name]");
                    var formValues = Array.from(enableInputs).reduce(function (
                        values,
                        input
                    ) {
                        values[input.name] = input.value;
                        return values;
                    },
                    {});
                    options.onSubmit(formValues);
                } else {
                }
            }
        };

        options.rules.forEach(function (rule) {
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElement = formElement.querySelector(rule.selector);
            if (inputElement) {
                inputElement.onblur = function () {
                    //value: inputElement.value
                    // test: inputElement.test
                    validate(inputElement, rule);
                };
            }
        });
    }
}

Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || "Vui long nhap truong nay";
        },
    };
};

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : message || "Vui long nhap truong nay";
        },
    };
};

Validator.minLength = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : `Toi thieu ${min} ki tu`;
        },
    };
};

Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message;
        },
    };
};
