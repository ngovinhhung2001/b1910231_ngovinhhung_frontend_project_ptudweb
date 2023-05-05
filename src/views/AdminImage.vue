<template>
    <p class="h2 text-center m-3 text-uppercase text-primary fw-bold">Quản lý Hình Ảnh</p>

    <form action="http://localhost:3000/api/images" target="_blank" enctype="multipart/form-data" method="POST">
        <div class="form-control" style="border: none; background-color: rgba(255, 0, 0, 0) ;">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <input type="file" name="image" multiple accept="image/*" class="form-control" />
                </div>
                <div class="col-auto">
                    <input class="btn btn-primary" type="submit" value="Tải lên" />
                </div>
            </div>
        </div>
    </form>

    <EasyDataTable class="customize-table" :headers="headers" :items="items" :rows-per-page="5" :hide-rows-per-page="true"
        show-index fixed-index :alternating="true" :buttons-pagination="true" theme-color="#1d90ff" :table-min-height="555"
        :index-column-width="5" :loading="loading" :header-class-name="'text-center'" :body-text-direction="'center'"
        :header-text-direction="'center'">
        <template #item-image="{ name }">
            <img :src="'http://localhost:3000/api/images/' + name" style="height: 80px;" />
        </template>
        <template #empty-message>
            <span class="h5 text-primary">Không có dữ liệu</span>
        </template>
    </EasyDataTable>
</template>
  
<script>
import ImageService from '@/services/image.service'

export default {
    data() {
        return {
            images: [],
            headers: [
                { text: "Hình ảnh", value: "image", sortable: false, width: 40 },
                { text: "Tên hình ảnh", value: "name", sortable: true },
            ],
            items: [],
            loading: true,
        }
    },
    methods: {
        async retriveData() {
            try {
                this.images = await ImageService.getAll();
                this.items = this.images;
                this.loading = false;
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        this.retriveData();
    },
}
</script>