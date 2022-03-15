const app = new Vue({
    el: '#app',
    data: {
        clientInfo: {},
        creditCards: [],
        debitCards: [],
        errorToats: null,
        errorMsg: null,
    },
    methods: {
        getData() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:3000/api/v1/clients/${id}`, { headers: { 'auth-token': token } })
                .then((response) => {
                // get client ifo
                    this.clientInfo = response.data.response;
                    this.creditCards = this.clientInfo.cards.filter((card) => card.type == 'CREDIT');
                    this.debitCards = this.clientInfo.cards.filter((card) => card.type == 'DEBIT');
                })
                .catch((error) => {
                    this.errorMsg = 'Error getting data';
                    this.errorToats.show();
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        signOut() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            window.location.href = './index.html';
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
        this.getData();
    },
});
