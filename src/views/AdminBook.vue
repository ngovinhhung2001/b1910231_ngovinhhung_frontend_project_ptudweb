<template>
    <!-- <div style="overflow:scroll; height: 100vh;"> -->
    <div class="container">
    </div>

    <p class="h2 text-center m-3 text-uppercase text-primary fw-bold">Quản lý Sách</p>
    <div class="d-flex justify-content-center mb-2">
        <div class="col-auto">
            <span class="fw-bold">Cột: </span>
            <select v-model="searchField" style="height: 29px">
                <option value="name">Tên sách</option>
                <option value="author.name">Tên tác giả</option>
                <option value="publisher.name">Tên nhà xuất bản</option>
            </select>
            <span class="ms-3 fw-bold">Giá trị: </span>
            <input type="text" v-model="searchValue">
        </div>
    </div>
    <EasyDataTable class="customize-table" :headers="headers" :items="items" :rows-per-page="5" :hide-rows-per-page="true"
        show-index fixed-index :alternating="true" :buttons-pagination="true" theme-color="#1d90ff" :table-min-height="585"
        :index-column-width="15" :search-field="searchField" :search-value="searchValue" :loading="loading"
        :header-class-name="'text-center'" :body-text-direction="'center'" :header-text-direction="'center'">
        <template #item-image="{ image }">
            <img :src="'http://localhost:3000/api/images/' + image" style="height: 80px;" />
        </template>
        <template #item-action="{ _id }">
            <div class="row justify-content-center">
                <div class="btn btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#modal' + _id"
                    style="width: 40px;">
                    <i class="fas fa-pen"></i>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="btn btn-primary mt-2" style="width: 40px;" @click="deleteBook(_id)">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        </template>
        <template #item-favorite="{ favorite }">
            <div class="row">
                <p v-if="favorite == true" class="m-0 text-warning">
                    <i class="fas fa-check text-success"></i>
                </p>
                <p v-else class="m-0 text-danger fw-bold">
                    <i class="fa-solid fa-x"></i>
                </p>
            </div>
        </template>
        <template #header-action="">
            <div class="row">
                <div class="btn btn-primary d-block" data-bs-toggle="modal" v-bind:data-bs-target="'#modal'"
                    style="width: 40px;"><i class="fas fa-plus"></i></div>
            </div>
        </template>
        <template #empty-message>
            <span class="h5 text-primary">Không có dữ liệu</span>
        </template>
    </EasyDataTable>
    <AdminBookForm :book="{ ...book }" :publishers="publishers" :authors="authors" :images="images" @submit:book="addBook"
        @quit:form="refreshBookData()">
    </AdminBookForm>
    <AdminBookForm v-for="(book) in books" v-bind:key="book._id" :book="book" :images="images" :publishers="publishers"
        :authors="authors" @submit:book="updateBook" @quit:form="retriveData()">
    </AdminBookForm>
    <!-- </div> -->
</template>

<script>
import BookService from '@/services/book.service'
import AuthorService from '@/services/author.service';
import PublisherService from '@/services/publisher.service';
import ImageService from '@/services/image.service'
import AdminBookForm from '@/components/AdminBookForm.vue';


export default {
    components: {
        AdminBookForm,
    },
    data() {
        return {
            images: [],
            books: [],
            authors: [],
            publishers: [],
            book: {
                _id: "",
                name: "",
                image: "",
                quantity: 0,
                publisher: {
                    _id: "",
                    name: "",
                },
                author: {
                    _id: "",
                    name: "",
                },
                favorite: false,
            },
            headers: [
                { text: "Hình ảnh", value: "image", sortable: false, width: 40 },
                { text: "Tên sách", value: "name", sortable: true },
                { text: "Tên tác giả", value: "author.name", sortable: true },
                { text: "Tên nhà xuất bản", value: "publisher.name", sortable: true },
                { text: "Số lượng", value: "quantity", sortable: false, width: 40 },
                { text: "Số lượng Đăng kí mượn", value: "temp_quantity", sortable: false, width: 48 },
                { text: "Nổi bật", value: "favorite", sortable: false, width: 30 },
                { text: "", value: "action", sortable: false, width: 20 }
            ],
            items: [],
            loading: true,
            searchField: '',
            searchValue: '',
        }
    },
    methods: {
        async retriveData() {
            try {
                this.images = await ImageService.getAll();
                this.books = await BookService.getAll();
                this.authors = await AuthorService.getAll();
                this.publishers = await PublisherService.getAll();
                this.items = this.books;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addBook(data) {
            try {
                data.temp_quantity = 0;
                data._id = "";
                await BookService.create(data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async updateBook(data) {
            try {
                await BookService.update(data._id, data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook(id) {
            if (confirm("Bạn muốn xóa quyển sách này?")) {
                try {
                    await BookService.delete(id);
                    this.retriveData();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async refreshBookData() {
            this.book = {
                _id: "",
                name: "",
                image: "",
                quantity: 0,
                publisher: {
                    _id: "",
                    name: "",
                },
                author: {
                    _id: "",
                    name: "",
                },
                favorite: false,
            }
        }
    },
    mounted() {
        this.retriveData();
    },
}
</script>