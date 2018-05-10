<template>
  <div class="hello">
    <Input v-model="value" placeholder="Enter something..." style="width: 300px"></Input>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        value: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
