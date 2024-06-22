class Settings {
    constructor(root) {
        this.root = root;
        this.flag = true;
        this.palform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
            <div class="box">
                <div class="pre-box">
                    <h1>WELCOME</h1>
                    <p>JOIN US!</p>
                    <div class="img-box">
                        <img src="/static/images/menu/icon/regiestor.jpg" alt="">
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
                        <button>注册</button>
                        <p>已有账号?去登录</p>
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
                        <button>登录</button>
                        <p>没有账号?去注册</p>
                    </div>
                </div>
            </div>
        `);
        this.setupEventListeners();
        this.$login = this.$settings.find(".login-form");
        this.$login_username = this.$login.find(".input-box #login_id");
        this.$login_password = this.$login.find(".input-box #login_password");

        this.$register = this.$settings.find(".register-form");
        this.$register_username = this.$register.find(".input-box #register_id");
        this.$register_password = this.$register.find(".input-box #register_password");
        this.$register_password_confirm = this.$register.find(".input-box #register_repassword");

        this.$register_submit = this.$register.find(".btn-box button");
        this.$login_submit = this.$login.find(".btn-box button");

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start() {
        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            this.getinfo_web();
            this.add_listening_events();
        }
    }

    add_listening_events() {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();

    }

    add_listening_events_login() {
        let outer = this;

        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {  // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();

        $.ajax({
            url: "http://124.220.162.220:8000/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    alert(resp.result);
                }
            }
        });
    }

    login() {

    }

    register_on_remote() {  // 在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();

        $.ajax({
            url: "http://124.220.162.220:8000/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();  // 刷新页面
                } else {
                    alert(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  // 在远程服务器上登出
        if (this.platform === "ACAPP") {
            this.root.AcWingOS.api.window.close();
        } else {
            $.ajax({
                url: "http://124.220.162.220:8000/settings/logout/",
                type: "GET",
                success: function(resp) {
                    if (resp.result === "success") {
                        location.reload();
                    }
                }
            });
        }
    }

    acapp_login(appid, redirect_uri, scope, state) {
        let outer = this;

        this.root.AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, function(resp) {
            if (resp.result === "success") {
                outer.username = resp.username;
                outer.photo = resp.photo;
                outer.hide();
                outer.root.menu.show();
            }
        });
    }

    getinfo_acapp() {
        let outer = this;

        $.ajax({
            url: "http://124.220.162.220:8000/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }

    getinfo_web() {
        let outer = this;

        $.ajax({
            url: "http://124.220.162.220:8000/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
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

    setupEventListeners() {
        //this.$settings.find('.register-form button').on('click', () => this.register());
        this.$settings.find('.register-form p').on('click', () => this.mySwitch());
        //this.$settings.find('.login-form button').on('click', () => this.change());
        this.$settings.find('.login-form p').on('click', () => this.mySwitch());
    }

    mySwitch() {
        if (this.flag) {
            $(".pre-box").css("transform", "translateX(100%)");
            $(".pre-box").css("background-color", "rgb(173,208,216)");
            $("img").attr("src", "/static/images/menu/icon/login.png");
        } else {
            $(".pre-box").css("transform", "translateX(0%)");
            $(".pre-box").css("background-color", "rgb(224,223,181)");
            $("img").attr("src", "/static/images/menu/icon/regiestor.jpg");
        }
        $("#register_id, #register_password, #register_repassword, #login_id, #login_password").val('');
        this.flag = !this.flag;

        this.bubbleCreate();
    }

    bubbleCreate() {
        const bubble = $('<span></span>').css({
            width: Math.random() * 5 + 25 + 'px',
            height: Math.random() * 5 + 25 + 'px',
            left: Math.random() * innerWidth + 'px',
        });
        $('body').append(bubble);
        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }
}
class hr_Settings {
    constructor(root) {
        this.root = root;
        this.flag = true;
        this.palform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";
        this.username = "";
        this.photo = "";

        this.$settings = $(`
            <div class="box">
                <div class="pre-box">
                    <h1>WELCOME</h1>
                    <p>JOIN US!</p>
                    <div class="img-box">
                        <img src="/static/images/menu/icon/regiestor.jpg" alt="">
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
                        <button>注册</button>
                        <p>已有账号?去登录</p>
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
                        <button>登录</button>
                        <p>没有账号?去注册</p>
                    </div>
                </div>
            </div>
        `);
        this.setupEventListeners();
        this.$login = this.$settings.find(".login-form");
        this.$login_username = this.$login.find(".input-box #login_id");
        this.$login_password = this.$login.find(".input-box #login_password");

        this.$register = this.$settings.find(".register-form");
        this.$register_username = this.$register.find(".input-box #register_id");
        this.$register_password = this.$register.find(".input-box #register_password");
        this.$register_password_confirm = this.$register.find(".input-box #register_repassword");

        this.$register_submit = this.$register.find(".btn-box button");
        this.$login_submit = this.$login.find(".btn-box button");

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start() {
        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            this.getinfo_web();
            this.add_listening_events();
        }
    }

    add_listening_events() {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();

    }

    add_listening_events_login() {
        let outer = this;

        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {  // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();

        $.ajax({
            url: "http://124.220.162.220:8000/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    alert(resp.result);
                }
            }
        });
    }

    login() {

    }

    register_on_remote() {  // 在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();

        $.ajax({
            url: "http://124.220.162.220:8000/settings/hrregister/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();  // 刷新页面
                } else {
                    alert(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  // 在远程服务器上登出
        if (this.platform === "ACAPP") {
            this.root.AcWingOS.api.window.close();
        } else {
            $.ajax({
                url: "http://124.220.162.220:8000/settings/logout/",
                type: "GET",
                success: function(resp) {
                    if (resp.result === "success") {
                        location.reload();
                    }
                }
            });
        }
    }

    acapp_login(appid, redirect_uri, scope, state) {
        let outer = this;

        this.root.AcWingOS.api.oauth2.authorize(appid, redirect_uri, scope, state, function(resp) {
            if (resp.result === "success") {
                outer.username = resp.username;
                outer.photo = resp.photo;
                outer.hide();
                outer.root.menu.show();
            }
        });
    }

    getinfo_acapp() {
        let outer = this;

        $.ajax({
            url: "http://124.220.162.220:8000/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }

    getinfo_web() {
        let outer = this;

        $.ajax({
            url: "http://124.220.162.220:8000/settings/hrgetinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
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

    setupEventListeners() {
        //this.$settings.find('.register-form button').on('click', () => this.register());
        this.$settings.find('.register-form p').on('click', () => this.mySwitch());
        //this.$settings.find('.login-form button').on('click', () => this.change());
        this.$settings.find('.login-form p').on('click', () => this.mySwitch());
    }

    mySwitch() {
        if (this.flag) {
            $(".pre-box").css("transform", "translateX(100%)");
            $(".pre-box").css("background-color", "rgb(173,208,216)");
            $("img").attr("src", "/static/images/menu/icon/login.png");
        } else {
            $(".pre-box").css("transform", "translateX(0%)");
            $(".pre-box").css("background-color", "rgb(224,223,181)");
            $("img").attr("src", "/static/images/menu/icon/regiestor.jpg");
        }
        $("#register_id, #register_password, #register_repassword, #login_id, #login_password").val('');
        this.flag = !this.flag;

        this.bubbleCreate();
    }

    bubbleCreate() {
        const bubble = $('<span></span>').css({
            width: Math.random() * 5 + 25 + 'px',
            height: Math.random() * 5 + 25 + 'px',
            left: Math.random() * innerWidth + 'px',
        });
        $('body').append(bubble);
        setTimeout(() => {
            bubble.remove();
        }, 4000);
    }
}
