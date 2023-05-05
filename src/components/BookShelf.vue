<template>
    <div class="modal fade" id="bookShelfModal" tabindex="-1" aria-labelledby="bookShelfModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-primary text-uppercase" id="exampleModalLabel">Phiếu mượn</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container mt-3">
                        <div class="row justify-content-around">
                            <div class="col">
                                <div v-if="this.$store.state.bookshelf.length > 0">
                                    <div v-for="(book) in bookshelf" v-bind:key="book._id">
                                        <div class="row mb-4">
                                            <div class="col-4">
                                                <img class="w-50 border"
                                                    v-bind:src="'http://localhost:3000/api/images/' + book.image">
                                            </div>
                                            <div class="col mt-1">
                                                <div class="row ">
                                                    <p class="m-0 p-0">{{ book.name }}</p>
                                                </div>

                                                <div class="row">
                                                    <div class="col-8">
                                                        <div class="row">
                                                            <input type="button" class="text-center p-0" value="-"
                                                                style="width: 30px" @click="subBookShelf({ ...book })">
                                                            <input class="text-center p-0 number-input" min="1"
                                                                type="number" v-model="book.quantity"
                                                                style="width: 35px; height: 30px;"
                                                                @change="updateBookShelf({ ...book }, book.quantity)">
                                                            <input type="button" class="text-center p-0" value="+"
                                                                style="width: 30px" @click="addBookShelf({ ...book })">
                                                        </div>
                                                    </div>

                                                    <div class="col-4">
                                                        <input type="button" value="Xóa" @click="deleteBookShelf(book)"
                                                            style="height: 30">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <hr> -->
                                    </div>
                                </div>
                                <div v-else>
                                    <p class="text-center text-primary">Hiện tại phiếu mượn trống.</p>
                                    <p class="text-center text-primary">Bạn hãy chọn sách rồi quay lại nhé !
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Đóng</button>
                    <form @submit.prevent="handleSubmit">
                        <div class="row">
                            <input type="submit" class="btn btn-primary me-3 mx-auto d-block text-uppercase fw-bold"
                                value="Gửi phiếu" style="width: auto;">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BorrowedBookService from '@/services/borrowedbook.service';

export default {
    setup() {
        const store = useStore();

        const user = computed(() => store.state.user);

        const userInfo = computed(() => store.state.userInfo);

        const bookshelf = computed(() => store.state.bookshelf);

        const addBookShelf = async (book) => {
            store.dispatch('addBookShelf', book);
        }

        const subBookShelf = async (book) => {
            store.dispatch('subBookShelf', book);
        }

        const updateBookShelf = async (book, input) => {
            book.quantity = input;
            store.dispatch('updateBookShelf', book);
        }

        const deleteBookShelf = async (book) => {
            store.dispatch('deleteBookShelf', book);
        }

        const extractPayload = () => {
            const userPayload = { _id: userInfo.value._id };
            const booksPayload = [];
            const books = bookshelf.value;
            for (let i = 0; i < books.length; i++) {
                booksPayload.push({
                    _id: books[i]._id,
                    quantity: books[i].quantity
                })
            }
            var presentDate = new Date();

            var datePayload = presentDate.getDate() + '/' + (presentDate.getMonth() + 1) + '/' + presentDate.getFullYear();
            const data = {
                books: booksPayload,
                user: userPayload,
                borrowed_date: datePayload,
                status: 0
            }
            return data;
        }

        const handleSubmit = async () => {
            if (user.value) {
                if (confirm("Xác nhận nộp phiếu mượn!")) {
                    const data = extractPayload();
                    try {
                        if (data.books.length != 0) {
                            const res = await BorrowedBookService.create(data);
                            store.dispatch('deleteAllBookShelf');
                            console.log(res);
                        } else {
                            alert('Không có sách trong phiếu mượn để thực hiện thao tác')
                        }
                    } catch (error) {
                        if (error.response.status == 450) {
                            alert('Số lượng sách ở thư viện không đủ để mượn. Hãy giảm số lượng sách đăng kí mượn.');
                        } else {
                            alert('Gửi phiếu mượn lỗi');
                        }
                    }
                }
            } else {
                alert("Hãy đăng nhập để nộp phiếu mượn")
            }
        }

        return {
            user,
            userInfo,
            bookshelf,
            addBookShelf,
            subBookShelf,
            updateBookShelf,
            deleteBookShelf,
            handleSubmit
        }
    }
}
</script>