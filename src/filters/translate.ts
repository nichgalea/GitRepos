import get from "lodash/get";
import store from "@/store";
import i18n from "@/i18n.json";

export default function translate(key: string): string {
  return get(i18n, `${store.state.lang}.${key}`, key);
}
