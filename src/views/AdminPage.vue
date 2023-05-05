<template>
    <div style="min-height: 120px;">
        <div class="d-flex">
            <div class="collapse show collapse-horizontal" id="collapseAdminBar">
                <div class="card card-body rounded-0" style="width: 200px; height: 100vh;">
                    <router-link :to="{ name: 'home' }" class="text-center a-hover navbar-brand ">
                        <p class="h5 fw-bold text-primary m-0">CIT Library</p>
                    </router-link>
                    <hr>
                    <router-link class="my-1" :to="{ name: 'adminBook' }">
                        <a class="a-hover navbar-brand text-primary fw-bold">Sách</a>
                    </router-link>
                    <router-link class="my-1" :to="{ name: 'adminAuthor' }">
                        <a class="a-hover navbar-brand text-primary fw-bold">Tác giả</a>
                    </router-link>
                    <router-link class="my-1" :to="{ name: 'adminPublisher' }">
                        <a class="a-hover navbar-brand text-primary fw-bold">Nhà xuất bản</a>
                    </router-link>
                    <router-link class="my-1" :to="{ name: 'adminBorrowedBook' }">
                        <a class="a-hover navbar-brand text-primary fw-bold">Phiếu mượn</a>
                    </router-link>
                    <router-link class="my-1" :to="{ name: 'adminImage' }">
                        <a class="a-hover navbar-brand text-primary fw-bold">Hình ảnh</a>
                    </router-link>
                </div>
            </div>
            <button class="btn btn-primary rounded-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapseAdminBar" aria-expanded="false" aria-controls="collapseAdminBar"
                style="height: 100vh;" title="collapseBtn">
                <i class="fas fa-bars"></i>
            </button>
            <div class="col">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
    methods: {
        checkAdmin() {
            if (this.user != '643f66bd80a13d39e7021203') {
                this.$router.push('/');
            }
        }
    },
    created() {
        this.checkAdmin();
    },
    setup() {
        const store = useStore();

        const user = computed(() => store.state.user);

        const userInfo = computed(() => store.state.userInfo);

        return {
            user,
            userInfo,
        }
    },

}
</script>