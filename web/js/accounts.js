const app = new Vue({
    el: '#app',
    data: {
        clientInfo: {},
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
        //    axios.post('/api/logout')
        //        .then((response) => {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            window.location.href = './index.html';
            //       })
            //       .catch(() => {
            //           this.errorMsg = 'Sign out failed';
            //           this.errorToats.show();
            //       });
        },
        create() {
            const id = localStorage.getItem('id');
            const token = localStorage.getItem('token');
            
            const data = {
                client: id,
            };

            const header = {
                headers: {
                    'auth-token': token,
                },
            };
            
            axios.post('http://localhost:3000/api/v1/account', data, header)
                .then((response) => window.location.reload())
                .catch((error) => {
                    this.errorMsg = error.response.data;
                    this.errorToats.show();
                });
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
        this.getData();
    },
});
