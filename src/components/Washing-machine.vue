<template>
  <div
    class="grid grid-cols-1 ml-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4"
  >
    <div
      v-for="item in getDataMachine"
      :key="item.id"
      class="card card-compact bg-base-100 w-full shadow-xl"
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
          <button :disabled="isFormValid(item.status)" class="btn btn-info">
            ใช้งานเครื่องซักผ้า
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

//
const getDataMachine = ref("");
//
const getmachine = async () => {
  const DataMachine = localStorage.getItem("data-Machince");
  if (DataMachine) {
    const data = JSON.parse(DataMachine);
    getDataMachine.value = data;
    console.log(getDataMachine.value);
  }
};
const countdown = () => {
  setInterval(() => {
    getDataMachine.value.forEach((machine) => {
      if (machine.status === "working" && machine.time > 0) {
        machine.time--;
      } else if (machine.time <= 0 && machine.status === "working") {
        machine.status = "not working";
      }
    });
    localStorage.setItem("data-Machince", JSON.stringify(getDataMachine.value));
  }, 1000);
};
const isFormValid = (status) => {
  // console.log(status);
  const baseValidations = status !== "not working";
  return baseValidations;
};
onMounted(async () => {
  await getmachine();
  countdown();
});
</script>

<style lang="scss" scoped>
</style>