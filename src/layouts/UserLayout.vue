<script setup>
import { ref, onMounted, resolveDirective } from "vue";
import { RouterLink, useRouter, useRoute } from "vue-router";

const isLoggedIn = ref(false);
const showModal = ref(false);
const searchText = ref("");
const router = useRouter();
const route = useRoute();
const name = ref("");
const props = defineProps({
  path_id: {
    type: String,
  },
});
const path = ref(route.path);
onMounted(() => {
  // console.log(route.path, props.path_id);
  const checkDataUser = localStorage.getItem("user-data");
  if (checkDataUser) {
    const data = JSON.parse(checkDataUser);
    name.value = data.name;
  }
  if (localStorage.getItem("isLoggedIn")) {
    isLoggedIn.value = true;
  }
});

const login = () => {
  isLoggedIn.value = true;
  localStorage.setItem("isLoggedIn", true);
};

const logout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem("isLoggedIn");
  // localStorage.removeItem("data-Machince");
  router.push("/");
};
const closeModal = () => {
  showModal.value = false;
};
const addline = () => {
  const lineLink = "https://lin.ee/52xXubq";
  window.open(lineLink, "_blank");
};
</script>

<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100 flex justify-between">
      <div class="flex-1">
        <RouterLink to="/dashboard" class="btn btn-ghost normal-case text-xl"
          >App Quick Clean</RouterLink
        >
      </div>
      <div class="flex-1">
        <button
          @click="showModal = true"
          class="btn btn-ghost normal-case text-xl"
        >
          Add / Line Notify
        </button>
      </div>
      <div class="flex-none gap-2">
        <button @click="login" v-if="!isLoggedIn" class="btn btn-ghost">
          Login
        </button>
        <div v-else class="dropdown dropdown-end">
          <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle avatar"
          >
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="//upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              />
            </div>
          </div>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li><a @click="logout">Logout</a></li>
          </ul>
        </div>
        <span class="hidden md:inline">{{ name }}</span>
      </div>
    </div>
    <slot name="hero"></slot>
    <slot name="content"></slot>
    <slot name="footer"></slot>
  </div>
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    ref="myModal"
    v-if="showModal"
  >
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      aria-hidden="true"
    ></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  App Quick Clean
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    คุณสามารถเข้ากลุ่มเพื่อรับการแจ้งเตือน
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="addline"
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              คลิกเข้าร่วมกลุ่ม
            </button>
            <button
              @click="closeModal"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
