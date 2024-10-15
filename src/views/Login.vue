<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
const username = ref("");
const password = ref("");
const showPassword = ref(false);
const router = useRouter();
const route = useRoute();
const Login = () => {
  console.log("Username:", username.value);
  console.log("Password:", password.value);
  if (username.value === "user" && password.value === "password") {
    const data = {
      username: username.value,
      password: password.value,
      name: "Prot Potawat",
      money: "1000",
    };
    localStorage.setItem("user-data", JSON.stringify(data));
    localStorage.setItem("isLoggedIn", true);
    router.push("/dashboard");
  } else {
    console.log("Invalid credentials");
  }
};
onMounted(() => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("user-data");
});
</script>

<template>
  <div class="flex justify-center place-content-center">
    <div class="artboard phone-1">
      <div class="justify-items-center">
        <div class="mt-24 text-center">App Quick Clean</div>
      </div>

      <!-- Username -->
      <div class="form-control">
        <label class="label">Username</label>
        <input
          v-model="username"
          type="text"
          class="input input-bordered"
          placeholder="Username"
          @keyup.enter="Login"
        />
      </div>

      <!-- Password -->
      <div class="form-control relative">
        <label class="label">Password</label>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="input input-bordered"
          placeholder="Password"
          @keyup.enter="Login"
        />
        <div
          class="absolute inset-y-0 right-0 py-3 mt-10 mr-4 flex items-center text-sm leading-5"
        >
          <svg
            class="h-4 text-gray-700 cursor-pointer"
            fill="none"
            @click="showPassword = !showPassword"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
            ></path>
          </svg>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="form-control mt-4">
        <button @click="Login" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</template>
