
import AppCntrl from './controllers/app_cntrl.js'

window.FSM = {
  AppCntrl: AppCntrl
}

Silica.setContext('FSM')
Silica.compile(document)
Silica.apply(() => {})
