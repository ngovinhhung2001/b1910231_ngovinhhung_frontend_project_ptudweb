<template>
    <div class="modal fade" v-bind:id="'modal' + localBook._id" tabindex="-1"
        v-bind:aria-labelledby="'modal' + localBook._id" aria-hidden="false" data-bs-keyboard="false"
        data-bs-backdrop="static">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-primary" id="bookFormModalLabel" v-if="book._id != ''">Chỉnh sửa Sách
                    </h1>
                    <h1 class="modal-title fs-5 text-primary" id="bookFormModalLabel" v-if="book._id == ''">Thêm Sách
                    </h1>
                    <button @click="quitForm()" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <Form @submit="submitBook" action="http://localhost:3000/book" enctype="multipart/form-data"
                        method="POST">
                        <div class="form-group">
                            <label for="name"> Tên </label>
                            <Field name="name" type="text" class="form-control" v-model="localBook.name" />
                            <ErrorMessage name="name" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="imgage"> Hình ảnh </label>
                            <Field name="image" as="select" class="form-control" v-model="localBook.image">
                                <option v-for="(image, index) in images" v-bind:key="image._id" v-bind:value="image.name">
                                    <!-- <img v-bind:src="'http://localhost:3000/api/images/' + image.name" alt=""> -->{{
                                        index + 1 }}
                                </option>
                            </Field>
                            <ErrorMessage name="author" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="author"> Tác giả </label>
                            <Field name="author" as="select" class="form-control" v-model="localBook.author.name">
                                <option v-for="(author) in authors" v-bind:key="author._id" v-bind:value="author.name">
                                    {{ author.name }}</option>
                            </Field>
                            <ErrorMessage name="author" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="publisher"> Nhà xuất bản </label>
                            <Field name="publisher" as="select" class="form-control" v-model="localBook.publisher.name">
                                <option v-for="(publisher) in publishers" v-bind:key="publisher._id"
                                    v-bind:value="publisher.name"
                                    v-bind:selected="publisher._id == localBook.publisher._id">
                                    {{ publisher.name }} </option>
                            </Field>
                            <ErrorMessage name="publisher" class="error-feedback" />
                        </div>
                        <div class="form-group">
                            <label for="quantity"> Số lượng </label>
                            <Field name="quantity" type="number" class="form-control" v-model="localBook.quantity" />
                            <ErrorMessage name="quantity" class="error-feedback" />
                        </div>
                        <div class="form-group d-none">
                            <label for="temp_quantity"> Số lượng </label>
                            <Field name="temp_quantity" type="number" class="form-control"
                                v-model="localBook.temp_quantity" />
                            <ErrorMessage name="temp_quantity" class="error-feedback" />
                        </div>
                        <div class="form-group form-check ms-4">
                            <input name="favorite" type="checkbox" class="form-check-input" v-model="localBook.favorite" />
                            <label for="favorite" class="form-check-label p-0">
                                <strong>Sách nổi bật</strong>
                            </label>
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
    emits: ["submit:book", "delete:book", "quit:form"],
    props: {
        book: { type: Object, required: true },
        publishers: { type: Array, required: true },
        authors: { type: Array, required: true },
        images: { type: Array, required: true },
    },
    data() {
        return {
            localBook: {
                _id: this.book._id,
                name: this.book.name,
                quantity: this.book.quantity,
                image: this.book.image,
                temp_quantity: this.book.temp_quantity,
                publisher: {
                    _id: this.book.publisher._id,
                    name: this.book.publisher.name,
                },
                author: {
                    _id: this.book.author._id,
                    name: this.book.author.name,
                },
                favorite: this.book.favorite,
            },
        }
    },
    methods: {
        submitBook() {
            this.$emit("submit:book", this.localBook);
            if (this.localBook._id == '') {
                this.quitForm();
            }
        },
        quitForm() {
            this.localBook = this.book;
            this.$emit("quit:form");
        }
    },

};
</script>