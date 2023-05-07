<template>
    <div class="text-right" style="position: fixed; right: 7%; bottom: 10%;">
        <div class="d-flex mb-2">
            <a class="btn btn-primary fw-bold" data-bs-toggle="modal" data-bs-target="#bookShelfModal"
                style="width: 40px; align-self: center;">
                <i class="fas fa-book"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                    v-if="this.$store.state.bookshelf.length > 0">
                    {{ this.$store.state.bookshelf.length }}
                </span>
            </a>
        </div>
        <div class="d-flex">
            <router-link :to="{ name: 'search' }">
                <a class="btn btn-primary fw-bold" style="width: 40px; align-self: center;">
                    <i class="fas fa-search"></i>
                </a>
            </router-link>
        </div>
    </div>

    <!-- Modal -->
    <BookShelf></BookShelf>
</template>
<script>
import BookShelf from '@/components/BookShelf.vue';

export default {
    components: { BookShelf }
}
</script>