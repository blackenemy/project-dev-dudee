<script setup>
import { ref, onMounted, reactive, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Machine } from "@/stores/washing";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
//
const useMachine = Machine();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
//
const props = defineProps({
  path_id: {
    type: String,
  },
});
//
const machineDetails = ref(null);
//
const getdata = async () => {
  isLoading.value = true;
  console.log(isLoading.value);
  if ((isLoading.value = true)) {
    machineDetails.value = useMachine.getMachineById(props.path_id);
    isLoading.value = false;
  }

  console.log(machineDetails.value);
};
const addCoin = async () => {
  if (machineDetails.value.status === "working") {
    const newTime = machineDetails.value.time + 600;
    const res = await useMachine.updateMachine(
      `${props.path_id}`,
      machineDetails.value.status,
      newTime
    );
    if (res === true) {
      toast.success("คุณได้หยอดเหรียญเพิ่ม", {
        position: "top-right",
        onClose: () => {
          getdata();
        },
      });
    }
  } else {
    const res = await useMachine.updateMachine(
      `${props.path_id}`,
      "working",
      600
    );
    if (res === true) {
      toast.success("คุณได้หยอดเหรียญเพิ่ม", {
        position: "top-right",
        onClose: () => {
          getdata();
        },
      });
    }
  }
  console.log(machineDetails.value);
};
const goBack = () => {
  router.push(`/dashboard`);
};

console.log(isLoading.value);
onMounted(async () => {
  await getdata();

  const checkDataUser = localStorage.getItem("user-data");
  if (!checkDataUser) {
    router.push("/");
  }
});
</script>
<template>
  <div
    class="max-w-4xl mx-auto p-4 sm:p-6 shadow-xl rounded-lg bg-gray-600 border border-gray-300 main-content"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 md:mb-8 items-start">
      <div class="col-span-1">
        <h2
          class="font-bold text-xl sm:text-2xl md:text-3xl text-center md:text-left"
        >
          รายละเอียดเครื่องซักผ้า
        </h2>
      </div>
      <div class="col-span-1 flex justify-center md:justify-end mt-4 md:mt-0">
        <button
          @click="addCoin"
          class="btn btn-outline btn-secondary w-full md:w-auto"
        >
          หยอดเหรียญ
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
      <!-- รูปภาพของเครื่องซักผ้า -->
      <div class="col-span-1">
        <div class="bg-cyan-900 rounded-lg overflow-hidden shadow-lg">
          <figure>
            <img
              :src="machineDetails?.img"
              alt="เครื่องซักผ้า"
              class="object-cover w-full h-64 sm:h-72 md:h-full lg:h-full"
            />
          </figure>
        </div>
      </div>

      <!-- รายละเอียดของเครื่องซักผ้า -->
      <div class="col-span-1 flex flex-col space-y-4 mt-4 md:mt-0">
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">
            เครื่องที่: <span>{{ machineDetails?.id }}</span>
          </h3>
        </div>
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">ชื่อเครื่อง:</h3>
          <p class="text-base sm:text-lg">{{ machineDetails?.name }}</p>
        </div>
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">สถานะ:</h3>
          <p
            class="badge"
            :class="
              machineDetails?.status === 'working'
                ? 'badge-success'
                : 'badge-error'
            "
          >
            {{ machineDetails?.status }}
          </p>
        </div>
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">เวลาที่เหลือ:</h3>
          <p class="text-base sm:text-lg">
            {{ Math.floor(machineDetails?.time / 60) }} นาที
            {{ machineDetails?.time % 60 }} วินาที
          </p>
        </div>
        <div>
          <h3 class="text-lg sm:text-xl font-semibold">คำอธิบายเพิ่มเติม:</h3>
          <p class="text-base sm:text-lg">
            คุณสามารถกดหยอดเหรียญเพื่อใช้งานเครื่องซักผ้าได้โดยกด 1 ครั้ง
            จะเก็บเงินในบัญชีคุณ 10 บาทต่อครั้งซึ่งจะได้ 10 นาที
            หากสถานะขึ้นแสดงว่า working คือเครื่องกำลังทำงานอยู่
          </p>
        </div>
        <div class="col-span-1 flex justify-center md:justify-end mt-4 md:mt-0">
          <button
            @click="goBack"
            class="btn btn-error btn-secondary w-full md:w-auto"
          >
            กลับ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.main-content {
  min-height: calc(100vh - 200px); /* ปรับขนาดตาม footer */
  display: flex;
  flex-direction: column;
}
</style>




