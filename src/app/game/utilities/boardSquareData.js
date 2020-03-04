let squares = [{
    type: 'corner square-top',
    subtype: 'free-park',
    text: 'Free Parking',
    cost: 0,
    position: 20
}, {
    type: 'property square-top',
    subtype: 'red',
    text: 'Strand',
    cost: 220,
    rent: [18, 36, 90, 250, 700, 875, 1050],
    house: 150,
    hotel: 150,
    position: 21

}, {
    type: 'special square-top',
    subtype: 'chance',
    text: 'CHANCE',
    cost: 0,
    position: 22
}, {
    type: 'property square-top',
    subtype: 'red',
    text: 'Fleet Street',
    cost: 220,
    rent: [18, 36, 90, 250, 700, 875, 1050],
    house: 150,
    hotel: 150,
    position: 23
}, {
    type: 'property square-top',
    subtype: 'red',
    text: 'Trafalgar Sqaure',
    cost: 240,
    rent: [20, 40, 100, 300, 750, 925, 1100],
    house: 150,
    hotel: 150,
    position: 24
}, {
    type: 'special square-top',
    subtype: 'station',
    text: 'Fenchurch Street Station',
    cost: 200,
    rent: [25, 50, 100, 200],
    position: 25
}, {
    type: 'property square-top',
    subtype: 'yellow',
    text: 'Leicester Square',
    cost: 260,
    rent: [22, 44, 110, 330, 800, 975, 1150],
    house: 150,
    hotel: 150,
    position: 26
}, {
    type: 'property square-top',
    subtype: 'yellow',
    text: 'Coventry Street',
    cost: 260,
    rent: [22, 44, 110, 330, 800, 975, 1150],
    house: 150,
    hotel: 150,
    position: 27
}, {
    type: 'special square-top',
    subtype: 'utility',
    text: 'Water Works',
    cost: 150,
    rent: [4, 10],
    position: 28
}, {
    type: 'property square-top',
    subtype: 'yellow',
    text: 'Piccadilly',
    cost: 280,
    rent: [24, 48, 120, 360, 850, 1025, 1200],
    house: 150,
    hotel: 150,
    position: 29
}, {
    type: 'corner square-top',
    subtype: 'go-jail',
    text: 'GO TO JAIL',
    cost: 0,
    position: 30
}, {
    type: 'property square-left',
    subtype: 'orange',
    text: 'Vine Street',
    cost: 200,
    rent: [16, 32, 80, 220, 600, 800, 1000],
    house: 100,
    hotel: 100,
    position: 19
}, {
    type: 'middle'
}, {
    type: 'property square-right',
    subtype: 'green',
    text: 'Regent Street',
    cost: 300,
    rent: [26, 52, 130, 390, 900, 1100, 1275],
    house: 200,
    hotel: 200,
    position: 31
}, {
    type: 'property square-left',
    subtype: 'orange',
    text: 'Great Malborough Street',
    cost: 180,
    rent: [14, 28, 70, 200, 550, 8750, 950],
    house: 100,
    hotel: 100,
    position: 18
}, {
    type: 'property square-right',
    subtype: 'green',
    text: 'Oxford Street',
    cost: 300,
    rent: [26, 52, 130, 390, 900, 1100, 1275],
    house: 200,
    hotel: 200,
    position: 32
}, {
    type: 'special square-left',
    subtype: 'chest',
    text: 'Community Chest',
    cost: 0,
    position: 17
}, {
    type: 'special square-right',
    subtype: 'chest',
    text: 'Community Chest',
    cost: 0,
    position: 33
}, {
    type: 'property square-left',
    subtype: 'orange',
    text: 'Bow Street',
    cost: 180,
    rent: [14, 28, 70, 200, 550, 8750, 950],
    house: 100,
    hotel: 100,
    position: 16
}, {
    type: 'property square-right',
    subtype: 'green',
    text: 'Bond Street',
    cost: 320,
    rent: [28, 56, 150, 450, 1000, 1200, 1400],
    house: 200,
    hotel: 200,
    position: 34
}, {
    type: 'special square-left',
    subtype: 'station',
    text: 'Marylebone Station',
    cost: 200,
    rent: [25, 50, 100, 200],
    position: 15
}, {
    type: 'special square-right',
    subtype: 'station',
    text: 'Liverpool Street Station',
    cost: 200,
    rent: [25, 50, 100, 200],
    position: 35
}, {
    type: 'property square-left',
    subtype: 'purple',
    text: 'Northumberland Avenue',
    cost: 160,
    rent: [12, 24, 60, 180, 500, 700, 900],
    house: 100,
    hotel: 100,
    position: 14
}, {
    type: 'special square-right',
    subtype: 'chance',
    text: 'CHANCE',
    cost: 0,
    position: 36
}, {
    type: 'property square-left',
    subtype: 'purple',
    text: 'Whitehall',
    cost: 140,
    rent: [10, 20, 50, 150, 450, 625, 750],
    house: 100,
    hotel: 100,
    position: 13
}, {
    type: 'property square-right',
    subtype: 'blue',
    text: 'Park Lane',
    cost: 350,
    rent: [35, 70, 175, 500, 1100, 1300, 1500],
    house: 200,
    hotel: 200,
    position: 37
}, {
    type: 'special square-left',
    subtype: 'utility',
    text: 'Electric Company',
    cost: 150,
    rent: [4, 10],
    position: 12
}, {
    type: 'special square-right',
    subtype: 'tax',
    text: 'SUPER TAX',
    cost: 100,
    position: 38
}, {
    type: 'property square-left',
    subtype: 'purple',
    text: 'Pall Mall',
    cost: 140,
    rent: [10, 20, 50, 150, 450, 625, 750],
    house: 100,
    hotel: 100,
    position: 11
}, {
    type: 'property square-right',
    subtype: 'blue',
    text: 'Mayfair',
    cost: 400,
    rent: [50, 100, 200, 600, 1400, 1700, 2000],
    house: 200,
    hotel: 200,
    position: 39
}, {
    type: 'corner square-bottom',
    subtype: 'jail',
    text: 'IN JAIL',
    cost: 50,
    position: 10
}, {
    type: 'property square-bottom',
    subtype: 'light-blue',
    text: 'Pentonville Road',
    cost: 120,
    rent: [8, 16, 40, 100, 300, 450, 600],
    house: 50,
    hotel: 50,
    position: 9
}, {
    type: 'property square-bottom',
    subtype: 'light-blue',
    text: 'Euston Road',
    cost: 100,
    rent: [6, 12, 30, 90, 270, 400, 550],
    house: 50,
    hotel: 50,
    position: 8

}, {
    type: 'special square-bottom',
    subtype: 'chance',
    text: 'CHANCE',
    cost: 0,
    position: 7
},  {
    type: 'property square-bottom',
    subtype: 'light-blue',
    text: 'The Angel, Islington',
    cost: 100,
    rent: [6, 12, 30, 90, 270, 400, 550],
    house: 50,
    hotel: 50,
    position: 6
}, {
    type: 'special square-bottom',
    subtype: 'station',
    text: 'Kings Cross Station',
    cost: 200,
    rent: [25, 50, 100, 200],
    position: 5
}, {
    type: 'special square-bottom',
    subtype: 'tax',
    text: 'INCOME TAX',
    cost: 200,
    position: 4
}, {
    type: 'property square-bottom',
    subtype: 'brown',
    text: 'Whitechapel Road',
    cost: 60,
    rent: [4, 8, 20, 60, 180, 320, 450],
    house: 50,
    hotel: 50,
    position: 3    
}, {
    type: 'special square-bottom',
    subtype: 'chest',
    text: 'Community Chest',
    cost: 0,
    position: 2
}, {
    type: 'property square-bottom',
    subtype: 'brown',
    text: 'Old Kent Road',
    cost: 60,
    rent: [2, 4, 10, 30, 90, 160, 250],
    house: 50,
    hotel: 50,
    position: 1
}, {
    type: 'corner square-bottom',
    subtype: 'start',
    text: 'COLLECT $200 SALARY AS YOU PASS GO',
    cost: 200,
    position: 0
}]

export default squares;