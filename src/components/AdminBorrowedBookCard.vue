<template>
    <div class="card mx-auto my-3 w-75 py-3">
        <div class="row">
            <div class="col-1">
                <p class="text-center m-0">{{ index }}</p>
            </div>
            <div class="col">
                <p class="text-center m-0">{{ borrowedBook.user.name }}</p>
            </div>
            <div class="col">
                <p class="text-center m-0">{{ borrowedBook.user.email }}</p>
            </div>
            <div class="col">
                <p class="text-center m-0">{{ borrowedBook.borrowed_date }}</p>
            </div>
            <div class="col-1">
                <p @click="approve(borrowedBook._id)" v-if="borrowedBook.status == 0" class="text-center m-0 text-warning">
                    <i class="fas fa-circle"></i>
                </p>
                <p v-if="borrowedBook.status == 1" class="text-center m-0 text-success"><i class="fas fa-circle"></i></p>
                <p v-if="borrowedBook.status == -1" class="text-center m-0 text-danger"><i class="fas fa-circle"></i></p>
            </div>
            <div class="col-1 text-end pe-5">
                <a class="" data-bs-toggle="collapse" v-bind:href="'#collapse' + borrowedBook._id" role="button"
                    aria-expanded="false" v-bind:aria-controls="'collapse' + borrowedBook._id">
                    <i class="fas fa-info"></i>
                </a>
            </div>

            <div class="collapse px-3" v-bind:id="'collapse' + borrowedBook._id">
                <hr>
                <div class="row justify-content-center">
                    <div class="col-2" v-for="(book) in borrowedBook.books" v-bind:key="book._id">
                        <img v-bind:src="'/assets/uploads/' + book.imgUrl" style="height: 200px;">
                        <p class="claimedRight m-0">
                            {{ book.author.name }}
                        </p>
                        <p class="fw-bold text-danger claimedRight m-0">
                            {{ book.publisher.name }}
                        </p>
                        <p class="claimedRight m-0">
                            Số lượng: {{ book.quantity }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BorrowedBookService from '@/services/borrowedbook.service';

export default {
    props: {
        borrowedBook: { type: Object, required: true },
        index: { type: Number }
    },
    emits: ["changeStatus"],
    methods: {
        async approve(id) {
            try {
                if (confirm('Xác nhận duyệt phiếu mượn!')) {
                    await BorrowedBookService.approve(id);
                    this.$emit("changeStatus");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>