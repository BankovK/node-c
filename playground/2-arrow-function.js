const event1 = {
    name: 'Birthday',
    printList: function() {
        console.log('List for:' + this.name) // Will work ("this" refers to event1 object)
    }
}

const event2 = {
    name: 'Birthday',
    printList: () => {
        console.log('List for: ' + this.name) // Not gonna find this.name because "this" is not bound as reference to event2 object
    }
}

const event3 = {
    name: 'Birthday',
    guestList: ['Guest1, Guest2'],
    printList() {
        console.log('List for: ' + this.name) // Will work
        this.guestList.forEach(guest => { // Don't use function(guest) {} here, because then "this" will not be bound to event3
            console.log(guest + ' is attending ' + this.name)
        });
    }
}

event1.printList()
event2.printList()
event3.printList()