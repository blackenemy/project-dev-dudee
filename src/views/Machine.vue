<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import Device from "@/components/Select-device.vue";
import { Machine } from "@/stores/washing";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
//
const route = useRoute();
const router = useRouter();
//
const path_id = ref(route.params.id);
const isLoading = ref(false);

//
const getdata = async () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
};
const handle_reload = async () => {
  await getdata();
};
onMounted(async () => {
  await getdata();
  // console.log(id.value);
  const checkDataUser = localStorage.getItem("user-data");
  // console.log(checkDataUser);
  if (!checkDataUser) {
    router.push("/");
  }
});
</script>

<template>
  <UserLayout :path_id="path_id" v-if="isLoading != true">
    <Device :path_id="path_id" @submit="handle_reload" class="mb-4" />
  </UserLayout>
  <UserLayout :path_id="path_id" v-else>
    <div
      class="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4"
    ></div>
    <div class="flex items-center justify-center w-full h-screen">
      <span class="loading loading-dots loading-lg"></span>
    </div>
  </UserLayout>
</template>



<style lang="scss" scoped>
</style>