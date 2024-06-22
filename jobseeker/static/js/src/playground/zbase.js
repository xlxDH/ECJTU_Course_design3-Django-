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
                    </div>
                </div>
            </div>
        `);

        this.jobListingsContainer = this.$playground.find('#jobListings');
        this.modal = this.$playground.find('#companyModal');
        this.modalCompanyName = this.$playground.find('#modalCompanyName');
        this.modalCompanyDescription = this.$playground.find('#modalCompanyDescription');
        this.$modalJobPosition = this.$playground.find('#modalJobPosition');
        this.$modalSalary = this.$playground.find('#modalSalary');
        this.$modalLocation = this.$playground.find('#modalLocation');
        this.$modalPhone = this.$playground.find('#modalPhone');
        this.closeButton = this.$playground.find('.modal-close-button');

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
                this.showModal(company);
            });

            this.jobListingsContainer.append(companyCard);
        });
    }

    showModal(company) {
        this.modalCompanyName.text(company.username);
        this.$modalJobPosition.text(`Job Position: ${company.desired_job}`);
        this.$modalSalary.text(`Salary: ${company.expected_salary}`);
        this.$modalLocation.text(`Location: ${company.work_location}`);
        this.$modalPhone.text(`Phone: ${company.phone}`);
        this.modalCompanyDescription.text(company.bio);
        this.modal.show();
    }

    addModalEventListeners() {
        this.closeButton.on('click', () => {
            this.modal.hide();
        });

        $(window).on('click', event => {
            if (event.target === this.modal[0]) {
                this.modal.hide();
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
}

