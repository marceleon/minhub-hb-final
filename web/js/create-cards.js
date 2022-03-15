const app = new Vue({
    el: '#app',
    data: {
        errorToats: null,
        errorMsg: null,
        cardType: 'none',
        cardColor: 'none',
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
        signOut() {
            localStorage.removeItem('id');
            localStorage.removeItem('token');
            window.location.href = './index.html';
        },
        create(event) {
            event.preventDefault();
            if (this.cardType == 'none' || this.cardColor == 'none') {
                this.errorMsg = 'You must select a card type and color';
                this.errorToats.show();
            } else {
                const config = {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                    },
                };
                const id = localStorage.getItem('id');
                const token = localStorage.getItem('token');

                const data = { client: id,
                    type: this.cardType,
                    color: this.cardColor,
                };

                const header = {
                    headers: {
                        'auth-token': token,
                    },
                };

                console.log('llegó acá');
                axios.post('http://localhost:3000/api/v1/card', data, header)
/*                {                    
                    body: {
                    client: id,
                    type: this.cardType,
                    color: this.cardColor,
                },
                {
                    headers: {
                        'auth-token': token,
                    },
                })*/
                    .then((response) => window.location.href = '/cards.html')
                    .catch((error) => {
                        this.errorMsg = error.response.data;
                        this.errorToats.show();
                    });
            }
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
    },
});
