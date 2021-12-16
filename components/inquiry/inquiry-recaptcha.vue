<template>
  <recaptcha @error="onError" @success="onSuccess" @expired="isExpired" />
</template>
<script>
export default {
  methods: {
      onError() {
        this.$emit('update:is-succeeded', false);
      },
      onSuccess() {
        this.$emit('update:is-succeeded', true);
      },
      isExpired() {
        this.$emit('update:is-succeeded', false);
      },
      async fetchResponse() {
        let response;
        try {
            response = await this.$recaptcha.getResponse();
        } catch (error) {
            response = '';
        }
        this.$emit('update:is-succeeded', !!response);
        return response;
      }
  }
}
</script>