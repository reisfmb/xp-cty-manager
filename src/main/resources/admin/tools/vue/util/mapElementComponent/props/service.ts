import { IComponentProps } from "../type";

export default {
  component: "TextInput",
  field: {
    label: "Service",
    hint: "Holds the name of a JavaScript service file, located under /resources/services/[my-custom-selector]/[my-custom-selector].js. You can also refer to a service file in another application, for example com.myapplication.app:myservice.",
  },
  rules: [],
  i18n: false,
} as IComponentProps;
