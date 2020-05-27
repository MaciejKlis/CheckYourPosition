import Pubsub from './pubsub.js';

class MakeView {
    constructor(){
        Pubsub.subscribe(this.renderView);
        this.container = document.getElementById('container');
    };

    renderView = (option, data = false) => {
        //reset view before rerendeing
        this.container.innerHTML = '';

        let stringView;
        switch (option) {
            case 'mobile':
                stringView = this.notComputerView();
                break;
            case 'allow':
                stringView = this.allowView(data);
                break;
            case 'denied':
                stringView = this.deniedView(data);
                break;
        }

        const HTMLelements = new DOMParser().parseFromString(stringView, "text/html").body.childNodes;
        HTMLelements.forEach(el => {
            this.container.append(el)
        })

        this.tryMakeMap(data.y, data.x);
    };

    notComputerView = () => {
        return `<h1>This's not a computer</h1>`;
    }

    allowView = (data) => {
        if(data.enableLocation){
            return `<h1> This is computer and I'm allow to check your localization </h1>
                    <div class="details">
                        <h2> You taken decision in: ${data.timeToDecisionInSeconds}s</h2>
                        <h2> Longitude is: ${data.x}</h2>
                        <h2> Latitude is: ${data.y}</h2>
                    </div>
                    <div id="map"><div>`;
        } else {
            return `<h1> Firstly turn on location </h1>`;
        }
    }

    deniedView = (data) => {
        return `<h1> This is computer. You have denied acces to localization </h1>
                <div class="details">
                    <h2> You taken decision in: ${data.timeToDecisionInSeconds}s </h2>
                </div>`;
    }

    tryMakeMap = (y, x) => {
        if(document.getElementById('map')){
            let myLatLan = {lat: y, lng: x}
            
            const map = new google.maps.Map(document.getElementById('map'), {
                center: myLatLan,
                zoom: 12,
                MarkerShape: [x, y],
            });

            const marker = new google.maps.Marker({
                position: myLatLan,
                map: map,
            });

            marker.setMap(map);
        }
    } 
}

export default new MakeView();