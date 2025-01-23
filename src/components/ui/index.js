import AppCheck from './AppCheck'
import AppRadio from './AppRadio'
import AppTextInput from './AppTextInput'
import AppLoading from './AppLoading'

import AppBtn from './app-btn/AppBtn'

import AppModal from './AppModal'
import AppModalDefault from './AppModalDefault'

import AppTextarea from './AppTextarea'
import AppNumberInput from './AppNumberInput'

export default {
  install(Vue, opts) {
    Vue.component('app-text-input', AppTextInput);
    Vue.component('app-textarea', AppTextarea);
    Vue.component('app-number-input', AppNumberInput);
    Vue.component('app-btn', AppBtn);
    Vue.component('app-checkbox', AppCheck);
    Vue.component('app-radio', AppRadio);
    // Vue.component('app-checkbox', VRadio);
    // Vue.component('info-tip', InfoTip);
    // Vue.component('empty-content', EmptyContent);

    Vue.component('app-modal', AppModal);
    Vue.component('app-modal-default', AppModalDefault);

    Vue.component('app-loading', AppLoading);

    // Vue.component('app-sel', AppSel);
    // Vue.component('app-sel-opt', AppSelOpt);
    // Vue.component('app-sel-opt-group', AppSelOptGroup);

    // Vue.component('app-radio-group', AppRadioGroup);

    // Vue.component('app-dropdown', AppDropdown);
    // Vue.component('app-dropdown-item', AppDropdownItem);

    // Vue.component('farm-selector', FarmSelector);
    // Vue.component('field-selector', FieldSelector);
    // Vue.component('date-selector', DateSelector);
    // Vue.component('fertigation-selector', FertigationSelector);
    // Vue.component('slidebar', Slidebar);
    // Vue.component('search-bar', SearchBar);

    // Vue.component('vue-slidebar', VueSlider);

  }
}
