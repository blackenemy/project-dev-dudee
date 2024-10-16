<script setup>
import { ref, onMounted, computed, reactive, watch } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { Machine } from "@/stores/washing";
import axios from "axios";
//
const router = useRouter();
const route = useRoute();
const useMachine = Machine();
//
let intervalId = null;

const getDataMachine = ref([]);
const props = defineProps({
  path_id: {
    type: String,
  },
});
//

//
const getmachine = async () => {
  const DataMachine = localStorage.getItem("data-Machine");
  if (DataMachine) {
    const data = JSON.parse(DataMachine);
    getDataMachine.value = data;
    // console.log(getDataMachine.value);
  }
};

const countdown = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (getDataMachine.value.length > 0 && route.path === "/dashboard") {
    intervalId = setInterval(() => {
      let hasChanges = false;

      getDataMachine.value.forEach((machine) => {
        if (machine.status === "working" && machine.time > 0) {
          machine.time--;
          hasChanges = true;
        } else if (machine.time <= 0 && machine.status === "working") {
          machine.status = "not working";
          hasChanges = true;
        }
      });
      if (hasChanges) {
        localStorage.setItem(
          "data-Machine",
          JSON.stringify(getDataMachine.value)
        );
      }
    }, 1000);
  }
};

window.addEventListener("beforeunload", () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5173", // fallback ไปที่ localhost เมื่อไม่มี environment variable
});
const sendtoLine = async (message) => {
  const data = {
    to: "Cddd744fcce78cbd27562bb1086a15bcb",
    messages: [
      {
        type: "text",
        text: `${message}`,
      },
    ],
  };
  try {
    const response = await axios.post(`/api/line`, data);
    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
watch(
  getDataMachine,
  (Machine) => {
    if (Machine) {
      Machine.forEach((machine) => {
        if (machine.time <= 60 && machine.time > 59) {
          const message = `เครื่องซักผ้า เครื่องที่ : ${machine.id} ใกล้หมดเวลาแล้ว`;
          toast.success(message, { position: "top-right" });
          // sendtoLine(message);
        }
      });
    } else {
      console.warn("Machine is null or file_name is undefined");
    }
  },
  { deep: true }
);
const gotoMachine = (id) => {
  // console.log(id);
  // window.location.href = `/machine/${id}`;
  window.location.assign(`/machine/${id}`);
  // router.push(`/machine/${id}`);
};
onMounted(async () => {
  await getmachine();
  countdown();
});
</script>
<template>
  <div
    class="grid grid-cols-1 ml-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
  >
    <div
      v-for="item in getDataMachine"
      :key="item.id"
      class="card card-compact bg-cyan-900 w-full shadow-xl"
    >
      <figure>
        <img
          :src="item.img"
          alt="เครื่องซักผ้า"
          class="object-cover w-full h-80 md:h-72 lg:h-80"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">{{ item.name }}</h2>
        <h3>เครื่องที่ : {{ item.id }}</h3>
        <p>
          สถานะของเครื่อง :
          <span
            class="badge"
            :class="item.status === 'working' ? 'badge-success' : 'badge-error'"
            >{{ item.status }}</span
          >
        </p>
        <p>
          เวลาใช้งานที่เหลือ :
          <span v-if="item.time > 0">
            {{ Math.floor(item.time / 60) }} นาที {{ item.time % 60 }} วินาที
          </span>
          <span v-else>หมดเวลา</span>
        </p>

        <div class="card-actions justify-end">
          <button @click="gotoMachine(item.id)" class="btn btn-info">
            <span v-if="item.status === 'working'">หยอดเหรียญเพิ่ม</span>
            <span v-else>ใช้งานเครื่องซักผ้า</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>




<style lang="scss" scoped>
</style>