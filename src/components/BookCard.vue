<template>
    <div class="book-card card rounded-0 shadow-sm">
        <router-link :to="{ name: 'book.detail', params: { id: book._id } }">
            <a>
                <img v-bind:src="'http://localhost:3000/api/images/' + book.image" class="book-img card-img-top">
            </a>
        </router-link>

        <div class="card-body text-center">
            <span class="card-title claimedRight">
                {{ book.name }}
            </span>
            <p class="card-text claimedRight">
                {{ book.author.name }}
            </p>
            <span class="card-publisher fw-bold text-danger claimedRight">
                {{ book.publisher.name }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>

