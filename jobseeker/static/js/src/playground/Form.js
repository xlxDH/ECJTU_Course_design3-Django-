class AcForm {
    constructor(root, jobseekerId) {
        this.root = root;
        this.jobseekerId = null;
        this.$formContainer = $(`
            <div class="ac-game-playground">
                <div class="job-applications-container">
                    <h2 text-align:center>Job Applications</h2>
                    <table class="table table-bordered" id="applicationsTable">
                        <thead>
                            <tr>
                                <th>公司</th>
                                <th>就任职业</th>
                                <th>薪资</th>
                                <th>工作地点</th>
                                <th>是否同意</th>
                                <th>公司是否同意</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Data will be dynamically inserted here -->
                        </tbody>
                    </table>
                </div>
                <div id="approvalModal" class="modal">
                    <div class="modal-content">
                        <h5>Update Approval Status</h5>
                        <form id="approvalForm">
                            <div class="form-group">
                                <label for="isJobseekerApproved">Approved</label>
                                <select class="form-control" id="isJobseekerApproved">
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                            <input type="hidden" id="applicationId">
                        </form>
                        <button type="button" class="btn btn-secondary close-button">Close</button>
                        <button type="button" class="btn btn-primary" id="saveApprovalButton">Save changes</button>
                    </div>
                </div>
                <button class="close-form-button">返回菜单</button>
            </div>
        `);

        this.$closeFormButton = this.$formContainer.find('.close-form-button');
        this.applicationsTable = this.$formContainer.find('#applicationsTable tbody');
        this.modal = this.$formContainer.find('#approvalModal');
        this.applicationIdInput = this.$formContainer.find('#applicationId');
        this.isJobseekerApprovedSelect = this.$formContainer.find('#isJobseekerApproved');
        this.closeButtons = this.$formContainer.find('.close-button');
        this.saveApprovalButton = this.$formContainer.find('#saveApprovalButton');

        this.hide();

        this.start();
    }

    start() {
        this.fetchJobseekerId();
        this.fetchApplications(); // 获取申请数据
        this.addModalEventListeners(); // 添加模态框事件监听器
    }

    fetchJobseekerId() {
        let outer = this;

        $.ajax({
            url: 'http://124.220.162.220:8000/settings/getinfo/',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                outer.jobseekerId = data.id;
                outer.fetchApplications(); // 在获取到求职者ID后再获取申请数据
            },
            error: function(error) {
                console.error('Error fetching jobseeker info:', error);
            }
        });
    }

    fetchApplications() {
        if(this.jobseekerId===null){
            return;
        }

        $.ajax({
            url: `http://124.220.162.220:8000/settings/getapplications/${this.jobseekerId}/`,
            method: 'GET',
            dataType: 'json',
            success: (data) => {
                this.renderApplications(data); // 渲染申请数据
            },
            error: (error) => {
                console.error('Error fetching applications:', error);
            }
        });
    }

    renderApplications(applications) {
        this.applicationsTable.empty();
        applications.forEach(application => {
            const row = $(`
                <tr data-id="${application.id}">
                    <td>${application.company_id}</td>
                    <td>${application.job_position}</td>
                    <td>${application.salary}</td>
                    <td>${application.location}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-primary edit-approval-button" data-id="${application.id}" data-approved="${application.is_jobseeker_approved}">
                            ${application.is_jobseeker_approved ? 'Yes' : 'No'}
                        </button>
                    </td>
                    <td>${application.is_company_approved ? 'Yes':'No'}</td>
                </tr>
            `);

            row.find('.edit-approval-button').on('click', () => {
                this.showModal(application.id, application.is_jobseeker_approved);
            });

            this.applicationsTable.append(row);
        });
    }

    showModal(applicationId, isApproved) {
        this.applicationIdInput.val(applicationId);
        this.isJobseekerApprovedSelect.val(isApproved.toString());
        this.modal.show();
    }

    addModalEventListeners() {
        let outer = this;
        this.closeButtons.on('click', () => {
            this.modal.hide();
        });

        $(window).on('click', (event) => {
            if (event.target === this.modal[0]) {
                this.modal.hide();
            }
        });

        this.saveApprovalButton.on('click', () => {
            this.updateApplication();
        });

        this.$closeFormButton.on('click', () => {
            this.hide();
            outer.root.menu.show();
        });

    }

    updateApplication() {
        let applicationId = this.applicationIdInput.val();
        let isApproved = this.isJobseekerApprovedSelect.val();

        $.ajax({
            url: 'http://124.220.162.220:8000/settings/updateapplication/',
            method: 'GET',
            data: {
                id: applicationId,
                is_jobseeker_approved: isApproved,
                jobseeker_id: this.jobseekerId
            },
            success: (response) => {
                alert(response.message);
                this.modal.hide();
                this.fetchApplications(); // 重新获取申请数据
            },
            error: (error) => {
                console.error('Error updating application:', error);
                alert('Error updating application');
            }
        });
    }

    show() {
        this.$formContainer.show();
        this.root.$ac_game.append(this.$formContainer);
    }

    hide() {
        this.$formContainer.hide();
    }
}

// 添加CSS样式
const style = document.createElement('style');
style.innerHTML = `
    .ac-game-playground {
        margin: 0 auto;
        padding-top: 50px;
    }
    .job-applications-container {
        width: 100%;
        background: rgba(255, 255, 255, 0.8);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .modal-content {
        background-color: rgba(255, 255, 255, 0.7);
    }
    .company-card {
        opacity: 0.3;
    }
    .company-card:hover {
        background: linear-gradient(to right, rgb(209, 214, 181), rgb(187, 201, 244));
        opacity: 1.0;
    }
    .offset-right {
        transform: translateX(10%);
    }
    .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
    }
    .table th,
    .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
        text-align: center;
    }
    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
    }
    .table tbody + tbody {
        border-top: 2px solid #dee2e6;
    }
    .table-bordered {
        border: 1px solid #dee2e6;
    }
    .table-bordered th,
    .table-bordered td {
        border: 1px solid #dee2e6;
    }
    .table-bordered thead th,
    .table-bordered thead td {
        border-bottom-width: 2px;
    }
    .text-center {
        text-align: center;
    }
`;
document.head.appendChild(style);

