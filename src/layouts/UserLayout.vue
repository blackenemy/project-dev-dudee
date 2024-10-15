<script setup>
import { ref, onMounted, resolveDirective } from "vue";
import { RouterLink, useRouter } from "vue-router";

const isLoggedIn = ref(false);
const searchText = ref("");
const router = useRouter();
const name = ref("");
const props = defineProps({
  data: {
    type: String,
  },
});

onMounted(() => {
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
</script>

<template>
  <div class="container mx-auto">
    <div class="navbar bg-base-100 flex justify-between">
      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost normal-case text-xl"
          >App Quick Clean</RouterLink
        >
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
            v-model="searchText"
          />
        </div>

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
    <slot></slot>

    <footer class="footer bg-neutral text-neutral-content items-center p-4">
      <aside class="grid-flow-col items-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill-rule="evenodd"
          clip-rule="evenodd"
          class="fill-current"
        >
          <path
            d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"
          ></path>
        </svg>
        <p>Framework Vue 3 | CSS Tailwind-CSS, Daisyui - Prot Potawat</p>
      </aside>
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a
          href="https://www.linkedin.com/in/prot-potawat-a63a0a2a1/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M22.23 0H1.77C.79 0 0 .77 0 1.74v20.52C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.74V1.74C24 .77 23.21 0 22.23 0zM7.12 20.44H3.56V9h3.56v11.44zm-1.78-13c-1.14 0-2.06-.93-2.06-2.07 0-1.13.92-2.06 2.06-2.06 1.14 0 2.06.93 2.06 2.06 0 1.14-.92 2.07-2.06 2.07zm15.4 13h-3.56V14.4c0-1.44-.03-3.29-2-3.29-2.02 0-2.33 1.56-2.33 3.18v6.15h-3.55V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.25 2.36 4.25 5.42v6.31z"
            ></path>
          </svg>
        </a>

        <a href="https://www.facebook.com/parot.ton.3/" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/blackenemy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path
              d="M12 .296c-6.63 0-12 5.372-12 12 0 5.303 3.438 9.8 8.205 11.387.6.111.82-.261.82-.578 0-.287-.011-1.237-.017-2.241-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.833 2.809 1.303 3.495.997.108-.775.419-1.303.763-1.603-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.469-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.459 11.459 0 013.004-.404c1.02.004 2.047.137 3.004.404 2.292-1.553 3.3-1.23 3.3-1.23.653 1.653.242 2.874.118 3.176.768.84 1.234 1.91 1.234 3.22 0 4.61-2.807 5.624-5.479 5.921.43.372.814 1.104.814 2.224 0 1.606-.014 2.898-.014 3.292 0 .32.218.694.825.576C20.565 22.092 24 17.593 24 12.296c0-6.628-5.373-12-12-12z"
            ></path>
          </svg>
        </a>
      </nav>
    </footer>
  </div>
</template>
