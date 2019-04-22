import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

@Component({
  components: {
    'el-dropdown': Dropdown,
    'el-dropdown-menu': DropdownMenu,
    'el-dropdown-item': DropdownItem
  }
})
export default class HeaderBar extends Vue {
  private get userName() {
    return (window as any).userName
  }

  private handleCommand(command) {
    if (command === 'exit') {
      window.location.href = '/account/logout';
    }
  }
}
