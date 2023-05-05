<script>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
    components: {
        AppHeader,
        AppFooter,
    }
};
</script>

<template>
    <div id="app">
        <AppHeader
            v-if="this.$route.name != 'admin' && this.$route.name != 'adminBook' && this.$route.name != 'adminBorrowedBook' && this.$route.name != 'adminAuthor' && this.$route.name != 'adminPublisher' && this.$route.name != 'adminImage'" />
        <div class="container-fluid" style="padding: 0px">
            <router-view> </router-view>
        </div>
        <AppFooter
            v-if="this.$route.name != 'admin' && this.$route.name != 'adminBook' && this.$route.name != 'adminBorrowedBook' && this.$route.name != 'adminAuthor' && this.$route.name != 'adminPublisher' && this.$route.name != 'adminImage' && this.$route.name != 'signin' && this.$route.name != 'signup'" />
    </div>
</template>

<style>
.page {
    max-width: 400px;
    margin: auto;
}
</style>
