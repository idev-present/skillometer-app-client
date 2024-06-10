import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"

const toast = useToast()
export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            isAuth: false,
            user: null,
        }
    },
    actions: {
        fillUser(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/user/me`, null)
                    .then((res) => {
                        resolve(res || null)
                        this.user = res || null
                        this.isAuth = true
                    })
                    .catch((err) => {
                        if(!err?.response?.data?.detail) {
                            console.error(err)
                            toast.error(err?.message || "Ошибка авторизации! Пожалуйста, попробуйте позже")
                        } else {
                            this.isAuth = false
                        }
                        reject()
                    })
            })
        },
        logout(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/user/logout`, null)
                    .then((res) => {
                        console.log(res)
                        resolve(res || null)
                        this.user = null
                        this.isAuth = false
                    })
                    .catch((err) => {
                        if(!err?.response?.data?.detail) {
                            console.error(err)
                            toast.error(err?.message || "Ошибка авторизации! Пожалуйста, попробуйте позже")
                        } else {
                            this.isAuth = false
                        }
                        reject()
                    })
            })
        },
    },
})
