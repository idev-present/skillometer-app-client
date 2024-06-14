<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog class="relative z-10" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                       leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
                           enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                           enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                           leave-from="opacity-100 translate-y-0 sm:scale-100"
                           leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div v-if="props.type === 'error'"
                     class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true"/>
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                    {{ props.title }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">{{ props.description }}</p>
                  </div>
                </div>
              </div>
              <div v-if="props?.isTextarea">
                <label
                    v-if="props?.textareaLabel"
                    class="block text-sm font-medium leading-6 text-gray-900 mt-5">
                  {{props.textareaLabel}}
                </label>
                <textarea
                    v-model="textareaValue"
                    rows="3"
                    class="mt-1 block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6"
                />
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="button"
                        class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 sm:w-auto"
                        @click="submit">
                  {{ props.buttonName }}
                </button>
                <button type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                        @click="closeModal" ref="cancelButtonRef">
                  {{ props.buttonNameClose }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {ref} from 'vue'
import {Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot} from '@headlessui/vue'
import {ExclamationTriangleIcon} from '@heroicons/vue/24/outline'

const props = defineProps({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  isOpen: {type: Boolean, default: false},
  type: {type: String, default: 'error'},
  buttonName: {type: String, default: 'Войти'},
  buttonNameClose: {type: String, default: 'Отменить'},
  isTextarea: {type: Boolean, default: false},
  textareaLabel: {type: String, default: ''},
})

const textareaValue = ref('')

const emit = defineEmits(['closeModal', 'submit'])

const submit = () => {
  emit('submit', textareaValue.value)
  textareaValue.value = ''
}
const closeModal = () => {
  emit('closeModal')
  textareaValue.value = ''
}
</script>
