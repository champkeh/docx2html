<script lang="ts" setup>
import { v4 as uuid } from 'uuid'
import { useDocStore } from '@/stores/doc'
import { options } from '@/stores/options'
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'

const docStore = useDocStore()

function onFileChange(e: any) {
  const files: FileList = e.target.files || e.dataTransfer.files
  docStore.docs.push(
    ...Array.from(files).map((file) => ({
      id: uuid(),
      file,
      className: 'docx' + uuid().replace(/[^a-z0-9]/gi, '')
    }))
  )
}

const loading = ref(false)
const url = ref('')
const modalIsOpen = ref(false)
function preview() {
  loading.value = true
  docStore
    .preview()
    .then((res) => {
      url.value = import.meta.env.VITE_DOMAIN + res.key
      modalIsOpen.value = true
    })
    .catch((e) => {
      alert(e.message)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="hstack p-2 gap-2 bg-light">
    <input
      type="file"
      @change="onFileChange"
      class="form-control"
      accept=".docx"
      multiple
      style="width: 50ch"
    />
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Options
      </button>
      <ul class="dropdown-menu">
        <li v-for="(_, k) of options" :key="k">
          <div class="dropdown-item">
            <div class="form-check">
              <label class="form-check-name">
                <input type="checkbox" v-model="options[k]" class="form-check-input" />
                {{ k }}
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex-grow-1"></div>
    <span class="mx-2">size: ~{{ docStore.size }}</span>
    <button
      class="btn btn-success px-4"
      :disabled="docStore.docs.length === 0"
      @click="docStore.mergeExport()"
    >
      Export
    </button>
    <button
      class="btn btn-secondary px-4"
      :disabled="docStore.docs.length === 0 || loading"
      @click="preview"
    >
      <span
        v-if="loading"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Preview
    </button>
  </div>

  <Modal v-model:show="modalIsOpen" :url="url" />
</template>
