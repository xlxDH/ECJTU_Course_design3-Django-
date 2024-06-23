class Profile {
    constructor(root,$menu) {
        this.root = root;
        this.$menu = $menu;
        this.$profile = $(`
<div class="ac-game-profile">
    <div class="ac-game-profile-container">
        <div class="ac-game-profile-header">
            <h2>个人信息</h2>
        </div>
        <div class="ac-game-profile-body">
            <div class="img-box">
                <img>
            </div>
            <label>电话号码:</label>
            <input type="text" id="profile-phone">
            <label>性别:</label>
            <input type="text" id="profile-sex">
            <label>居住地:</label>
            <input type="text" id="profile-residence">
            <label>毕业年份:</label>
            <input type="text" id="profile-graduation-year">
            <label>教育水平:</label>
            <input type="text" id="profile-education-level">
            <label>毕业学校:</label>
            <input type="text" id="profile-graduation-school">
            <label>期望职位:</label>
            <input type="text" id="profile-desired-job">
            <label>期望薪资:</label>
            <input type="text" id="profile-expected-salary">
            <label>工作状态:</label>
            <input type="text" id="profile-job-status">
            <label>工作地点:</label>
            <input type="text" id="profile-work-location">
            <label>个人简介:</label>
            <textarea id="profile-bio"></textarea>
            <label>照片URL:</label>
            <input type="text" id="profile-photo">
            <label>简历URL:</label>
            <input type="text" id="profile-resume">
        </div>
        <div class="ac-game-profile-footer">
            <button id="profile-save">保存</button>
            <button id="profile-cancel">取消</button>
        </div>
    </div>
</div>
`);
        this.hide();
        this.root.$ac_game.append(this.$profile);
        this.$profilePhoto = this.$profile.find('.ac-game-profile-photo');
        //this.$photo = this.$profile.find('.ac-game-profile-photo');
        this.$phone = this.$profile.find("#profile-phone");
        this.$sex = this.$profile.find("#profile-sex");
        this.$residence = this.$profile.find("#profile-residence");
        this.$graduation_year = this.$profile.find("#profile-graduation-year");
        this.$education_level = this.$profile.find("#profile-education-level");
        this.$graduation_school = this.$profile.find("#profile-graduation-school");
        this.$desired_job = this.$profile.find("#profile-desired-job");
        this.$expected_salary = this.$profile.find("#profile-expected-salary");
        this.$job_status = this.$profile.find("#profile-job-status");
        this.$work_location = this.$profile.find("#profile-work-location");
        this.$bio = this.$profile.find("#profile-bio");
        this.$photo = this.$profile.find("#profile-photo");
        this.$resume = this.$profile.find("#profile-resume");
        this.$save = this.$profile.find("#profile-save");
        this.$cancel = this.$profile.find("#profile-cancel");

        this.start();
    }

    start() {
        this.add_listening_events();
        this.load_profile();
        this.auto_expand_input();
    }

load_profile() {
    let outer = this;
    // 从服务器获取个人信息，这里假设使用ajax异步请求
    $.ajax({
        url: "http://124.220.162.220:8000/settings/getinfo/",
        type: "GET",
        success: function(resp) {
            if (resp.result === "success") {
                let profile = resp; // 假设服务器返回的个人信息对象为 resp
                // 如果 photo 不为空，则显示头像
                if (profile.photo !== "") {
                    let $photoCircle = outer.$profile.find('.img-box');
                    $photoCircle.empty();
                    let img = new Image();
                    img.src = resp.photo;
                    $(img).addClass('img-box');
                    $photoCircle.append(img);
                }
                // 显示其他个人信息
                //outer.$phone.val(String(profile.phone)); // 假设电话号码存储在 profile.phone 中
                outer.show_other_info(profile);
                // 其他信息的展示类似处理
            } else {
                //alert("获取个人信息失败！");
            }
        },
        error: function() {
            //alert("获取个人信息失败！");
        }
    });
    }

    show_other_info(profile) {
    let outer = this; // 外部作用域的引用

    // 显示其他个人信息
    outer.$phone.val(profile.phone || "未填写"); // 电话号码
    outer.$sex.val(profile.sex || "未填写"); // 性别
    outer.$residence.val(profile.residence || "未填写"); // 居住地
    outer.$graduation_year.val(profile.graduation_year || "未填写"); // 毕业年份
    outer.$education_level.val(profile.education_level || "未填写"); // 教育水平
    outer.$graduation_school.val(profile.graduation_school || "未填写"); // 毕业学校
    outer.$desired_job.val(profile.desired_job || "未填写"); // 期望职位
    outer.$expected_salary.val(profile.expected_salary || "未填写"); // 期望薪资
    outer.$job_status.val(profile.job_status || "未填写"); // 求职状态
    outer.$work_location.val(profile.work_location || "未填写"); // 工作地点
    outer.$bio.val(profile.bio || "未填写"); // 简介
    outer.$photo.val(profile.photo);
    outer.$resume.val(profile.resume);
    }



    auto_expand_input() {
        let outer = this;
        // 当界面打开时，自动将输入框放大
        this.$profile.show(function() {
            outer.$bio.focus().css('width', '200px'); // 例如设置宽度为 200px
            // 其他输入框的自动放大类似处理
        });
    }

    add_listening_events() {
        let outer = this;
        this.$save.click(function() {
            outer.save_profile();
        });
        this.$cancel.click(function() {
            outer.hide();
            outer.$menu.show();
        });
    }

    save_profile() {
        let outer = this;
        let data = {
            phone: this.$phone.val(),
            sex: this.$sex.val(),
            residence: this.$residence.val(),
            graduation_year: this.$graduation_year.val(),
            education_level: this.$education_level.val(),
            graduation_school: this.$graduation_school.val(),
            desired_job: this.$desired_job.val(),
            expected_salary: this.$expected_salary.val(),
            job_status: this.$job_status.val(),
            work_location: this.$work_location.val(),
            bio: this.$bio.val(),
            photo: this.$photo.val(),
            resume: this.$resume.val()
        };

        $.ajax({
            url: "http://124.220.162.220:8000/settings/updateinfo/",
            type: "GET",
            data: data,
            success: function(resp) {
                if (resp.result === "success") {
                    alert("个人信息修改成功！");
                    location.reload();
                    outer.hide();
                    outer.$menu.show();
                } else {
                    //alert("修改个人信息失败！");
                }
            }
        });
    }

    show() {
        this.$profile.show();
        this.$profile.css({
                    width: '50%'
        });
    }

    hide() {
        this.$profile.hide();
        this.$profile.css({
                    width: '0'
             });
    }
}



