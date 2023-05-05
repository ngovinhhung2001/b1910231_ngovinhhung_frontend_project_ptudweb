<template>
    <div class="row justify-content-center">
        <div class="col-md-3">
            <img v-bind:src="'http://localhost:3000/api/images/' + book.image" class="img-fluid">
        </div>
        <div class="col-md-4 ">
            <div class="row">
                <div class="col">
                    <h2 class="text-uppercase text-center">{{ book.name }}</h2>
                    <table class="table">
                        <tbody>
                            <tr>
                                <th scope="row" class="col-sm-4 col-6">
                                    <p>Tác giả: </p>
                                </th>
                                <td class="h5">{{ book.author.name }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <p>Nhà xuất bản: </p>
                                </th>
                                <td class="h5">{{ book.publisher.name }}</td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    <p>Số lượng: </p>
                                </th>
                                <td class="h5">{{ book.quantity }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-center">
                        <a class="btn btn-primary text-uppercase fw-bold" @click="addBookShelf({ ...book })">Mượn</a>
                    </div>
                </div>
            </div>
            <div class="row">

            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    props: {
        book: { type: Object, required: true },
    },
    setup() {
        const store = useStore();

        const addBookShelf = async (book) => {
            store.dispatch('addBookShelf', book);
        }

        return {
            addBookShelf
        }
    }
};
</script>

