<template>
    <div class="header">
        <nav class="navbar navbar-expand-sm navbar-light shadow" style="background-color: #e3f2fd;">
            <div class="container">
                <router-link :to="{ name: 'home' }">
                    <a class="a-hover navbar-brand text-primary fw-bold m-0">CIT Library</a>
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <router-link :to="{ name: 'signin' }" v-if="!user">
                        <a class="btn-hover btn btn-outline-primary my-2 my-sm-0 rounded-pill fw-bold">
                            Đăng nhập
                        </a>
                    </router-link>
                    <div class="nav-item dropdown" v-else>
                        <div class="row">
                            <div class="col-2 p-0">
                                <img class="rounded-circle" src="/assets/images/no-avatar-male-2.jpg" style="height: 24px;">
                            </div>
                            <div class="col-10">
                                <a class="nav-link dropdown-toggle fw-bold text-primary" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    {{ userInfo.name }}
                                </a>
                                <ul class="dropdown-menu slideIn ">
                                    <li><a class="dropdown-item text-primary" href="#">Thông tin người dùng</a></li>
                                    <li>
                                        <router-link :to="{ name: 'userborrowedbook' }"> <a
                                                class="dropdown-item text-primary">
                                                Tất cả phiếu mượn</a>
                                        </router-link>
                                    </li>
                                    <li v-if="this.userInfo._id == '643f66bd80a13d39e7021203'">
                                        <router-link :to="{ name: 'adminBook' }"> <a class="dropdown-item text-primary">
                                                Quản lý</a>
                                        </router-link>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item text-danger" @click="signOut">Đăng xuất</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const store = useStore();

        const router = useRouter();

        const user = computed(() => store.state.user);

        const userInfo = computed(() => store.state.userInfo);

        const signOut = async () => {
            await fetch('http://localhost:3000/api/users/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            store.dispatch('setUser', null);
            store.dispatch('setUserInfo', null);
            router.push('/');
        }

        return {
            user,
            userInfo,
            signOut
        }
    }
}
</script>