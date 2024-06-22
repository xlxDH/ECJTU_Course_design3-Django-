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

