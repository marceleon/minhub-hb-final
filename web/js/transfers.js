const app = new Vue({
    el: '#app',
    data: {
        clientAccounts: [],
        clientAccountsTo: [],
        debitCards: [],
        errorToats: null,
        errorMsg: null,
        accountFromNumber: 'VIN',
        accountToNumber: 'VIN',
        trasnferType: 'own',
        amount: 0,
        description: '',
    },
    methods: {
        getData() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:3000/api/v1/clients/${id}`, { headers: { 'auth-token': token } })
                .then((response) => {
                // get client ifo
                    this.clientAccounts = response.data.response.accounts;
                    console.log(this.clientAccounts);
                })
                .catch((error) => {
                    this.errorMsg = 'Error getting data';
                    this.errorToats.show();
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        checkTransfer() {
            if (this.accountFromNumber == 'VIN') {
                this.errorMsg = 'You must select an origin account';
                this.errorToats.show();
            } else if (this.accountToNumber == 'VIN') {
                this.errorMsg = 'You must select a destination account';
                this.errorToats.show();
            } else if (this.amount == 0) {
                this.errorMsg = 'You must indicate an amount';
                this.errorToats.show();
            } else if (this.description.length <= 0) {
                this.errorMsg = 'You must indicate a description';
                this.errorToats.show();
            } else {
                this.modal.show();
            }
        },
        transfer() {
            const token = localStorage.getItem('token');

            console.log(this.accountFromNumber);
            console.log(this.accountToNumber);

            const data = {
                fromNumber: this.accountFromNumber,
                toNumber: this.accountToNumber,
                amount: this.amount,
                description: this.description,
            };

            const header = {
                headers: {
                    'auth-token': token,
                },
            };

            axios.post('http://localhost:3000/api/v1/transfer', data, header)
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
            this.accountFromNumber = 'VIN';
            this.accountToNumber = 'VIN';
        },
        changedFrom() {
            if (this.trasnferType == 'own') {
                this.clientAccountsTo = this.clientAccounts.filter((account) => account.number != this.accountFromNumber);
                this.accountToNumber = 'VIN';
            }
        },
        finish() {
            window.location.reload();
        },
        signOut() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            window.location.href = './index.html';
/*            axios.post('/api/logout')
                .then((response) => window.location.href = '/index.html')
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
        this.getData();
    },
});
