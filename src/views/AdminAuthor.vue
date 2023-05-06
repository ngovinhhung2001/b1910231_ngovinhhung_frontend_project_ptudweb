<template>
    <!-- <div style="overflow:scroll; height: 100vh;"> -->
    <div class="container">
    </div>
    <p class="h2 text-center m-3 text-uppercase text-primary fw-bold">Quản lý Tác Giả</p>
    <EasyDataTable class="customize-table" :headers="headers" :items="items" :rows-per-page="5" :hide-rows-per-page="true"
        show-index fixed-index :alternating="true" :buttons-pagination="true" theme-color="#1d90ff" :table-min-height="580"
        :index-column-width="4" :loading="loading" :header-class-name="'text-center'" :body-text-direction="'center'"
        :header-text-direction="'center'">
        <template #item-action="{ _id }">
            <div class="row justify-content-center">
                <div class="btn btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#modal' + _id"
                    style="width: 40px;">
                    <i class="fas fa-pen"></i>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="btn btn-primary mt-2" style="width: 40px;" @click="deleteAuthor(_id)">
                    <i class="fas fa-trash"></i>
                </div>
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
    <AdminAuthorForm :author="{ ...author }" @submit:author="addAuthor" @quit:form="refreshAuthorData()">
    </AdminAuthorForm>
    <AdminAuthorForm v-for="(author) in authors" v-bind:key="author._id" :author="author" @submit:author="updateAuthor"
        @quit:form="retriveData()">
    </AdminAuthorForm>
    <!-- </div> -->
</template>

<script>
import AuthorService from '@/services/author.service'
import AdminAuthorForm from '@/components/AdminAuthorForm.vue';

export default {
    components: {
        AdminAuthorForm,
    },
    data() {
        return {
            authors: [],
            author: {
                _id: "",
                name: "",
            },
            headers: [
                { text: "Tên tác giả", value: "name", sortable: true },
                { text: "", value: "action", sortable: false, width: 5 }
            ],
            items: [],
            loading: true,
        }
    },
    methods: {
        async retriveData() {
            try {
                this.authors = await AuthorService.getAll();
                this.items = this.authors;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addAuthor(data) {
            try {
                await AuthorService.create(data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async updateAuthor(data) {
            try {
                await AuthorService.update(data._id, data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async deleteAuthor(id) {
            if (confirm("Bạn muốn xóa tác giả này này?")) {
                try {
                    await AuthorService.delete(id);
                    this.retriveData();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async refreshAuthorData() {
            this.author = {
                _id: "",
                name: "",
            }
        }
    },
    mounted() {
        this.retriveData();
    },
}
</script>