class hr_Profile {
    constructor(root,$menu) {
        this.root = root;
        this.$menu = $menu;
        this.$profile = $(`
<div class="ac-game-profile">
    <div class="ac-game-profile-container">
        <div class="ac-game-profile-header">
            <h2>个人信息</h2>
        </div>
        <div class="ac-game-profile-body">
            <div class="img-box">
                <img>
            </div>
            <label>电话号码:</label>
            <input type="text" id="profile-phone">

            <label>居住地:</label>
            <input type="text" id="profile-residence">
            <label>期望职位:</label>
            <input type="text" id="profile-desired-job">
            <label>期望薪资:</label>
            <input type="text" id="profile-expected-salary">
            <label>工作地点:</label>
            <input type="text" id="profile-work-location">
            <label>个人简介:</label>
            <textarea id="profile-bio"></textarea>
            <label>照片URL:</label>
            <input type="text" id="profile-photo">
            <label>简历URL:</label>
            <input type="text" id="profile-resume">
        </div>
        <div class="ac-game-profile-footer">
            <button id="profile-save">保存</button>
            <button id="profile-cancel">取消</button>
        </div>
    </div>
</div>
`);
        this.hide();
        this.root.$ac_game.append(this.$profile);
        this.$profilePhoto = this.$profile.find('.ac-game-profile-photo');
        //this.$photo = this.$profile.find('.ac-game-profile-photo');
        this.$phone = this.$profile.find("#profile-phone");
        this.$residence = this.$profile.find("#profile-residence");
        this.$desired_job = this.$profile.find("#profile-desired-job");
        this.$expected_salary = this.$profile.find("#profile-expected-salary");
        this.$work_location = this.$profile.find("#profile-work-location");
        this.$bio = this.$profile.find("#profile-bio");
        this.$photo = this.$profile.find("#profile-photo");
        this.$resume = this.$profile.find("#profile-resume");
        this.$save = this.$profile.find("#profile-save");
        this.$cancel = this.$profile.find("#profile-cancel");

        this.start();
    }

    start() {
        this.add_listening_events();
        this.load_profile();
        this.auto_expand_input();
    }

load_profile() {
    let outer = this;
    // 从服务器获取个人信息，这里假设使用ajax异步请求
    $.ajax({
        url: "http://124.220.162.220:8000/settings/hrgetinfo/",
        type: "GET",
        success: function(resp) {
            if (resp.result === "success") {
                let profile = resp; // 假设服务器返回的个人信息对象为 resp
                // 如果 photo 不为空，则显示头像
                if (profile.photo !== "") {
                    let $photoCircle = outer.$profile.find('.img-box');
                    $photoCircle.empty();
                    let img = new Image();
                    img.src = resp.photo;
                    $(img).addClass('img-box');
                    $photoCircle.append(img);
                }
                // 显示其他个人信息
                //outer.$phone.val(String(profile.phone)); // 假设电话号码存储在 profile.phone 中
                outer.show_other_info(profile);
                // 其他信息的展示类似处理
            } else {
                //alert("获取个人信息失败！");
            }
        },
        error: function() {
            //alert("获取个人信息失败！");
        }
    });
    }

