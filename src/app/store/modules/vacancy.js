import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useVacancyStore = defineStore({
    id: "vacancy",
    state: () => {
        return {
            vacancyList: [],
            vacancyItem: null,
        }
    },
    actions: {
        // Vacancy List
        fillVacancyList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/vacancy/", payload)
                    .then((res) => {
                        resolve()
                        this.vacancyList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка вакансий! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // Vacancy Item
        fillVacancyItem(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/vacancy/${payload}`, null)
                    .then((res) => {
                        resolve(res)
                        this.vacancyItem = res || null
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки вакансии! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // Vacancy Item
        replyVacancyItem(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/vacancy/${payload.id}/reply`, payload.comment)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка отправки отклика! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
