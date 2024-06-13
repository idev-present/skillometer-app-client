import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useApplicantStore = defineStore({
    id: "applicant",
    state: () => {
        return {
            applicantList: [],
            applicant: null,
            contactsList: [],
            contacts: null,
            worksList: [],
            educationList: [],
            resume: null,
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
        // list works
        getWorksList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/user/work_xp", payload)
                    .then((res) => {
                        resolve(res)
                        this.worksList = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки опыта работы! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // create work
        createWorkXp(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/user/work_xp`, payload.data)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка сохранения опыта работы! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // update work
        updateWorkXp(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/work_xp/${payload.id}`, payload.data)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка изменения опыта работы! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // remove work
        removeWorkXp(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .delete(`/user/work_xp/${payload}`, null)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка удаления опыта работы! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // get contacts
        getContacts(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/user/contacts", payload)
                    .then((res) => {
                        resolve(res)
                        this.contacts = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки контактов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // update contacts
        updateContacts(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/contacts`, payload)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка сохранения контактов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // list education
        getEducationList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/user/education", payload)
                    .then((res) => {
                        resolve(res)
                        this.educationList = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки образования! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // create education
        createEducation(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/user/education`, payload.data)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка сохранения образования! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // update education
        updateEducation(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/education/${payload.id}`, payload.data)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка изменения образования! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // remove education
        removeEducation(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .delete(`/user/education/${payload}`, null)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка удаления образования! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // resume
        fillResume(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/user/cv/", payload)
                    .then((res) => {
                        resolve(res || [])
                        this.resume = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки резюме! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
