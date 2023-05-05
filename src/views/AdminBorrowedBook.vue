<template>
    <!-- <div style="overflow:scroll; height: 100vh;"> -->
    <p class="h2 text-center m-3 text-uppercase text-primary fw-bold">Quản lý Phiếu mượn</p>

    <div class="d-flex justify-content-center">
        <div class="col-auto">
            <span class="fw-bold">Cột: </span>
            <select v-model="searchField" style="height: 29px">
                <option value="user.name">Họ và tên</option>
                <option value="user.email">Email</option>
                <option value="borrowed_date">Ngày mượn</option>
                <option value="status">Trạng thái</option>
            </select>
            <span class="ms-3 fw-bold">Giá trị: </span>
            <input type="text" v-model="searchValue">
        </div>
    </div>

    <EasyDataTable class="customize-table mt-2" :headers="headers" :items="items" :rows-per-page="8"
        :hide-rows-per-page="true" show-index fixed-index :alternating="true" :buttons-pagination="true"
        theme-color="#1d90ff" :table-min-height="525" :index-column-width="12" :search-field="searchField"
        :search-value="searchValue" :loading="loading" :header-class-name="'text-center'" :body-text-direction="'center'"
        :header-text-direction="'center'">
        <template #item-status="{ _id, status }">
            <div class="row">
                <p @click="approve(_id)" v-if="status == 0" class="m-0 text-warning">
                    <i class="fas fa-circle"></i>
                </p>
                <p @click="returnBook(_id)" v-if="status == 1" class="m-0 text-success"><i class="fas fa-circle"></i>
                </p>
                <p v-if="status == -1" class="m-0 text-primary"><i class="fas fa-circle"></i>
                </p>
            </div>
        </template>
        <template #item-action="{ _id }">
            <div class="row">
                <div class="btn btn-primary d-block" data-bs-toggle="modal"
                    v-bind:data-bs-target="'#borrowedbookmodal' + _id" style="width: 40px;"><i class="fas fa-info"></i>
                </div>
            </div>
        </template>
        <template #header-action>
            <div class="row">
                <div class="btn btn-primary d-block" data-bs-toggle="modal" v-bind:data-bs-target="'#modal'"
                    style="width: 40px;"><i class="fas fa-plus"></i></div>
            </div>
        </template>
        <template #empty-message>
            <span class="h5 text-primary">Không có dữ liệu</span>
        </template>
    </EasyDataTable>
    <p class="m-0 ms-4 p-0 d-inline">Chú thích:</p>
    <p class="m-0 ms-3 text-warning d-inline"><i class="fas fa-circle"></i></p>
    <p class="m-0 ms-1 d-inline">Đang chờ duyệt mượn (0)</p>
    <p class="m-0 ms-3 text-success d-inline"><i class="fas fa-circle"></i></p>
    <p class="m-0 ms-1 d-inline">Đã được duyệt mượn (1)</p>
    <p class="m-0 ms-3 text-primary d-inline"><i class="fas fa-circle"></i></p>
    <p class="m-0 ms-1 d-inline">Đã trả (-1)</p>
    <BorrowedBookDetail v-for="(item) in items" v-bind:key="item._id" :borrowedbook="item">
    </BorrowedBookDetail>
    <!-- </div> -->
</template>

<script>
import BorrowedBookService from '@/services/borrowedbook.service'
import BorrowedBookDetail from '@/components/BorrowedBookDetail.vue';

export default {
    components: {
        BorrowedBookDetail
    },
    data() {
        return {
            borrowedBooks: [],
            headers: [
                { text: "Họ và tên", value: "user.name", sortable: true },
                { text: "Email", value: "user.email", sortable: true },
                { text: "Ngày mượn", value: "borrowed_date", sortable: true },
                { text: "Trạng thái", value: "status", sortable: false, width: 50 },
                { text: "", value: "action", sortable: false, width: 17 },
            ],
            items: [],
            searchField: '',
            searchValue: '',
            loading: true,
        }
    },
    methods: {
        async retriveBorrowedBooks() {
            try {
                this.borrowedBooks = await BorrowedBookService.getAll();
                this.items = this.borrowedBooks;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async approve(id) {
            try {
                if (confirm('Xác nhận duyệt phiếu mượn!')) {
                    await BorrowedBookService.approve(id);
                    this.retriveBorrowedBooks();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async returnBook(id) {
            try {
                if (confirm('Xác nhận duyệt trả sách!')) {
                    await BorrowedBookService.return(id);
                    this.retriveBorrowedBooks();
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    mounted() {
        this.retriveBorrowedBooks();
    }
}
</script>
