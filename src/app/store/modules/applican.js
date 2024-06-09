import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useApplicantStore = defineStore({
    id: "applicant",
    state: () => {
        return {
            applicantList: [],
        }
    },
    actions: {
        // currency List
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
        // create applicant
        createApplicant(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post("/applicant/", payload)
                    .then((res) => {
                        resolve(res)
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка сохранения личных данных! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
