<template>
    <img id="cover-img" src="/assets/images/cover.jpg">

    <div class="container mb-5">
        <div class="mb-3 mt-3 text-center transition">
            <h2 class="d-inline">Sách </h2>
            <h2 class="d-inline text-primary text-uppercase">Nổi Bật</h2>
        </div>
        <BookCarousel :books="favoriteBooks"> </BookCarousel>
        <div class="mb-3 mt-3 text-center transition">
            <h2 class="d-inline  text-primary text-uppercase">Tất cả </h2>
            <h2 class="d-inline">Sách</h2>
        </div>
        <div class="mx-5">
            <div class="row mx-4">
                <div class="col-md-3 col-sm-6 col-xs-12 col-6 mb-5" v-for="(book) in books" v-bind:key="book._id">
                    <BookCard :book="book"></BookCard>
                </div>
            </div>
        </div>

    </div>
    <BookShelfIcon></BookShelfIcon>
</template>

<script>
import BookService from "@/services/book.service";
import BookCarousel from "@/components/BookCarousel.vue";
import BookShelfIcon from "@/components/BookShelfIcon.vue";
import { useStore } from "vuex";
import BookCard from "@/components/BookCard.vue";

export default {
    components: {
        BookCarousel,
        BookShelfIcon,
        BookCard
    },
    data() {
        return {
            books: [],
            favoriteBooks: [],
        };
    },
    methods: {
        async retriveFavoriteBooks() {
            try {
                this.favoriteBooks = await BookService.getAllFavorite();
            } catch (error) {
                console.log(error);
            }
        },
        async retriveBooks() {
            try {
                this.books = await BookService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async getIDUser() {
            const store = useStore();
            try {
                const res = await fetch('http://localhost:3000/api/users/user', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                const user = await res.json();

                store.dispatch('setUser', user._id);
                store.dispatch('setUserInfo', user);
            } catch (error) {
                console.log(error);

                store.dispatch('setUser', null);
                store.dispatch('setUserInfo', null);
            }
        },
    },
    async created() {
        this.retriveBooks();
        this.retriveFavoriteBooks();
        this.getIDUser();
    },
};
</script>