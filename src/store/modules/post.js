import axios from "axios";
import { db } from "@/main";

const state = {
  post: "",
  posts: [],
  postsPerPage: []
};

const getters = {
  getPost: state => state.post,
  getPosts: state => state.posts,
  getPostsPerPage: state => state.postsPerPage
};

const actions = {
  async fetchPost({ commit }, id) {
    const response = await axios.get(`${db}/posts/${id}`);

    commit("setPost", response.data);
  },
  async fetchPosts({ commit }) {
    const response = await axios.get(`${db}/posts`);

    commit("setPosts", response.data);
  },
  async fetchPostsPerPage({ commit }, data) {
    const response = await axios.get(`${db}/pages/${data}/posts`);
    console.log(response.data);
    commit("setPostsPerPage", response.data);
  }
};

const mutations = {
  setPost: (state, post) => (state.post = post),
  setPosts: (state, posts) => (state.posts = posts),
  setPostsPerPage: (state, posts) => (state.postsPerPage = posts)
};

export default {
  state,
  getters,
  actions,
  mutations
};
