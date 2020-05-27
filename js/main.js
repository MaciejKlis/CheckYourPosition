import DeviceDetector from './deviceDetector.js';
import Pubsub from './pubsub.js';
import MakeView from './makeViewFactory.js';
import FindMyLocalization from './getLocalization.js';

window.addEventListener('DOMContentLoaded', () => {
    const BorowserInfo = new DeviceDetector();
    
    if(BorowserInfo.isMobile()){
        Pubsub.publish('mobile');
        return;
    }
    
    const localization = new FindMyLocalization();
})


