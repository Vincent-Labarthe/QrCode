<template>
  <div class="qrCodes">
    <div v-if="User">
      <p>Hi {{User}}</p>
    </div>
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="title">Title:</label>
          <input type="text" name="title" v-model="form.title">
        </div>
        <div>
          <textarea name="write_up" v-model="form.write_up" placeholder="Write up..."></textarea>
        </div>
        <button type="submit"> Submit</button>
      </form>
    </div>
    <div class="qrCodes" v-if="QrCodes">
      <ul>
        <li v-for="qrCode in QrCodes" :key="qrCode.id">
          <div id="qrCode-div">

          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      Oh no!!! We have no qrCode
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'QrCodes',
  components: {

  },
  data() {
    return {
      form: {
        title: '',
        write_up: '',
      }
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetQrCodes()
  },
  computed: {
    ...mapGetters({QrCodes: "StateQrCodes", User: "StateUser"}),
  },
  methods: {
    ...mapActions(["CreateQrCode", "GetQrCodes"]),
    async submit() {
      try {
        await this.CreateQrCode(this.form);
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
    },
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  width:60%;
  margin: 15px;
  border: 0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
textarea {
  width:75%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  height:150px;
  margin: 15px;
}
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;;
}
</style>
