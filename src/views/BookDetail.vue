<template>
    <img id="cover-img" src="/assets/images/cover.jpg">

    <div class="container mb-5">
        <div class="mb-3 mt-3 text-center transition">
            <h2 class="d-inline">Chi Tiết </h2>
            <h2 class="d-inline text-primary text-uppercase">Sách</h2>
        </div>
        <div v-for="(book) in books" v-bind:key="book._id">
            <BookDetailCard :book="book"></BookDetailCard>
        </div>
    </div>
    <BookShelfIcon></BookShelfIcon>
</template>

<script>
import BookService from "@/services/book.service";
import BookDetailCard from "@/components/BookDetailCard.vue";
import BookShelfIcon from "@/components/BookShelfIcon.vue";

export default {
    components: {
        BookDetailCard,
        BookShelfIcon,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            books: [],
        };
    },
    methods: {
        async retriveBook(id) {
            try {
                this.books[0] = await BookService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        }
    },
    async created() {
        this.retriveBook(this.id);
    }
};
</script>