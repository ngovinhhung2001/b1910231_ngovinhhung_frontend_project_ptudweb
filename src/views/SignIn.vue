<template>
    <div class="d-flex justify-content-center py-5">
        <div class="col-11 col-md-6 col-lg-4 col-xl-3">
            <div class="card px-5 pt-5 pb-4" style="border-radius: 20px;">
                <form @submit.prevent="handleSubmit">
                    <h3 class="text-primary text-center text-uppercase">Đăng Nhập</h3>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input name="email" type="email" class="form-control" placeholder="Email" v-model="email" />
                    </div>

                    <div class="form-group">
                        <label for="password">Mật khẩu:</label>
                        <input name="password" type="password" class="form-control" placeholder="Mật khẩu"
                            v-model="password" />
                    </div>

                    <div class="input-group mb-3">
                        <p class="m-0" style="margin-right: 0.5rem !important;">Bạn chưa có tài khoản?</p>
                        <router-link :to="{ name: 'signup' }">
                            <a class="text-decoration-none text-reset text-primary">Đăng kí</a>
                        </router-link>
                    </div>

                    <button class="btn btn-primary m-auto d-flex">Đăng nhập</button>
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
            email: '',
            password: '',
            user: null,
        }
    },
    methods: {
        async handleSubmit() {
            const data = {
                email: this.email,
                password: this.password,
            }
            try {
                const res = await UserService.signIn(data);
                this.$cookies.set('jwt', res.token, { expires: "12h" });
                this.$router.push('/');
            } catch (error) {
                alert('Sai email hoặc mật khẩu! Vui lòng kiểm tra lại.');
            }
        }
    }
}
</script>