    show_other_info(profile) {
    let outer = this; // 外部作用域的引用

    // 显示其他个人信息
    outer.$phone.val(profile.phone || "未填写"); // 电话号码
    outer.$residence.val(profile.residence || "未填写"); // 居住地
    outer.$desired_job.val(profile.desired_job || "未填写"); // 期望职位
    outer.$expected_salary.val(profile.expected_salary || "未填写"); // 期望薪资
    outer.$work_location.val(profile.work_location || "未填写"); // 工作地点
    outer.$bio.val(profile.bio || "未填写"); // 简介
    outer.$photo.val(profile.photo || "123");
    outer.$resume.val(profile.resume || "123");
    }



    auto_expand_input() {
        let outer = this;
        // 当界面打开时，自动将输入框放大
        this.$profile.show(function() {
            outer.$bio.focus().css('width', '200px'); // 例如设置宽度为 200px
            // 其他输入框的自动放大类似处理
        });
    }

    add_listening_events() {
        let outer = this;
        this.$save.click(function() {
            outer.save_profile();
        });
        this.$cancel.click(function() {
            outer.hide();
            outer.$menu.show();
        });
    }

    save_profile() {
        let outer = this;
        let data = {
            phone: this.$phone.val(),
            residence: this.$residence.val(),
            desired_job: this.$desired_job.val(),
            expected_salary: this.$expected_salary.val(),
            work_location: this.$work_location.val(),
            bio: this.$bio.val(),
            photo: this.$photo.val(),
            resume: this.$resume.val()
        };

        $.ajax({
            url: "http://124.220.162.220:8000/settings/hrupdateinfo/",
            type: "GET",
            data: data,
            success: function(resp) {
                if (resp.result === "success") {
                    alert("个人信息修改成功！");
                    location.reload();
                    outer.hide();
                    outer.$menu.show();
                } else {
                    //alert("修改个人信息失败！");
                }
            }
        });
    }

    show() {
        this.$profile.show();
        this.$profile.css({
            width: '50%'
        });
    }

    hide() {
        this.$profile.hide();
        this.$profile.css({
                    width: '0'
             });
    }
}

class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-profile">
            个人信息
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            退出
        </div>
    </div>
</div>
`);
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$profile = this.$menu.find('.ac-game-menu-field-item-profile');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.profile = new Profile(this.root,this.$menu);
        this.profile.hide();
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$settings.click(function(){
            outer.root.settings.logout_on_remote();
        });
        this.$profile.click(function(){
            outer.hide();
            outer.profile.show();
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }
}

class hr_AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu">
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            单人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            多人模式
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-profile">
            个人信息
        </div>
        <br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            退出
        </div>
    </div>
</div>
`);
        this.$menu.hide();
        this.root.$ac_game.append(this.$menu);
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode');
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode');
        this.$profile = this.$menu.find('.ac-game-menu-field-item-profile');
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings');

        this.profile = new hr_Profile(this.root,this.$menu);
        this.profile.hide();
        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events() {
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$settings.click(function(){
            outer.root.settings.logout_on_remote();
        });
        this.$profile.click(function(){
            outer.hide();
            outer.profile.show();
        });
    }

    show() {  // 显示menu界面
        this.$menu.show();
    }

    hide() {  // 关闭menu界面
        this.$menu.hide();
    }
}

class AcGamePlayground {
    constructor(root) {
        this.root = root;
        this.$playground = $(`
            <div class="ac-game-playground">
                <div class="job-listings" id="jobListings"></div>
                <div id="companyModal" class="modal">
                    <div class="modal-content">
                        <span class="modal-close-button">&times;</span>
                        <h2 id="modalCompanyName"></h2>
                        <p id="modalCompanyDescription"></p>
                        <p id="modalJobPosition"></p>
                        <p id="modalSalary"></p>
                        <p id="modalLocation"></p>
                        <p id="modalPhone"></p>
                        <button id="applyButton">Apply for job</button>
                    </div>
                </div>
                <button class="close-playground-button">返回菜单</button>
            </div>
        `);

        this.jobListingsContainer = this.$playground.find('#jobListings');
        this.modal = this.$playground.find('#companyModal');
        this.modalCompanyDescription = this.$playground.find('#modalCompanyDescription');
        this.$modalCompanyName = this.$playground.find('#modalCompanyName');
        this.$modalJobPosition = this.$playground.find('#modalJobPosition');
        this.$modalSalary = this.$playground.find('#modalSalary');
        this.$modalLocation = this.$playground.find('#modalLocation');
        this.$modalPhone = this.$playground.find('#modalPhone');
        this.$applyButton = this.$playground.find('#applyButton');
        this.closeButton = this.$playground.find('.modal-close-button');
        this.$closePlaygroundButton = this.$playground.find('.close-playground-button');
        this.hide();

        this.start();
    }

