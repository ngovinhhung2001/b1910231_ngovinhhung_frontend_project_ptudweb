<template>
    <Splide :options="options">
        <SplideSlide v-for="(book) in books" v-bind:key="book._id">
            <BookCard :book="book"> </BookCard>
        </SplideSlide>
    </Splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import BookCard from './BookCard.vue';

export default {
    components: {
        Splide,
        SplideSlide,
        BookCard
    },
    data() {
        return {
            options: {
                rewind: true,
                gap: '1rem',
                perPage: 4,
                perMove: 1,
                autoplay: true,
                interval: 1750,
                breakpoints: {
                    1024: {
                        perPage: 4,
                    },
                    426: {
                        perPage: 2,
                    },
                    376: {
                        perPage: 1
                    }
                }
            },
        };
    },
    props: {
        books: { type: Array, required: true },
    }
};
</script>