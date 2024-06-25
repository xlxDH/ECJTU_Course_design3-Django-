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
                        <br>
                        <p id="modalJobPosition"></p>
                        <p id="modalSalary"></p>
                        <p id="modalLocation"></p>
                        <p id="modalPhone"></p>
                        <button id="applyButton">申请求职</button>
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
        this.$modalJobPosition.text(`招聘职位: ${company.desired_job}`);
        this.$modalSalary.text(`薪资: ${company.expected_salary}`);
        this.$modalLocation.text(`工作地点: ${company.work_location}`);
        this.$modalPhone.text(`公司电话: ${company.phone}`);
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

class hr_AcGamePlayground {
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
                        <br>
                        <p id="modalJobPosition"></p>
                        <p id="modalSalary"></p>
                        <p id="modalLocation"></p>
                        <p id="modalPhone"></p>
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
        this.$modalJobPosition.text(`招聘职位: ${company.desired_job}`);
        this.$modalSalary.text(`薪资: ${company.expected_salary}`);
        this.$modalLocation.text(`工作地点: ${company.work_location}`);
        this.$modalPhone.text(`公司电话: ${company.phone}`);
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

