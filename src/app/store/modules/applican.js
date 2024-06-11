import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useApplicantStore = defineStore({
    id: "applicant",
    state: () => {
        return {
            applicantList: [],
            applicant: null
        }
    },
    actions: {
        // application List
        fillApplicantList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/applicant/", payload)
                    .then((res) => {
                        resolve(res || [])
                        this.applicantList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки резюме! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // get application
        getApplicant(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/user/applicant_info", payload)
                    .then((res) => {
                        resolve(res)
                        this.applicant = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки специализации! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // update applicant
        updateApplicant(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/applicant_info`, payload)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка сохранения специализации! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
