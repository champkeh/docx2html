<script lang="ts" setup>
import {useDocStore} from "@/stores/doc";
import draggable from 'vuedraggable'
import type {IDocItem} from '@/stores/types'

const docStore = useDocStore()

function deleteDoc(doc: IDocItem) {
  const idx = docStore.docs.findIndex(_ => _.id === doc.id)
  if (idx !== -1) {
    docStore.docs.splice(idx, 1)
  }
}
</script>

<template>
  <details>
    <summary></summary>
    <draggable
        v-model="docStore.docs"
        item-key="id"
        tag="ul"
        :force-fallback="true"
        chosen-class="chosen"
        animation="300"
    >
      <template #item="{element, index}">
        <li>
          <span>{{index+1}}. {{ element.file.name }}</span>
          <i class="icon bi bi-trash-fill" @click="deleteDoc(element)"></i>
        </li>
      </template>
    </draggable>
  </details>
</template>

<style scoped lang="scss">
details {
  position: relative;
  background-color: rgb(101, 101, 101);
  border-right: 1px solid black;
  min-width: 1rem;
  height: calc(100vh - 54px);
  box-sizing: border-box;
  overflow: hidden;

  &[open] {
    width: 340px;
  }

  summary {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 1rem;
    padding-left: 3px;

    &:hover {
      background-color: rgb(0 0 0 / 50%);
    }

    &::marker {
      color: white;
    }
  }

  ul {
    list-style-type: none;
    scrollbar-gutter: stable both-edges;
    padding: 0.25rem;
    box-sizing: border-box;
    height: calc(100vh - 54px);
    overflow-y: scroll;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      position: relative;
      background-color: white;
      color: black;
      box-shadow: 0 0 10px rgb(0 0 0 / 50%);
      border-radius: 3px;
      width: 300px;
      margin: 1rem;
      padding: 1rem 1.5rem 1rem 1rem;
      box-sizing: border-box;

      &:hover {
        cursor: move;

        .icon {
          display: block;
        }
      }

      .icon {
        display: none;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        transition: color .1s;

        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>
