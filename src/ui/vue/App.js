import { createApp, defineComponent } from 'vue';
import { getHostDocument } from '../../core/host.js';
import { WordPopover } from './WordPopover.js';
import { SelectionBar } from './SelectionBar.js';
import { SettingsModal } from './SettingsModal.js';

const ROOT_ID = 'tl-vue-root';
let vueApp = null;
let rootEl = null;

const RootComponent = defineComponent({
  name: 'TavernLanguageRoot',
  components: { WordPopover, SelectionBar, SettingsModal },
  template: `
    <WordPopover />
    <SelectionBar />
    <SettingsModal />
  `,
});

export function mountVueUi() {
  unmountVueUi();
  const doc = getHostDocument();
  rootEl = doc.createElement('div');
  rootEl.id = ROOT_ID;
  rootEl.className = 'tl-ignore';
  doc.body.appendChild(rootEl);

  vueApp = createApp(RootComponent);
  vueApp.mount(rootEl);
}

export function unmountVueUi() {
  if (vueApp) {
    try {
      vueApp.unmount();
    } catch {
      // ignore
    }
    vueApp = null;
  }
  if (rootEl) {
    rootEl.remove();
    rootEl = null;
  }
  const stale = getHostDocument().getElementById(ROOT_ID);
  if (stale) stale.remove();
}
