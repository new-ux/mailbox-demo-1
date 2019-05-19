<template>
  <div class="home">
    <Mailbox />
  </div>
</template>

<script>
// @ is an alias to /src
import Mailbox from "@/components/Mailbox.vue";

export default {
  name: "home",
  components: {
    Mailbox
  },
  props: {
  },
  data: () => ({
  }),
};
</script>
