import axios from "axios";
import { db } from "@/main";

const token = localStorage.getItem("access_token");

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
  async addPost({ commit, payload }, id) {
    let videoLink;
    if (payload.video) {
      const videoShort = await id.split("https://youtu.be/")[1];
      if (videoShort) {
        videoLink = videoShort;
      } else {
        const video = id.split("=")[1];
        videoLink = video.split("&")[0];
      }

      return videoLink;
    } else {
      videoLink = "";
    }

    const info = {
      content: payload.title + " " + payload.texto,
      image: payload.image,
      video: await this.videoLink,
      status: "Público"
    };

    await axios
      .post(`${db}/posts/${id}/posts`, JSON.stringify(info), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      })
      .then(async response => {
        commit("pushPost", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPost({ commit }, id) {
    await axios
      .get(`${db}/posts/${id}`)
      .then(async response => {
        await commit("setPost", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPosts({ commit }) {
    await axios
      .get(`${db}/posts`)
      .then(async response => {
        await commit("setPosts", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
  },
  async fetchPostsPerPage({ commit }, data) {
    await axios
      .get(`${db}/pages/${data}/posts`)
      .then(async response => {
        await commit("setPostsPerPage", response.data);
      })
      .catch(e => {
        console.log({
          name: e.name,
          msg: e.message
        });
      });
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
