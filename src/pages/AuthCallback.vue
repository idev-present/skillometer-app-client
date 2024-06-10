<script setup>
import {onMounted} from "vue";
import iamService from "@/shared/services/iam.service.js";

function login() {
  iamService.sdk.signin(import.meta.env.VITE_API_URL).then((res) => {
    if (res?.access_token) {
      alert('Login success')
      if (inIframe()) {
        const message = {tag: "Casdoor", type: "SilentSignin", data: "success"};
        window.parent.postMessage(message, "*");
      }
      window.location.href = '/'
    } else {
      alert('Login failed')
      window.location.href = '/'
    }
  })
}

function inIframe() {
  try {
    return window !== window.parent;
  } catch (e) {
    return true;
  }
}

onMounted(() => {
  login()
})
</script>

<template>
  <h1>Callback</h1>
</template>

<style scoped>

</style>
