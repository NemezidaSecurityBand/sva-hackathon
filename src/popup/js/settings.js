import storage from "../../utils/storage";
import {hideSettings} from "./nav";

export async function setupSettings() {
  const $settings = document.getElementById('settings');

  $settings.querySelector('.back')
      .addEventListener('click', hideSettings);

  const $submarine = $settings.querySelector('.submarine');
  const $selector = $settings.querySelector('.selector');
  $selector.addEventListener('click', selectLevel);

  let currentLevel = await getLevel();
  updateLevel(currentLevel);

  function selectLevel(e) {
    let level = e.target.className;
    if( level.startsWith('level') ) {
      level = level.substr(6);
      if( level !== currentLevel ) {
        setLevel(level);
        updateLevel(level);
      }
    }
  }

  function updateLevel(level) {
    $submarine.classList.remove(`level-${currentLevel}`);
    $submarine.classList.add(`level-${level}`);
    currentLevel = level;

    $selector.querySelectorAll(`.active`).forEach($ => $.classList.remove('active'));
    const $level = $selector.querySelector(`.level-${level}`);
    $level.classList.add('active');
    const rect = $level.getBoundingClientRect();
    console.log($level, rect);
    const y = (rect.top + rect.bottom) / 2;
    $submarine.style.top = `${y}px`;
  }

  async function getLevel() {
    return await storage.get('level') ?? '1';
  }

  async function setLevel(level) {
    storage.set('level', level);
  }
}
