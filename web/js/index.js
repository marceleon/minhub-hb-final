const app = new Vue({
    el: '#app',
    data: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        errorToats: null,
        errorMsg: '',
        showSignUp: false,
    },
    methods: {
        signIn(event) {
            event.preventDefault();
            const config = {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            };
            axios.post('http://localhost:3000/api/login', `email=${this.email}&password=${this.password}`, config)
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('id', response.data.id);
                    //console.log(response.data.id);
                    window.location.href = '/accounts.html';
                })
                .catch(() => {
                    this.errorMsg = 'Sign in failed, check the information';
                    this.errorToats.show();
                });
        },
        signUp(event) {
            event.preventDefault();
            const config = {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
            };
            axios.post('http://localhost:3000/api/user', `firstName=${this.firstName}&lastName=${this.lastName}&email=${this.email}&password=${this.password}`, config)
                .then(() => { this.signIn(event); })
                .catch(() => {
                    this.errorMsg = 'Sign up failed, check the information';
                    this.errorToats.show();
                });
        },
        showSignUpToogle() {
            this.showSignUp = !this.showSignUp;
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('en-gb');
        },
    },
    mounted() {
        this.errorToats = new bootstrap.Toast(document.getElementById('danger-toast'));
    },
});
