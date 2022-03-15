const app = new Vue({
    el: '#app',
    data: {
        accountInfo: {},
        errorToats: null,
        errorMsg: null,
    },
    methods: {
        getData() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            const token = localStorage.getItem('token');

            console.log('llegó aca')

            axios.get(`http://localhost:3000/api/v1/account/${id}`, {
                headers: {
                    'auth-token': token,
                }
            })
                .then((response) => {
                // get client ifo
                    console.log(response.data);

                    this.accountInfo = response.data.response;
                    this.accountInfo.transactions.sort((a, b) => parseInt(b.id - a.id));
                })
                .catch((error) => {
                // handle error
                    this.errorMsg = 'Error getting data';
                    this.errorToats.show();
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        signOut() {
            axios.post('/api/logout')
                .then((response) => window.location.href = '/web/index.html')
                .catch(() => {
                    this.errorMsg = 'Sign out failed';
                    this.errorToats.show();
                });
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
        this.getData();
    },
});
