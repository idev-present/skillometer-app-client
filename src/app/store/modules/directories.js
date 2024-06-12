import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useDirectoriesStore = defineStore({
    id: "directories",
    state: () => {
        return {
            currencyList: [],
            cityList: [],
            contactsList: [],
            employmentTypeList: [],
            divisionList: [],
            qualificationList: [],
            skillList: [],
            searchStatusList: []
        }
    },
    actions: {
        // currency List
        fillCurrencyList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/currency", payload)
                    .then((res) => {
                        resolve()
                        this.currencyList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка валют! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // city List
        fillCityList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/city", payload)
                    .then((res) => {
                        resolve()
                        this.cityList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка городов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // contacts List
        fillContactsList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/contacts", payload)
                    .then((res) => {
                        resolve()
                        this.contactsList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка контактов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // employment type List
        fillEmploymentTypeList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/employment_type", payload)
                    .then((res) => {
                        resolve()
                        this.employmentTypeList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка типа занятости! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // division List
        fillDivisionList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/division", payload)
                    .then((res) => {
                        resolve()
                        this.divisionList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка классификации! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // qualification List
        fillQualificationList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/qualification", payload)
                    .then((res) => {
                        resolve()
                        this.qualificationList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка квалификации! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // skill List
        fillSearchStatusList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/search_status", payload)
                    .then((res) => {
                        resolve()
                        this.searchStatusList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка статусов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // skill List
        fillSkillList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get("/dict/skill", payload)
                    .then((res) => {
                        resolve()
                        this.skillList = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки списка навыков! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
