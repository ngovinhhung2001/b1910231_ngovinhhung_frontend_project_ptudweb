import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state() {
        return {
            user: null,
            userInfo: null,
            bookshelf: [],
        }
    },
    mutations: {
        setUser(state, userPayload) {
            state.user = userPayload;
        },
        setUserInfo(state, userInfoPayload) {
            state.userInfo = userInfoPayload;
        },
        addBookShelf(state, book) {
            book.quantity = 1;
            var found = false;
            for (var i = 0; i < state.bookshelf.length; i++) {
                if (state.bookshelf[i]._id == book._id) {
                    found = true;
                }
            }
            if (found == false) {
                state.bookshelf.push(book);
            } else {
                for (var j = 0; j < state.bookshelf.length; j++) {
                    if (state.bookshelf[j]._id == book._id) {
                        state.bookshelf[j].quantity += book.quantity;
                    }
                }
            }
        },
        subBookShelf(state, book) {
            book.quantity = 1;
            var found = false;
            for (var i = 0; i < state.bookshelf.length; i++) {
                if (state.bookshelf[i]._id == book._id) {
                    found = true;
                }
            }
            if (found != false) {
                for (var j = 0; j < state.bookshelf.length; j++) {
                    if (state.bookshelf[j]._id == book._id) {
                        if (state.bookshelf[j].quantity > 1) {
                            state.bookshelf[j].quantity -= book.quantity;
                        }
                    }
                }
            }
        },
        updateBookShelf(state, book) {
            for (var i = 0; i < state.bookshelf.length; i++) {
                if (state.bookshelf[i]._id == book._id) {
                    state.bookshelf[i].quantity = book.quantity;
                }
            }
        },
        deleteBookShelf(state, book) {
            for (var i = 0; i < state.bookshelf.length; i++) {
                if (state.bookshelf[i]._id == book._id) {
                    if (confirm("Bạn có chắc sẽ xóa không?")) {
                        state.bookshelf = state.bookshelf.splice(i + 1);
                    }
                }
            }
        },
        deleteAllBookShelf(state) {
            state.bookshelf = [];
        }
    },
    actions: {
        setUser({ commit }, id) {
            commit("setUser", id);
        },
        setUserInfo({ commit }, userInfo) {
            commit("setUserInfo", userInfo);
        },
        addBookShelf({ commit }, book) {
            commit("addBookShelf", book);
        },
        subBookShelf({ commit }, book) {
            commit("subBookShelf", book);
        },
        updateBookShelf({ commit }, book) {
            commit("updateBookShelf", book);
        },
        deleteBookShelf({ commit }, book) {
            commit("deleteBookShelf", book);
        },
        deleteAllBookShelf({ commit }) {
            commit("deleteAllBookShelf");
        },

    }
})
export default store;