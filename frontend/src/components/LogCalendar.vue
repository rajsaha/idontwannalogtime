<template>
  <DatePicker v-model="date" />
</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
export default {
  components: {
    Calendar,
    DatePicker
  },
  data() {
    return {
      date: new Date(),
    };
  },
};
</script>

<style scoped>

</style>
