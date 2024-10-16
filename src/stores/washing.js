import { defineStore } from "pinia";
import axios from 'axios'
const BASE_URL = 'https://api.line.me/v2/bot/message/push'

export const Machine = defineStore({
    id: "Machine",
    state: () => ({
        machine_url: {
            linesend: `https://api.line.me/v2/bot/message/push`
        },
        machines: [
            { id: "1", name: "เครื่องซักผ้าฝาหน้า รุ่น FV1412S2B", status: 'working', time: 600, img: '/src/assets/mac01.png' },
            { id: "2", name: "เครื่องซักผ้า 2 ถัง รุ่น TT15WAPG", status: 'working', time: 1800, img: '/src/assets/mac02.png' },
            { id: "3", name: "เครื่องซักผ้า 15 กก รุ่น F2515STGV", status: 'not working', time: 0, img: '/src/assets/mac03.png' },
            { id: "4", name: "เครื่องซักผ้า 2 ถัง รุ่น TT18NAPG", status: 'working', time: 1200, img: '/src/assets/mac04.png' },
            { id: "5", name: "เครื่องซักผ้า 21 กก. รุ่น TV2521DV7B", status: 'working', time: 300, img: '/src/assets/mac05.png' },
            { id: "6", name: "เครื่องซักผ้าฝาหน้า 13 กก. รุ่น FV1413H4M", status: 'working', time: 60, img: '/src/assets/mac06.png' },
        ],
        DataMachine: JSON.parse(localStorage.getItem("data-Machine")) || [],
        intervalId: null,
    }),
    actions: {
        async setMachince() {
            localStorage.setItem("data-Machine", JSON.stringify(this.machines));
        },
        getMachineById(id) {
            return this.DataMachine.find((machine) => machine.id === id) || null;
        },
        async updateMachine(id, status, time) {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }

            const machineIndex = this.DataMachine.findIndex(machine => machine.id === id);
            if (machineIndex !== -1) {
                this.DataMachine[machineIndex].status = status;
                this.DataMachine[machineIndex].time = time;
                localStorage.setItem("data-Machine", JSON.stringify(this.DataMachine));


                this.startCountdown();
            }
            return true;
        },
        startCountdown() {
            this.intervalId = setInterval(() => {
                this.DataMachine.forEach(machine => {
                    if (machine.status === "working" && machine.time > 0) {
                        machine.time--;
                    } else if (machine.time <= 0 && machine.status === "working") {
                        machine.status = "not working";
                    }
                });
                localStorage.setItem("data-Machine", JSON.stringify(this.DataMachine));
            }, 1000);
        }
    }
});

