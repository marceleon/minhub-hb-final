var app = new Vue({
    el:"#app",
    data:{
        clientInfo: {},
        error: null
    },
    methods:{
        getData: function(){
            axios.get("http://localhost:3000/api/v1/clients/621020daf177469981af5c10")
            .then(function (response) {
                //get client ifo
                app.clientInfo = response.data.response;
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                app.error = error;
            })
        },
        formatDate: function(date){
            return new Date().toLocaleDateString('en-US');
        }
    },
    mounted: function(){
        this.getData();
    }
})