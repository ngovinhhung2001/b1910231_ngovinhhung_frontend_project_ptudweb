<template>
    <div class="d-flex justify-content-center py-5">
        <div class="col-11 col-md-6 col-lg-4 col-xl-3">
            <div class="card px-5 pt-5 pb-4" style="border-radius: 20px;">
                <form @submit.prevent="handleSubmit">
                    <h3 class="text-primary text-center">Đăng Kí</h3>

                    <div class="form-group">
                        <label for="name">Tên:</label>
                        <input name="name" type="text" class="form-control" v-model="name" placeholder="Họ và Tên"
                            @input="validateName" />
                        <span class="text-danger" v-if="message.name != null">{{ message.name }}</span>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input name="email" type="email" class="form-control" v-model="email" placeholder="Email"
                            @input="validateEmail" />
                        <span class="text-danger" v-if="message.email != null">{{ message.email }}</span>
                    </div>

                    <div class="form-group">
                        <label for="phone">Số điện thoại:</label>
                        <input name="phone" type="text" class="form-control" v-model="phone" placeholder="Số điện thoại"
                            @input="validatePhone" />
                        <span class="text-danger" v-if="message.phone != null">{{ message.phone }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <input name="password" type="password" class="form-control" v-model="password"
                            placeholder="Mật khẩu" @input="validatePassword" />
                        <span class="text-danger" v-if="message.password != null">{{ message.password }}</span>
                    </div>

                    <div class="form-group">
                        <label for="password_conf">Xác nhận mật khẩu:</label>
                        <input name="password_conf" type="password" class="form-control" v-model="password_conf"
                            placeholder="Nhập lại mật khẩu" @input="validatePasswordConf" />
                        <span class="text-danger" v-if="message.password_conf != null">{{ message.password_conf }}</span>

                    </div>

                    <div class="input-group mb-3">
                        <p class="m-0" style="margin-right: 0.5rem !important;">Bạn đã có tài khoản?</p>
                        <router-link :to="{ name: 'signin' }">
                            <a class="text-decoration-none text-reset text-primary">Đăng nhập</a></router-link>
                    </div>
                    <!-- {{ message }} -->
                    <button class="btn btn-primary m-auto d-flex">Đăng kí</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '@/services/user.service';

export default {
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            password: '',
            password_conf: '',
            message: {},
        }
    },
    methods: {
        async handleSubmit() {
            this.validateForm();
            if (this.message.name != null || this.message.email != null
                || this.message.phone != null || this.message.password != null
                || this.message.password_conf != null) {
                return false
            }
            const data = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                password: this.password,
                password_conf: this.password_conf,
            }
            try {
                const res = await UserService.signUp(data);
                alert(res.message);
                this.$router.push('/signin');
            } catch (error) {
                alert('Tài khoản đã tồn tại');
            }
        },
        validateName() {
            if (this.name.length == 0) {
                this.message.name = 'Tên không được trống';
            } else if (this.name.length >= 30) {
                this.message.name = 'Tên không được dài quá 30 kí tự';
            } else {
                this.message.name = null;
            }
        },
        validateEmail() {
            if (this.email.length == 0) {
                this.message.email = 'Email không được trống';
            } else if (!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email))) {
                this.message.email = 'Email không đúng định dạng';
            } else {
                this.message.email = null;
            }
        },
        validatePhone() {
            if (this.phone.length == 0) {
                this.message.phone = 'Số điện thoại không được trống';
            } else if (!(/^\d{10}$/.test(this.phone))) {
                this.message.phone = 'Số điện thoại không đúng định dạng';
            } else {
                this.message.phone = null;
            }
        },
        validatePassword() {
            if (this.password.length == 0) {
                this.message.password = 'Mật khẩu không được trống';
            } else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password))) {
                this.message.password = 'Mật khẩu phải ít nhất 8 kí tự trong đó ít nhất 1 chữ cái, 1 số';
            } else {
                this.message.password = null;
            }
        },
        validatePasswordConf() {
            if (this.password_conf != this.password) {
                this.message.password_conf = 'Mật khẩu không trùng khớp';
            } else {
                this.message.password_conf = null;
            }
        },
        validateForm() {
            this.validateName();
            this.validateEmail();
            this.validatePhone();
            this.validatePassword();
            this.validatePasswordConf();
        }

    }
}
</script>