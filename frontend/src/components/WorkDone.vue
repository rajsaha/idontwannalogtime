<template>
  <li v-for="item in items">
    {{ item.duration }} {{ item.description }}
  </li>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          duration: '4h 20m',
          description: 'Development work on JAAS-1468',
          logType: 'Development',
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
