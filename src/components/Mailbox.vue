<template>
  <div class="root">
    <h1>Mailbox</h1>
    <ul>
      <li v-for="l in this.$store.getters.lettersCollection" v-bind:key="l.id">
        <input type="checkbox" :checked="l.ui.checked" @change="toggle" :data-id="l.id" /> {{ l.subject }} from <i>{{ l.from }}</i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Mailbox",
  props: {
  },
  methods: {
    toggle (e) {
      const id = +(e.currentTarget.dataset.id); // vue does not support Number(...)
      this.$store.dispatch('TOGGLE_LETTER', { id });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.root {
  text-align: left;
}
h3 {
  margin: 40px 0 0;
}
ul {
}
li {
  list-style: none;
}
a {
  color: #42b983;
}
</style>
