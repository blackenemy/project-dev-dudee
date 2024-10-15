<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import WashMachine from "@/components/Washing-machine.vue";
import { Machine } from "@/stores/washing";
import { data } from "autoprefixer";
const router = useRouter();
const useMachine = Machine();
const showAlert = ref(true);
const isLoading = ref(false);
//
const getdata = async () => {
  isLoading.value = true;
  const checkDataUser = localStorage.getItem("user-data");
  // console.log(checkDataUser);
  if (checkDataUser) {
    useMachine.setMachince();
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
  <!-- Alert -->
  <UserLayout v-if="isLoading != true">
    <WashMachine class="mb-4" />
  </UserLayout>
  <UserLayout v-else>
    <div
      class="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4"
    >
      <div
        v-if="showAlert"
        :class="{ 'opacity-100': showAlert, 'opacity-0': !showAlert }"
        class="alert alert-success transition-opacity duration-1000 ease-out basis-1/2"
        role="alert"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Welcome to App QuickClean!</span>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <span class="loading loading-dots loading-lg"></span>
    </div>
  </UserLayout>
</template>


