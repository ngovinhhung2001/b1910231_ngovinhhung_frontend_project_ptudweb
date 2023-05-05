<template>
    <div class="modal fade" v-bind:id="'modal' + localAuthor._id" tabindex="-1"
        v-bind:aria-labelledby="'modal' + localAuthor._id" aria-hidden="false" data-bs-keyboard="false"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-primary" id="authorFormModalLabel" v-if="author._id != ''">Chỉnh sửa
                        Tác giả
                    </h1>
                    <h1 class="modal-title fs-5 text-primary" id="authorFormModalLabel" v-if="author._id == ''">Thêm Tác giả
                    </h1>
                    <button @click="quitForm()" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form @submit="submitAuthor">
                        <div class="form-group">
                            <label for="name"> Tên </label>
                            <Field name="name" type="text" class="form-control" v-model="localAuthor.name" />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" type="submit" data-bs-dismiss="modal"
                                aria-label="Close">Lưu</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:author", "delete:author", "quit:form"],
    props: {
        author: { type: Object, required: true },
    },
    data() {
        return {
            localAuthor: {
                _id: this.author._id,
                name: this.author.name,
            },
        }
    },
    methods: {
        submitAuthor() {
            this.$emit("submit:author", this.localAuthor);
            if (this.author._id == '') {
                this.quitForm();
            }
        },
        quitForm() {
            this.localAuthor = this.author;
            this.$emit("quit:form");
        }
    },

};
</script>