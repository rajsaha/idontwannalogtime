<template>
  <h1 id="selected-or-current-date" class="font-bold mb-4 text-3xl">{{ date }}</h1>
  <FormKit
    type="form"
    id="log-time-form"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Log"
    @submit="submitHandler"
    :actions="false"
    #default="{ value }"
    incomplete-message="Please fill out all fields"
  >
    <FormKit
      type="text"
      label="What did you work on?"
      help="Worked on POST API"
      v-model="workedOn"
      validation="required"
      :validation-messages="{ required: 'Required' }"
    />
    <FormKit
      type="text"
      label="How much time did you spend on it?"
      help="2h 20m"
      v-model="timeSpent"
      :validation="[['required'], ['matches', /^\d{1,2}\s?(h|hr|hour[s]?|m|min|minute[s]?)\b\s?(\d{1,2}\s?(m|min|minute[s]?)\b)?$/]]"
      :validation-messages="{ required: 'Required', matches: 'Format incorrect' }"
    />
    <FormKit
      type="select"
      label="What kind of work did you do?"
      placeholder="Development"
      v-model="logType"
      :options="logTypes"
      validation="required"
      :validation-messages="{ required: 'Required' }"
    />
    <FormKit type="submit" label="Log" />
  </FormKit>
</template>

<script>
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

export default {
  data() {
    return {
      date: dayjs().format("Do MMMM, YYYY"),
      workedOn: "",
      timeSpent: "",
      logType: "",
      logTypes: [
        {
          value: 1,
          label: "Development",
        },
        {
          value: 2,
          label: "Meeting",
        },
      ],
      submitted: false,
    };
  },
  methods: {
    async submitHandler() {
      await new Promise((r) => setTimeout(r, 1000));
      this.submitted = true;
    },
  },
};
</script>

<style scoped>
#selected-or-current-date {
  color: #6BCB77;
}
</style>
