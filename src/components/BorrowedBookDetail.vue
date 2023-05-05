<template>
    <div class="modal fade" v-bind:id="'borrowedbookmodal' + borrowedbook._id" tabindex="-1"
        v-bind:aria-labelledby="'borrowedbookmodal' + borrowedbook._id" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header ">
                    <h1 class="modal-title fs-5 text-primary text-uppercase" id="exampleModalLabel">Chi
                        tiết
                        Phiếu mượn</h1>
                    <button type="button" class="btn-close m-0 align-self-end" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container mt-3">
                        <div class="row justify-content-around">
                            <div class="col">
                                <div v-for="(book) in borrowedbook.books" v-bind:key="book._id">
                                    <div class="row mb-4 text-start">
                                        <div class="col-4">
                                            <img class="w-50 border"
                                                v-bind:src="'http://localhost:3000/api/images/' + book.image">
                                        </div>
                                        <div class="col mt-1">
                                            <div class="row">
                                                <p class="m-0 p-0">{{ book.name }}</p>
                                            </div>
                                            <div class="row">
                                                <p class="m-0 p-0"><strong>Số lượng:</strong> {{ book.quantity }}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <hr> -->
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: {
        borrowedbook: { type: Object, required: true }
    }
}
</script>