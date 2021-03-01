<template>
  <div class="home">
    <p>Generate our own QrCode</p>
    <div v-if="User">
      <p>Hi {{User}}</p>
    </div>
  </div>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  name: 'Home',
  components: {
  },
  computed: {
    ...mapGetters({QrCodes: "StateQrCodes", User: "StateUser"}),
  },
}
</script>
