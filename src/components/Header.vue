<script lang="ts" setup>
import { v4 as uuid } from 'uuid'
import { useDocStore } from '@/stores/doc'
import { options } from '@/stores/options'

const docStore = useDocStore()

function onFileChange(e: any) {
  const files: FileList = e.target.files || e.dataTransfer.files
  docStore.docs.push(
    ...Array.from(files).map((file) => ({
      id: uuid(),
      file
    }))
  )
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
                <input
                  v-if="typeof options[k] === 'boolean'"
                  type="checkbox"
                  v-model="options[k]"
                  class="form-check-input"
                />
                <input v-else type="text" class="form-control" v-model="options[k]" />
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
  </div>
</template>
