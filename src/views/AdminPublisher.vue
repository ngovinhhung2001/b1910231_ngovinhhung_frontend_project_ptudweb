<template>
    <!-- <div style="overflow:scroll; height: 100vh;"> -->
    <div class="container">
    </div>
    <p class="h2 text-center m-3 text-uppercase text-primary fw-bold">Quản lý Nhà xuất bản</p>
    <EasyDataTable class="customize-table" :headers="headers" :items="items" :rows-per-page="5" :hide-rows-per-page="true"
        show-index fixed-index :alternating="true" :buttons-pagination="true" theme-color="#1d90ff" :table-min-height="580"
        :index-column-width="4" :loading="loading" :header-class-name="'text-center'" :body-text-direction="'center'"
        :header-text-direction="'center'">
        <template #item-action="{ _id }">
            <div class="row">
                <div class="btn btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#modal' + _id"
                    style="width: 40px;">
                    <i class="fas fa-pen"></i>
                </div>
            </div>
            <div class="row">
                <div class="btn btn-primary mt-2" style="width: 40px;" @click="deletePublisher(_id)">
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
    <AdminPublisherForm :publisher="publisher" @submit:publisher="addPublisher" @quit:form="refreshPublisherData()">
    </AdminPublisherForm>
    <AdminPublisherForm v-for="(publisher) in publishers" v-bind:key="publisher._id" :publisher="publisher"
        @submit:publisher="updatePublisher" @quit:form="retriveData()">
    </AdminPublisherForm>
    <!-- </div> -->
</template>

<script>
import PublisherService from '@/services/publisher.service'
import AdminPublisherForm from '@/components/AdminPublisherForm.vue';

export default {
    components: {
        AdminPublisherForm,
    },
    data() {
        return {
            publishers: [],
            publisher: {
                _id: "",
                name: "",
            },
            headers: [
                { text: "Tên nhà xuất bản", value: "name", sortable: true },
                { text: "", value: "action", sortable: false, width: 5 }
            ],
            items: [],
            loading: true,
        }
    },
    methods: {
        async retriveData() {
            try {
                this.publishers = await PublisherService.getAll();
                this.items = this.publishers;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
        async addPublisher(data) {
            try {
                await PublisherService.create(data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async updatePublisher(data) {
            try {
                await PublisherService.update(data._id, data);
                this.retriveData();
            } catch (error) {
                console.log(error);
            }
        },
        async deletePublisher(id) {
            if (confirm("Bạn muốn xóa tác giả này này?")) {
                try {
                    await PublisherService.delete(id);
                    this.retriveData();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async refreshPublisherData() {
            this.publisher = {
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