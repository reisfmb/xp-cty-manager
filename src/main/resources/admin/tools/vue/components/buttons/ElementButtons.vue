<template lang="pug">
div
  v-btn(
    data-testid="v-btn__duplicate",
    @click.stop="duplicate",
    icon
  )
    v-icon {{ buttons.duplicate.icon }}

  v-btn(
    data-testid="v-btn__moveUp"
    @click.stop="move('up')",
    icon,
    :disabled="getElementIndex() === 0"
  )
    v-icon {{ buttons.moveUp.icon }}

  v-btn(
    data-testid="v-btn__moveDown"
    @click.stop="move('down')",
    icon,
    :disabled="getElementIndex() === elements.length - 1"
  )
    v-icon {{ buttons.moveDown.icon }}

  v-btn(
    data-testid="v-btn__remove"
    @click.stop="remove",
    icon,
    color="red")
    v-icon {{ buttons.remove.icon }}
</template>

<script lang="ts">
import Vue from 'vue';
import Swal from 'sweetalert2';
import { Element } from '@reginaldlee/xml-js';
import * as R from 'ramda';
import * as ModuleContentType from '../../store/ModuleContentType';
import * as messages from '../../util/messages';

export default Vue.extend({
  name: 'ElementButtons',
  components: {},
  props: {
    path: Array,
  },
  data: () => ({
    buttons: {
      duplicate: { icon: 'mdi-content-copy' },
      moveUp: { icon: 'mdi-arrow-up' },
      moveDown: { icon: 'mdi-arrow-down' },
      remove: { icon: 'mdi-delete-circle-outline' },
    },
  }),
  methods: {
    getElementIndex() {
      return this.elements.findIndex(
        (el: Element) => JSON.stringify(el) === JSON.stringify(this.element),
      );
    },
    remove() {
      Swal.fire({
        title: messages.dialog.confirm,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          const elementsWithoutThisElement = this.elements.filter(
            (el: Element, index: number) => index !== this.getElementIndex(),
          );

          ModuleContentType.setContentTypeByPath(this.$store, {
            path: this.elementsPath,
            value: elementsWithoutThisElement,
          });
        }
      });
    },
    move(direction: 'up' | 'down') {
      const currentElementIndex = this.getElementIndex();
      const desiredIndex = direction === 'up' ? currentElementIndex - 1 : currentElementIndex + 1;

      if (desiredIndex < 0 || desiredIndex > this.elements.length - 1) {
        return;
      }

      function swap(arr: Array<any>, from: number, to: number) {
        const aux = arr[from];
        arr[from] = arr[to];
        arr[to] = aux;
        return arr;
      }

      const updatedElements = swap(
        this.elements,
        currentElementIndex,
        desiredIndex,
      );

      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.elementsPath,
        value: [...updatedElements],
      });
    },
    duplicate() {
      const currentElementIndex = this.getElementIndex();
      const duplicatedElement = R.view(
        R.lensIndex(currentElementIndex),
        this.elements,
      );

      const updatedElements = [
        ...this.elements.slice(0, currentElementIndex),
        duplicatedElement,
        ...this.elements.slice(currentElementIndex),
      ];

      ModuleContentType.setContentTypeByPath(this.$store, {
        path: this.elementsPath,
        value: updatedElements,
        action: 'DUPLICATING-SCHEMA',
        duplicatedIndex: currentElementIndex + 1,
      });
    },
  },
  computed: {
    elementsPath(): (string | number)[] {
      return this.path.slice(0, this.path.length - 1) as (string | number)[];
    },
    elements(): Array<Element> {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.elementsPath,
      );
    },
    element(): Element {
      return ModuleContentType.getContentTypeByPath(this.$store)(
        this.path as (string | number)[],
      );
    },
  },
});
</script>

<style lang="scss"></style>
