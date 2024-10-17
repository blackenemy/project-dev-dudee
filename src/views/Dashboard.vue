<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import Footer from "@/layouts/Footer.vue";
import Hero from "@/layouts/Hero.vue";
import WashMachine from "@/components/Washing-machine.vue";
import { Machine } from "@/stores/washing";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

//
const router = useRouter();
const useMachine = Machine();
//
const showAlert = ref(true);
const isLoading = ref(false);
//
const getdata = async () => {
  isLoading.value = true;
  const checkDataUser = localStorage.getItem("user-data");
  // console.log(checkDataUser);
  if (checkDataUser) {
    useMachine.setMachince();
    toast.success("Welcome to App Quick Clean!", {
      position: "top-right",
    });

    setTimeout(() => {
      isLoading.value = false;
    }, 5000);
  }
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};
onMounted(async () => {
  await getdata();

  const checkDataUser = localStorage.getItem("user-data");
  // console.log(checkDataUser);
  if (!checkDataUser) {
    router.push("/");
  }
});
</script>
<template>
  <UserLayout v-if="isLoading != true">
    <template #hero>
      <Hero />
    </template>
    <template #content>
      <WashMachine class="mb-4" />
    </template>
    <template #footer>
      <Footer />
    </template>
  </UserLayout>
  <UserLayout v-else>
    <template #content>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4"
      ></div>
      <div class="flex items-center justify-center w-full h-screen">
        <span class="loading loading-dots loading-lg"></span>
      </div>
    </template>
  </UserLayout>
</template>


