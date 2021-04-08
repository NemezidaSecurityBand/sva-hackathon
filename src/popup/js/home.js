import storage from "../../utils/storage";
import {showSettings, showFeedback} from "./nav";

export async function setupHome() {
  const $home = document.getElementById('home');

  $home.querySelector('.on-off')
      .addEventListener("click", toggleOnOffState);

  $home.querySelector('.settings')
      .addEventListener("click", showSettings);

  $home.querySelector('.feedback')
      .addEventListener("click", showFeedback);

  document.body.classList.add('init');
  const isOn = await getOnOff();
  await updateOnOffState(isOn);
  setTimeout(() => {
    document.body.classList.remove('init');
  });


  async function toggleOnOffState() {
    const isOn = !await getOnOff();
    setOnOff(isOn);
    await updateOnOffState(isOn);
  }

  async function updateOnOffState(isOn) {
    $home.classList.toggle('on', isOn);
  }

  function setOnOff(isOn) {
    storage.set('isOn', isOn);
  }

  async function getOnOff() {
    return await storage.get('isOn') ?? false;
  }
}
