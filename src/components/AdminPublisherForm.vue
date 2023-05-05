<template>
    <div class="modal fade" v-bind:id="'modal' + localPublisher._id" tabindex="-1"
        v-bind:aria-labelledby="'modal' + localPublisher._id" aria-hidden="false" data-bs-keyboard="false"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-primary" id="publisherFormModalLabel" v-if="publisher._id != ''">Chỉnh
                        sửa
                        Nhà xuất bản
                    </h1>
                    <h1 class="modal-title fs-5 text-primary" id="publisherFormModalLabel" v-if="publisher._id == ''">Thêm
                        Nhà xuất bản
                    </h1>
                    <button @click="quitForm()" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form @submit="submitPublisher">
                        <div class="form-group">
                            <label for="name"> Tên </label>
                            <Field name="name" type="text" class="form-control" v-model="localPublisher.name" />
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
        ErrorMessage
    },
    emits: ["submit:publisher", "delete:publisher", "quit:form"],
    props: {
        publisher: { type: Object, required: true },
    },
    data() {
        return {
            localPublisher: {
                _id: this.publisher._id,
                name: this.publisher.name,
            },
        }
    },
    methods: {
        submitPublisher() {
            this.$emit("submit:publisher", this.localPublisher);
            if (this.publisher._id == '') {
                this.quitForm();
            }
        },
        quitForm() {
            this.localPublisher = this.publisher;
            this.$emit("quit:form");
        }
    },

};
</script>