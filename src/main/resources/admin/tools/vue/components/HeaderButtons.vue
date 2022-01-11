<template lang="pug">
.d-flex.justify-space-between
  NewButton(:suggestSaveFunction="suggestSaveIfThereAreChanges")
  LoadButton(:suggestSaveFunction="suggestSaveIfThereAreChanges")
  SaveButton
</template>

<script lang="ts">
import Vue from "vue";
import Swal from "sweetalert2";
import * as ModuleContentType from "../store/ModuleContentType";
import * as messages from "../util/messages";

import LoadButton from "./buttons/LoadButton.vue";
import NewButton from "./buttons/NewButton.vue";
import SaveButton from "./buttons/SaveButton.vue";

export default Vue.extend({
  name: "HeaderButtons",
  components: { LoadButton, NewButton, SaveButton },
  methods: {
    async suggestSaveIfThereAreChanges(): Promise<void> {
      const isContentTypeSameAsContentTypeAfterLastSave =
        ModuleContentType.isContentTypeSameAsContentTypeAfterLastSave(
          this.$store
        );

      if (isContentTypeSameAsContentTypeAfterLastSave) return;

      return await Swal.fire({
        icon: "warning",
        text: messages.dialog.changesInCty,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("saveButton")?.click();
          throw new Error("");
        }
      });
    },
  },
});
</script>

<style lang="scss"></style>
