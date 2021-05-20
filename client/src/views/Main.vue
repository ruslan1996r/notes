<template>
  <div>
    <Navbar />
    <div style="height: 65px"></div>
    <v-progress-linear
      indeterminate
      color="primary"
      v-if="noteLoading"
    ></v-progress-linear>
    <v-row class="justify-end ma-1">
      <v-btn @click="addNote" color="green" class="mt-5 mr-5" small fab
        ><v-icon large>mdi-plus</v-icon></v-btn
      >
    </v-row>
    <h2 class="text-center mt-5" v-if="notes && !notes.length">
      List is empty
    </h2>
    <div v-else class="text-right d-flex flex-wrap justify-center">
      <v-card
        v-for="note in updatedNotes"
        :key="note._id"
        outlined
        class="ma-6 pa-6 d-flex flex-column align-center"
        width="400px"
      >
        <v-card-title>{{ note.text }}</v-card-title>
        <v-img max-height="300" :src="note.image" width="300"></v-img>
        <v-card-subtitle>{{ date(note.createdAt) }}</v-card-subtitle>
        <v-card-actions>
          <v-btn color="red" outlined @click="deleteNote(note._id)"
            ><v-icon>mdi-delete</v-icon></v-btn
          >
          <v-btn
            color="blue"
            outlined
            @click="$router.push(`/editor/${note._id}`)"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import { Api } from "../api/index";
import Navbar from "../components/Navbar.vue";
export default {
  name: "Main",
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(["notes", "noteLoading", "userName"]),
    updatedNotes() {
      return this.notes.map((el) => {
        return {
          ...el,
          image: Api.domainUrl() + el.image,
        };
      });
    },
  },
  methods: {
    ...mapActions(["ACTION_logout", "ACTION_set_notes", "ACTION_delete_note"]),
    date(date) {
      return moment(date).format("lll");
    },
    deleteNote(id) {
      this.ACTION_delete_note(id);
    },
    addNote() {
      this.$router.push("/editor/add");
    },
  },
  mounted() {
    this.ACTION_set_notes();
  },
};
</script>