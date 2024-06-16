import { defineStore } from "pinia"
import { useToast } from "vue-toastification"
import ApiService from "@/shared/services/api.service.js"
import Cookies from "js-cookie";

const toast = useToast()
export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            isAuth: false,
            user: null,
            skillometer_access_token: '',
            skillometer_refresh_token: '',
            expires_in: '',
            userReplyList: [],
            userReplyItem: null,
            userReplyActivity: [],
            availableDays: [],
            availableTime: [],
        }
    },
    actions: {
        fillUser(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/user/profile`, null)
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
        updateUser(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .put(`/user/profile`, payload)
                    .then((res) => {
                        resolve(res || null)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        if(!err?.response?.data?.detail) {
                            console.error(err)
                            toast.error(err?.message || "Ошибка редактирования профиля! Пожалуйста, попробуйте позже")
                        } else {
                            this.isAuth = false
                        }
                        reject()
                    })
            })
        },
        logout(payload = null) {
            // return new Promise((resolve, reject) => {
            //     ApiService
            //         .post(`/user/logout`, null)
            //         .then((res) => {
            //             console.log(res)
            //             resolve(res || null)
            //             this.user = null
            //             this.isAuth = false
            //         })
            //         .catch((err) => {
            //             if(!err?.response?.data?.detail) {
            //                 console.error(err)
            //                 toast.error(err?.message || "Ошибка авторизации! Пожалуйста, попробуйте позже")
            //             } else {
            //                 this.isAuth = false
            //             }
            //             reject()
            //         })
            // })
            Cookies.remove('skillometer_access_token');
            Cookies.remove('skillometer_refresh_token');
            Cookies.remove('expires_in');
            Cookies.remove('skillometer_session_id');
            this.isAuth = false
            this.user = null
        },
        // list reply
        fillUserReplyList(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/user/reply/history`, payload)
                    .then((res) => {
                        resolve(res || null)
                        this.userReplyList = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки откликов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // get reply item
        fillUserReplyItem(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/reply/${payload}`, null)
                    .then((res) => {
                        resolve(res || null)
                        this.userReplyItem = res
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки отклика! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        // change Status To Declined
        changeStatusToDeclined(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/reply/${payload.id}/status`, payload.data)
                    .then((res) => {
                        resolve(res)
                        toast.success("Успешно")
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка отказа отклика! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        getReplyActivity(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/reply/${payload}/activity`, null)
                    .then((res) => {
                        resolve(res || [])
                        this.userReplyActivity = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки истории статусов! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        getAvailableDays(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/events/available/days`, null)
                    .then((res) => {
                        resolve(res || [])
                        this.availableDays = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки свободных дней на собеседование! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        getAvailableTime(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .get(`/events/available/time?reply_id=${payload.id}&day=${payload.day}`, null)
                    .then((res) => {
                        resolve(res || [])
                        this.availableTime = res || []
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка загрузки слотов на собеседование! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
        createAvailable(payload = null) {
            return new Promise((resolve, reject) => {
                ApiService
                    .post(`/events/?reply_id=${payload.id}`, payload.data)
                    .then((res) => {
                        resolve(res || null)
                    })
                    .catch((err) => {
                        console.error(err)
                        toast.error(err?.message || "Ошибка выбора даты собеседования! Пожалуйста, попробуйте позже")
                        reject()
                    })
            })
        },
    },
})
