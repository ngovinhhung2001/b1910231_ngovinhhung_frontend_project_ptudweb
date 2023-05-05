<template>
    <!-- <img id="cover-img" src="/assets/images/cover.jpg"> -->
    <p class="h2 text-uppercase text-primary text-center mt-2">Tìm kiếm</p>

    <div class="d-flex justify-content-center">
        <div class="col-auto px-5 pb-3">
            <form class="border border-primary">
                <input v-model="searchText" placeholder="Search..." aria-label="Search through site content">
                <button>
                    <svg class="text-primary" viewBox="0 0 1024 1024">
                        <path class="path1"
                            d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z">
                        </path>
                    </svg>
                </button>
            </form>
        </div>
    </div>
    <div style="overflow: scroll; height: 69vh; overflow-x: hidden;">
        <div class="container pt-5">
            <div class="mx-5">
                <div class="row mx-4">
                    <div class="col-3 mb-5" v-for="(book) in filteredBooks" v-bind:key="book._id">
                        <BookCard :book="book"></BookCard>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/book.service';
import BookCard from '@/components/BookCard.vue';

export default {
    components: {
        BookCard
    },
    data() {
        return {
            books: [],
            searchText: '',
        }
    },
    methods: {
        async retriveBook() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.retriveBook();
    },
    computed: {
        filteredBooks: function () {
            return this.books.filter((book) => {
                return book.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/đ/g, 'd').replace(/Đ/g, 'D').match(this.searchText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                        .replace(/đ/g, 'd').replace(/Đ/g, 'D'));
            })
        }
    }
}
</script>

<style scoped>
button {
    all: unset;
    cursor: pointer;
    width: 44px;
    height: 44px;
}

svg {
    fill: currentColor;
    width: 24px;
    height: 24px;
}

::placeholder {
    color: #001aff;
    opacity: 0.7;
}

input {
    all: unset;
    font: 16px system-ui;
    color: #000000;
    height: 100%;
    width: 100%;
    padding: 6px 10px;
}

form {
    padding-left: 10px;
    background-color: white;
    width: 300px;
    height: 44px;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>