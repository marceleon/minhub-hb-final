const app = new Vue({
    el: '#app',
    data: {
        loanTypes: [],
        loanTypeId: 0,
        payments: 0,
        paymentsList: [],
        clientAccounts: [],
        errorToats: null,
        errorMsg: null,
        accountToNumber: 'VIN',
        amount: 0,
        fees: [],
    },
    methods: {
        getData() {

            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            Promise.all([axios.get('http://localhost:3000/api/v1/lines', { headers: { 'auth-token': token } }), 
                         axios.get(`http://localhost:3000/test/v1/clients/${id}/accounts`, { headers: { 'auth-token': token } })])
                .then((response) => {
                // get loan types ifo

                    this.loanTypes = response[0].data.response;
                    this.clientAccounts = response[1].data.response;
                })
                .catch((error) => {
                    this.errorMsg = 'Error getting data';
                    this.errorToats.show();
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        checkApplication() {
            if (this.loanTypeId == 0) {
                this.errorMsg = 'You must select a loan type';
                this.errorToats.show();
            } else if (this.payments == 0) {
                this.errorMsg = 'You must select payments';
                this.errorToats.show();
            } else if (this.accountToNumber == 'VIN') {
                this.errorMsg = 'You must indicate an account';
                this.errorToats.show();
            } else if (this.amount == 0) {
                this.errorMsg = 'You must indicate an amount';
                this.errorToats.show();
            } else {
                this.modal.show();
            }
        },
        apply() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            const data = {
                lineLoan: this.loanTypeId,
                account: this.accountToNumber,
                amount: this.amount,
                payments: this.payments,
            };

            const header = {
                headers: {
                    'auth-token': token,
                },
            };

            axios.post('http://localhost:3000/api/v1/loananddep', data, header)
                .then((response) => {
                    this.modal.hide();
                    this.okmodal.show();
                })
                .catch((error) => {
                    this.errorMsg = error.response.data;
                    this.errorToats.show();
                });
        },
        changedType() {
            this.paymentsList = this.loanTypes.find((loanType) => loanType._id == this.loanTypeId).installments;
        },
        finish() {
            window.location.reload();
        },
        checkFees() {
            this.fees = [];
            this.totalLoan = parseInt(this.amount) + (this.amount * 0.2);
            const amount = this.totalLoan / this.payments;
            for (let i = 1; i <= this.payments; i++) {
                this.fees.push({ amount });
            }
            this.feesmodal.show();
        },
        signOut() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            window.location.href = './index.html';
/*            axios.post('/api/logout')
                .then((response) => window.location.href = '/web/index.html')
                .catch(() => {
                    this.errorMsg = 'Sign out failed';
                    this.errorToats.show();
                });*/
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
        this.modal = new bootstrap.Modal(document.getElementById('confirModal'));
        this.okmodal = new bootstrap.Modal(document.getElementById('okModal'));
        this.feesmodal = new bootstrap.Modal(document.getElementById('feesModal'));
        this.getData();
    },
});
