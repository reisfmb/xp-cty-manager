<template lang="pug">
v-app#app
  HeaderButtons

  v-form(ref="form", lazy-validation)
    RecursiveComponentRender(:path="[]")

  .d-flex.align-center.justify-center.h-100(v-if="!show")
    p.new-schema-placeholder {{ welcomeText }}
</template>

<script>
import * as ModuleContentType from "./store/ModuleContentType";
import HeaderButtons from "./components/HeaderButtons.vue";
import RecursiveComponentRender from "./components/RecursiveComponentRender.vue";

export default {
  name: "App",
  components: {
    HeaderButtons,
    RecursiveComponentRender,
  },
  data: () => ({
    fileName: null,
    welcomeText:
      "Use NEW/LOAD buttons to create or open a content type schema.",
  }),
  computed: {
    show() {
      return !!ModuleContentType.getContentTypeByPath(this.$store)([]);
    },
  },
};
</script>

<style lang="scss">
#app {
  background-color: rgb(235, 235, 235);
  padding: 25px;
  display: flex;
  min-height: 100vh;
}
@media only screen and (min-width: 960px) {
  #app {
    padding: 25px 15%;
  }
}

/* Vuetify overwrite rules */
.v-application--wrap {
  min-height: auto;
}

.v-card {
  margin: 25px 0 40px 0;
}

.v-card .v-card-error {
  border: 2px solid red;
}

.v-card__title,
.v-card__subtitle {
  padding: 5px 16px;
}

.v-card__title + .v-card__subtitle {
  padding-top: 5px;
}

.v-card > .v-card__subtitle {
  padding-top: 16px;
}

form .v-card__text {
  padding-top: 0;
}

.v-dialog .v-card {
  margin: 0px;
}

/* Custom classes */
.h-100 {
  height: 100%;
}
.loading-icon {
  width: 50px;
  display: block;
  margin: 0 auto;
}
.no-border {
  border: 0 !important;
}
.required label::after {
  content: " *";
}
.v-card-error {
  border: 2px solid red !important;
}
.spacer-1-icon-left {
  margin-left: 36px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Seet alert rules */
.swal2-container {
  font-family: "Roboto";
}
body.swal2-shown > [aria-hidden="true"] {
  transition: 0.3s filter;
  filter: blur(3px);
}
</style>