    start() {
        this.fetchCompanies(); // 获取公司数据
    }

    fetchCompanies() {
        $.ajax({
            url: 'http://124.220.162.220:8000/settings/getcompanys/',
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.companies = data; // 将获取到的公司列表保存到类的属性中
                this.renderJobListings(); // 渲染公司列表
                this.addModalEventListeners(); // 添加模态框事件监听器
            },
            error: (error) => {
                console.error('Error fetching companies:', error);
            }
        });
    }

    renderJobListings() {
        this.companies.forEach(company => {
            const companyCard = $(`
                <div class="company-card">
                    <div class="img-box">
                        <img src="${company.photo}" alt="Company Photo">
                    </div>
                    <div class="company-name">${company.username}</div>
                </div>
            `);
            companyCard.addClass('offset-right');
            companyCard.on('click', () => {
                this.fetchCompanyDetails(company.id);
            });
            this.jobListingsContainer.append(companyCard);
        });
    }



    showModal(company) {
        this.currentCompany = company;
        this.$modalCompanyName.text(company.username);
        this.$modalJobPosition.text(`Job Position: ${company.desired_job}`);
        this.$modalSalary.text(`Salary: ${company.expected_salary}`);
        this.$modalLocation.text(`Location: ${company.work_location}`);
        this.$modalPhone.text(`Phone: ${company.phone}`);
        this.modalCompanyDescription.text(company.bio);
        this.modal.show();
    }

    addModalEventListeners() {
        let outer = this;
        this.closeButton.on('click', () => {
            this.modal.hide();
        });

        $(window).on('click', event => {
            if (event.target === this.modal[0]) {
                this.modal.hide();
            }
        });

        this.$closePlaygroundButton.on('click', () => {
            this.hide();
            outer.root.menu.show();
        });

        this.$applyButton.on('click', () => {
            this.applyForJob();
        });
    }

    applyForJob() {
        let jobseekerId = this.jobseekerId;
        let company = this.currentCompany

        $.ajax({
            url: `http://124.220.162.220:8000/settings/applyforjob/`,
            type: 'GET',
            data: {
                jobseeker_id:jobseekerId,
                company_id: company.id,
                job_position: company.desired_job,
                salary: company.expected_salary,
                location: company.work_location
            },
            dataType: 'json',
            success: (response) => {
                alert(response.message);
            },
            error: (error) => {
                console.error('Error applying for job:', error);
                alert('Error applying for job');
            }
        });
    }

    show() {
        // 设置 $playground 的样式
        this.$playground.css({
            width: '80%', // 页面宽度的80%
            height: '80%', // 页面高度的80%
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fefefe',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '20px',
            overflow: 'auto'
        });

        // 设置 #jobListings 的样式
        this.jobListingsContainer.css({
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px'
        });

        // 设置 modal 的样式
        this.modal.css({
            display: 'none', // 初始隐藏模态框
            position: 'fixed',
            zIndex: '1',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            backgroundColor: '#fefefe',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            padding: '20px'
        });

        // 设置 modal 关闭按钮的样式
        this.closeButton.css({
            position: 'absolute',
            top: '10px',
            right: '10px',
            fontSize: '24px',
            cursor: 'pointer'
        });

        this.$playground.show();
        this.root.$ac_game.append(this.$playground);
    }

    hide() {
        this.$playground.hide();
    }

    fetchCompanyDetails(companyId) {
        let outer = this;
        $.ajax({
            url: `http://124.220.162.220:8000/settings/getcompanydetails/${companyId}/`,
            method: 'GET',
            dataType: 'json',
            success: (company) => {
                this.showModal(company);
            },
            error: (error) => {
                console.error('Error fetching company details:', error);
            }
        });
        $.ajax({
            url: `http://124.220.162.220:8000/settings/getinfo/`,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                outer.jobseekerId = data.id;
            },
            error: (error) => {
                console.error('Error fetching company details:', error);
            }
        });

    }
}

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
export class AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.AcWingOS = AcWingOS;

        this.settings = new Settings(this);
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}

export class hr_AcGame {
    constructor(id, AcWingOS) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.AcWingOS = AcWingOS;

        this.settings = new hr_Settings(this);
        this.menu = new hr_AcGameMenu(this);
        //this.playground = new hr_AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
