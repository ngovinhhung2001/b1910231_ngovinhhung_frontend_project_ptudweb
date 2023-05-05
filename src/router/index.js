import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/HomePage.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/books/:id",
        name: "book.detail",
        component: () => import("@/views/BookDetail.vue"),
        props: true,
    },
    {
        path: "/signin",
        name: "signin",
        component: () => import("@/views/SignIn.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("@/views/SignUp.vue"),
    },
    {
        path: "/userborrowedbook",
        name: "userborrowedbook",
        component: () => import("@/views/UserBorrowedBook.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },
    {
        path: "/search",
        name: "search",
        component: () => import("@/views/SearchPage.vue"),
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("@/views/AdminPage.vue"),
        children: [
            {
                path: "/admin/book",
                name: "adminBook",
                component: () => import("@/views/AdminBook.vue"),
            },
            {
                path: "/admin/borrowedbook",
                name: "adminBorrowedBook",
                component: () => import("@/views/AdminBorrowedBook.vue"),
            },
            {
                path: "/admin/author",
                name: "adminAuthor",
                component: () => import("@/views/AdminAuthor.vue"),
            },
            {
                path: "/admin/publisher",
                name: "adminPublisher",
                component: () => import("@/views/AdminPublisher.vue"),
            },
            {
                path: "/admin/image",
                name: "adminImage",
                component: () => import("@/views/AdminImage.vue"),
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;