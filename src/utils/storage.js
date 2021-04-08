import {$browser} from "./browser";

export default {

  set(key, value) {
    $browser.storage.local.set({[key]: value});
  },

  async get(key) {
/*
    const values = await (chrome
        ? new Promise(resolve => $browser.storage.local.get(key, resolve))
        : await $browser.storage.local.get(key));
*/
    const values = await new Promise(resolve => $browser.storage.local.get(key, resolve));
    return values[key];
  }

}
