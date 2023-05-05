<template>
    <div class="card mx-auto my-3 w-75 py-3">
        <div class="row align-items-center">
            <div class="col-md-1">
                <p class="text-center m-0">{{ index }}</p>
            </div>
            <div class="col-md">
                <img class="d-block mx-auto border" v-bind:src="'/assets/uploads/' + book.imgUrl" style="height: 100px;">
            </div>
            <div class="col-md">
                <p class="text-center m-0 px-2">{{ book.name }}</p>
            </div>
            <div class="col-md">
                <p class="text-center m-0 px-2">{{ book.author.name }}</p>
            </div>
            <div class="col-md">
                <p class="text-center m-0 px-2">{{ book.publisher.name }}</p>
            </div>
            <div class="col-md-1">
                <div class="btn btn-primary" data-bs-toggle="modal" v-bind:data-bs-target="'#modal' + book._id"
                    style="width: 40px;"><i class="fas fa-pen"></i></div>
                <AdminBookForm :book="book" :publishers="publishers" :authors="authors" @submit:book="updateBook"
                    @quit:form="quitForm()">
                </AdminBookForm>
                <div class="btn btn-primary mt-2" style="width: 40px;" @click="deleteBook()"><i class="fas fa-trash"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminBookForm from '@/components/AdminBookForm.vue';
import BookService from '@/services/book.service'

export default {
    components: {
        AdminBookForm
    },
    props: {
        book: { type: Object, required: true },
        index: { type: Number },
        publishers: { type: Array, required: true },
        authors: { type: Array, required: true },
    },
    emits: ["quit:form", "delete:book", "submit:book"],
    methods: {
        async updateBook(data) {
            try {
                await BookService.update(this.book._id, data);
                this.$emit("submit:book");
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBook() {
            if (confirm("Bạn muốn xóa liên hệ này?")) {
                try {
                    await BookService.delete(this.book._id);
                    this.$emit("delete:book");
                } catch (error) {
                    console.log(error);
                }
            }
        },
        quitForm() {
            this.$emit("quit:form");
        }
    }

}
</script>