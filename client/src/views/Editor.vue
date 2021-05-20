<template>
  <div style="padding: 50px">
    <Navbar />
    <div style="height: 65px"></div>
    <v-form ref="form" class="d-flex flex-column align-center" width="300px">
      <v-text-field
        v-model="text"
        :rules="rules"
        label="Text"
        style="width: 300px"
      ></v-text-field>
      <v-file-input
        v-model="file"
        label="File input"
        style="width: 300px"
        @change="onFileChange"
      ></v-file-input>
      <canvas
        @mouseup="isPressed = false"
        @mousedown="isPressed = true"
        @mousemove="resize"
        style="border: 1px solid white"
        ref="canvas"
        width="300"
        height="300"
      ></canvas>
      <v-row class="my-6">
        <v-btn
          color="orange"
          class="mr-1"
          outlined
          width="150"
          @click="rotate('left')"
          >Rotate left</v-btn
        >
        <v-btn
          color="orange"
          class="ml-1"
          outlined
          width="150"
          @click="rotate('right')"
          >Rotate right</v-btn
        >
      </v-row>
      <v-btn color="successDarken" @click="submit" width="150"
        >Save changes</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import { Api } from "../api/index";
import Navbar from "../components/Navbar.vue";
import NoteApi from "../api/note";
import { Validations } from "../utils/validations";
export default {
  data: () => ({
    note: {},
    text: "",
    file: null,
    fileForCanvas: null,
    ctx: null,
    isPressed: false,
    _width: 300,
    _height: 300,
    rules: [Validations.nonEmpty],
  }),
  components: {
    Navbar,
  },
  computed: {
    isAdd() {
      return this.$route.params.id === "add";
    },
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        const res = await fetch(this.fileForCanvas);
        const blob = await res.blob();
        const formData = new FormData();
        formData.append("text", this.text);
        formData.append("date", this.note.date);
        formData.append("file", blob, "filename");

        let result = { data: {} };
        if (this.isAdd) {
          result = await NoteApi.create(formData);
        } else {
          result = await NoteApi.update(this.$route.params.id, formData);
        }
        if (result.status === 200) {
          this.$store.commit("SET_SNACKBAR", {
            text: "Success",
            color: "successDarken",
          });
          this.$router.push("/main");
        } else {
          this.$store.commit("SET_SNACKBAR", {
            text: result.data,
            color: "error",
          });
        }
      }
    },
    onFileChange(e) {
      if (e) {
        this.fileForCanvas = window.URL.createObjectURL(e);
        this.transform(
          this._width || 300,
          this._height || 300,
          this.fileForCanvas
        );
      }
    },
    transform(h, w, src = "") {
      const img = new Image();

      img.src = src;
      img.onload = () => {
        this.ctx.clearRect(
          0,
          0,
          this.$refs.canvas.height,
          this.$refs.canvas.width
        );
        this.ctx.drawImage(img, 0, 0, h, w);
        this.ctx.stroke();
      };
    },
    resize(e) {
      if (this.isPressed) {
        this._width = e.pageX - e.target.offsetLeft;
        this._height = e.pageY - e.target.offsetTop;

        this.transform(this._width, this._height, this.fileForCanvas);
      }
    },
    rotate(side) {
      let h = this.$refs.canvas.height;
      let w = this.$refs.canvas.width;
      let pi = side === "right" ? Math.PI / 2 : -(Math.PI / 2);

      const img = new Image();
      img.src = this.fileForCanvas;
      img.onload = () => {
        this.ctx.clearRect(0, 0, h, w);
        this.ctx.translate(h / 2, w / 2);
        this.ctx.rotate(pi);
        this.ctx.translate(-(h / 2), -(w / 2));
        this.ctx.drawImage(img, 0, 0, this._height || 300, this._width || 300);
        this.ctx.stroke();
      };
    },
  },
  async mounted() {
    if (!this.isAdd) {
      this.note = await NoteApi.getNote(this.$route.params.id);
      this.text = this.note.text;
      this.transform(300, 300, Api.domainUrl() + this.note.image);
      this.fileForCanvas = Api.domainUrl() + this.note.image;
    }
    this.ctx = this.$refs.canvas.getContext("2d");
  },
};
</script>