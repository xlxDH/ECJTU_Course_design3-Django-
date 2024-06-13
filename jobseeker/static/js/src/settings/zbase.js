class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "WEB";
        if (this.root.OS) this.platform = "APP";
        this.createSettings();
    }

   createSettings() {
        // 确保文档加载完成再执行jQuery操作
        $(document).ready(() => {
            this.$settings = $(`
                <div class="box">
                    <!-- 滑动盒子 -->
                    <div class="pre-box">
                        <h1>WELCOME</h1>
                        <p>JOIN US!</p>
                        <div class="img-box">
                            <img src="{% static 'images/menu/icon/regiestor.jpg' %}" alt="">
                        </div>
                    </div>
                    <div class="register-form">
                        <div class="title-box">
                            <h1>注册</h1>
                        </div>
                        <div class="input-box">
                            <input type="text" id="register_id" placeholder="用户名">
                            <input type="password" id="register_password" placeholder="密码">
                            <input type="password" id="register_repassword" placeholder="确认密码">
                        </div>
                        <div class="btn-box">
                            <button id="register_button">注册</button>
                            <p id="switch_to_login">已有账号?去登录</p>
                        </div>
                    </div>
                    <div class="login-form">
                        <div class="title-box">
                            <h1>登录</h1>
                        </div>
                        <div class="input-box">
                            <input type="text" id="login_id" placeholder="用户名">
                            <input type="password" id="login_password" placeholder="密码">
                        </div>
                        <div class="btn-box">
                            <button id="login_button">登录</button>
                            <p id="switch_to_register">没有账号?去注册</p>
                        </div>
                    </div>
                </div>
            `);

            this.flag = true;
            this.userAccounts = [
                {
                    username: "admin",
                    password: "123456"
                }
            ];

            $(this.root).append(this.$settings); // 使用 this.root 而不是 root

            this.bindEvents();
            this.start();
        });


    // 其他方法保持不变
}

    bindEvents() {
        this.$settings.find('#register_button').on('click', () => this.register());
        this.$settings.find('#login_button').on('click', () => this.change());
        this.$settings.find('#switch_to_login').on('click', () => this.mySwitch());
        this.$settings.find('#switch_to_register').on('click', () => this.mySwitch());
    }

    mySwitch() {
        if (this.flag) {
            this.$settings.find(".pre-box").css("transform", "translateX(100%)");
            this.$settings.find(".pre-box").css("background-color", "rgb(173,208,216)");
            this.$settings.find("img").attr("src", "{% static 'images/menu/icon/login.png' %}");
        } else {
            this.$settings.find(".pre-box").css("transform", "translateX(0%)");
            this.$settings.find(".pre-box").css("background-color", "rgb(139,232,145)");
            this.$settings.find("img").attr("src", "{% static 'images/menu/icon/regiestor.jpg' %}");
        }
        this.flag = !this.flag;
    }

    start() {
        this.getinfo();
    }

    register() {
        const username = this.$settings.find("#register_id").val();
        const password = this.$settings.find("#register_password").val();
        const repassword = this.$settings.find("#register_repassword").val();
        if (password === repassword) {
            const user = { username: username, password: password };
            let st = true;
            for (let t of this.userAccounts) {
                if (t.username === user.username) {
                    st = false;
                    alert("该用户已存在！");
                }
            }
            if (st) {
                this.mySwitch();
                this.$settings.find("#login_id").val(username);
                this.userAccounts.push(user);
                this.$settings.find("#register_id").val("");
                this.$settings.find("#register_password").val("");
                this.$settings.find("#register_repassword").val("");
            }
        } else {
            alert("两次密码不一致！");
        }
    }

    check_login() {
        const id = this.$settings.find("#login_id").val();
        const password = this.$settings.find("#login_password").val();
        let st = false;
        for (let t of this.userAccounts) {
            if (id === t.username && password === t.password) {
                st = true;
            }
        }
        if (st) return true;
        else {
            alert("用户名或密码错误！");
            return false;
        }
    }

    change() {
        if (this.check_login()) {
            window.location.href = "index.html";
        }
    }

    getinfo() {
        let outer = this;

        $.ajax({
            url: "http://124.220.162.220:8000/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                console.log(resp);
                if (resp.result === "success") {
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    outer.login();
                }
            }
        });
    }

    hide() {
        this.$settings.hide();
    }

    show() {
        this.$settings.show();
    }
}


