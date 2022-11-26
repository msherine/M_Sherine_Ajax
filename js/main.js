import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                // message: 'Hello Vue!',
                fnameError: false,
                lnameError: false,
                emailError: false,
                messageError:false,
                msgSuccess: false,

                form : {
                    firstname: "",
                    lastname: "",
                    email: "",
                    message: ""

                }
            }
        },

        methods: {
            processMailFailure(result) {
               
                // show a failure message in the UI
                // use this.$refs to connect to the elements on the page and mark any empty fields/inputs with an error class
                // alert('failure! and if you keep using an alert, DOUBLE failure!');        
                // show some errors in the UI here to let the user know the mail attempt was successful
                if (this.form.firstname.length > 0 && this.form.firstname.length <20){
                    this.$refs.fname.classList.add("success");
                    this.fnameError = false;
                } else {
                    this.$refs.fname.classList.add("error");
                    this.fnameError = true;
                }

                if (this.form.lastname.length > 0 && this.form.lastname.length < 20){
                    this.$refs.lname.classList.add("success");
                    this.lnameError = false;
                } else {
                    this.$refs.lname.classList.add("error");
                    this.lnameError = true;
                }

                if (this.form.email.length > 0 && this.form.email.length < 20){
                    this.$refs.email.classList.add("success");
                    this.emailError = false;
                } else {
                    this.$refs.email.classList.add("error");
                    this.emailError = true;
                }

                if (this.form.message != 0){
                    this.$refs.message.classList.add("success");
                    this.messageError = false;
                } else {
                    this.$refs.message.classList.add("error");
                    this.messageError = true;
                }

                
                
            },

            processMailSuccess(result) {
                
                // show a success message in the UI
                // alert("success! but don't EVER use alerts. They are gross.");        
                // show some UI here to let the user know the mail attempt was successful
                this.$refs.fname.classList.remove("error");
                this.$refs.lname.classList.remove("error");
                this.$refs.email.classList.remove("error");
                this.$refs.message.classList.remove("error");
                this.$refs.fname.classList.add("success");
                this.msgSuccess = true;
                this.fnameError = false;
                this.lnameError = false;
                this.emailError = false;
                this.messageError = false;
                this.error = false;

            },

            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();