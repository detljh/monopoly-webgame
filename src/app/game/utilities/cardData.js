let chance = [{
    text: "Your building loan matures. Receive $150",
    receive: 150
}, {
    text: "You have won a crossword competition. Collect $100",
    receive: 100
}, {
    text: "You are assessed for street repairs: $40 per house, $115 per hotel",
    house: 40,
    hotel: 115
}, {
    text: "Take a trip to Marylebone Station and if you pass 'Go' collect $200",
    position: 15,
    go: true
}, {
    text: "Speeding fine $15",
    pay: 15
}, {
    text: "Pay school fees of $150",
    pay: 150
}, {
    text: "Make general repairs on all of your houses. For each house pay $25. For each hotel pay $100",
    house: 25,
    hotel: 100
}, {
    text: "Go to jail. Move directly to jail. Do not pass 'Go'. Do not collect $200",
    position: 10,
    go: false
}, {
    text: "Go back three spaces",
    back: 3
}, {
    text: "Get out of jail free. This card may be kept until needed or sold",
    jailCard: true
}, {
    text: "Bank pays you dividend of $50",
    receive: 50
}, {
    text: "Advance to Trafalgar Square. If you pass 'Go' collect $200",
    position: 24,
    go: true
}, {
    text: "Advance to Pall Mall. If you pass 'Go' collection $200",
    position: 11,
    go: true
}, {
    text: "Advance to Mayfair",
    position: 39,
    go: false
}, {
    text: "Advance to 'Go'",
    position: 0,
    go: true
}, {
    text: "'Drunk in charge' fine $20",
    pay: 20
}]

let chest = [{
    text: "Advance to 'Go'",
    position: 0,
    go: true
}, {
    text: "Go back to Old Kent Road",
    position: 1,
    go: false
}, {
    text: "Go to jail. Move directly to jail. Do not pass 'Go'. Do not collect $200",
    position: 10,
    go: false
}, {
    text: "Pay hospital $100",
    pay: 100
}, {
    text: "Doctor's fee. Pay $50",
    pay: 50
}, {
    text: "Pay your insurance premium $50",
    pay: 50
}, {
    text: "Bank error in your favour. Collect $200",
    receive: 200
}, {
    text: "Annuity matures. Collect $100",
    receive: 100
}, {
    text: "You inherit $100",
    receive: 100
}, {
    text: "From sale of stock you get $50",
    receive: 50
}, {
    text: "Receive interest on 7% preference shares: $25",
    receive: 25
}, {
    text: "Income tax refund. Collect $20",
    receive: 20
}, {
    text: "You have won second prize in a beauty contest. Collect $10",
    receive: 10
}, {
    text: "It is your birthday. Collect $10 from each player",
    player: 10
}, {
    text: "Get out of jail free. This card may be kept until needed or sold",
    jailCard: true
}, {
    text: "Pay a $10 fine or take a 'Chance'",
    chance: 10
}]

export default {
    chance,
    chest
}