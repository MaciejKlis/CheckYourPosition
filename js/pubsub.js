class Pubsub {
    events = [];

    subscribe(event) {
        this.events.push(event);
    }

    publish(isMobile, data) {
        this.events.forEach(ev => {
            ev(isMobile, data);
        })
    }
}

export default new Pubsub();