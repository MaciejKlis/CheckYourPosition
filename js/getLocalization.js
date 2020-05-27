import Pubsub from './pubsub.js'

const _createdAt = new WeakMap();
const _decisionAt = new WeakMap();

export default class FindMyLocalization {
    constructor(){
        _createdAt.set(this, Date.now());
        this.tryToGetLocation();
        this.data = {};        
    }

    tryToGetLocation = () => {
        const promise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition( 
                position => resolve(position),
                data => reject(data)
            )
        });
        
        promise
            .then(result => {
                _decisionAt.set(this, Date.now());
                this.data.allowToGetLocation = true;
                this.data.timeToDecisionInSeconds = (_decisionAt.get(this) - _createdAt.get(this)) / 1000;
                this.data.x = result.coords.longitude;
                this.data.y = result.coords.latitude;
                this.data.enableLocation = true;
                Pubsub.publish('allow', this.data);
                this.toggleLocation();
            })
            .catch(result => {
                this.data.allowToGetLocation = false;
                _decisionAt.set(this, Date.now())
                this.data.timeToDecisionInSeconds = (_decisionAt.get(this) - _createdAt.get(this)) / 1000;
                Pubsub.publish('denied', this.data);
            });
    }

    toggleLocation = () => {
        const button = document.createElement('button');
        button.innerHTML = 'Turn off navigation';
        const data = this.data;
        button.addEventListener('click', () => {
            if(this.data.enableLocation === true){ 
                this.data.enableLocation = false;
                button.innerHTML = 'Turn on navigation';
            } else { 
                this.data.enableLocation = true
                button.innerHTML = 'Turn off navigation';
            };
            Pubsub.publish('allow', this.data);
        });
        document.querySelector('.buttonContainer').prepend(button)
    }
}
