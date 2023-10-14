<script setup lang="ts">
import {watch, ref} from 'vue'
import qrcode from 'qrcode'

const props = defineProps<{
  url: string
  show: boolean
}>()

const emit = defineEmits(['update:show'])

const qrcodeUrl = ref('')
watch(
    () => props.url,
    (url) => {
      if (url) {
        qrcode.toDataURL(url).then((url) => {
          qrcodeUrl.value = url
        })
      }
    }
)
</script>

<template>
  <div v-if="show" class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">文档预览</h5>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="emit('update:show', false)"
          ></button>
        </div>
        <div class="modal-body d-flex flex-column align-items-center">
          <p>
            预览地址: <a :href="url" target="_blank">{{ url }}</a>
          </p>
          <img class="w-50" :src="qrcodeUrl" alt=""/>
        </div>
        <div class="modal-footer">
          <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="emit('update:show', false)"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .5);

  .modal-dialog {
    margin: 0;
  }
}

</style>
