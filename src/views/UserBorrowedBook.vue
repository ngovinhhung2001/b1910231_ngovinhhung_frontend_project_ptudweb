<template>
    <img id="cover-img" src="/assets/images/cover.jpg">
    <div class="container mt-3" style="min-height: 50vh;">
        <div class="row justify-content-around">
            <div class="mb-3 mt-1 text-center transition">
                <h2 class="d-inline"></h2>
                <h3 class="d-inline text-primary text-uppercase">Tất cả phiếu mượn</h3>
            </div>
            <!-- <hr> -->
            <EasyDataTable class="user-customize-table mt-2 p-0 w-50" :headers="headers" :items="items" :rows-per-page="3"
                :hide-rows-per-page="true" show-index fixed-index :buttons-pagination="true" theme-color="#1d90ff"
                :table-min-height="0" :index-column-width="10" :loading="loading">
                <template #item-status="{ status }">
                    <div class="row">
                        <p v-if="status == 0" class="m-0 text-warning">
                            <i class="fas fa-circle"></i>
                        </p>
                        <p v-if="status == 1" class="m-0 text-success"><i class="fas fa-circle"></i>
                        </p>
                        <p v-if="status == -1" class="m-0 text-primary"><i class="fas fa-circle"></i>
                        </p>
                    </div>
                </template>
                <template #item-action="{ _id }">
                    <div class="row">
                        <div class="btn btn-primary d-block" data-bs-toggle="modal"
                            v-bind:data-bs-target="'#borrowedbookmodal' + _id" style="width: 40px;"><i
                                class="fas fa-info"></i>
                        </div>
                    </div>
                </template>
                <template #empty-message>
                    <span class="h5 text-primary">Không có dữ liệu</span>
                </template>
            </EasyDataTable>
            <div class="d-flex justify-content-center mt-2">
                <p class="m-0 ms-4 p-0 d-inline">Chú thích:</p>
                <p class="m-0 ms-3 text-warning d-inline"><i class="fas fa-circle"></i></p>
                <p class="m-0 ms-1 d-inline">Đang chờ duyệt mượn (0)</p>
                <p class="m-0 ms-3 text-success d-inline"><i class="fas fa-circle"></i></p>
                <p class="m-0 ms-1 d-inline">Đã được duyệt mượn (1)</p>
                <p class="m-0 ms-3 text-primary d-inline"><i class="fas fa-circle"></i></p>
                <p class="m-0 ms-1 d-inline">Đã trả (-1)</p>
            </div>
            <BorrowedBookDetail v-for="(item) in items" v-bind:key="item._id" :borrowedbook="item">
            </BorrowedBookDetail>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BorrowedBookService from '@/services/borrowedbook.service';
import BorrowedBookDetail from '@/components/BorrowedBookDetail.vue';

export default {
    components: {
        BorrowedBookDetail
    },
    data() {
        return {
            userborrowedbooks: [],
            headers: [
                { text: "Ngày mượn", value: "borrowed_date", sortable: true },
                { text: "Trạng thái", value: "status", sortable: false, width: 50 },
                { text: "", value: "action", sortable: false, width: 17 },
            ],
            items: [],
            loading: false,
        }
    },
    methods: {
        async retriveBorrowedBook() {
            try {
                const allborrowedbooks = await BorrowedBookService.getAll();

                for (var i = 0; i < allborrowedbooks.length; i++) {
                    if (allborrowedbooks[i].user._id == this.userInfo._id) {
                        this.userborrowedbooks.push(allborrowedbooks[i]);
                    }
                }

                this.items = this.userborrowedbooks;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        this.retriveBorrowedBook();
    },
    setup() {
        const store = useStore();

        const user = computed(() => store.state.user);

        const userInfo = computed(() => store.state.userInfo);

        return {
            user,
            userInfo,
        }
    }
}
</script>