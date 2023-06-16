<script lang="ts" setup>
import { v4 as uuid } from 'uuid'
import { useDocStore } from '@/stores/doc'
import { options } from '@/stores/options'

const docStore = useDocStore()

function onFileChange(e) {
  const files: FileList = e.target.files || e.dataTransfer.files
  docStore.docs.push(...Array.from(files).map((file) => ({ id: uuid(), file })))
}

const docs = docStore.docs
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
    <button
      class="btn btn-success px-4"
      :disabled="docs.length === 0"
      @click="docStore.exportAll()"
    >
      Export
    </button>
  </div>
</template>
