let squares = {
    20: {
        type: 'corner square-top',
        subtype: 'free-park',
        text: 'Free Parking',
        cost: 0
    }, 
    21: {
        type: 'property square-top',
        subtype: 'red',
        text: 'Strand',
        cost: 220,
        rent: [18, 36, 90, 250, 700, 875, 1050],
        houseCost: 150,
        houses: 0
    }, 
    22: {
        type: 'special square-top',
        subtype: 'chance',
        text: 'CHANCE',
        cost: 0
    }, 
    23: {
        type: 'property square-top',
        subtype: 'red',
        text: 'Fleet Street',
        cost: 220,
        rent: [18, 36, 90, 250, 700, 875, 1050],
        houseCost: 150,
        houses: 0
    }, 
    24: {
        type: 'property square-top',
        subtype: 'red',
        text: 'Trafalgar Square',
        cost: 240,
        rent: [20, 40, 100, 300, 750, 925, 1100],
        houseCost: 150,
        houses: 0
    }, 
    25: {
        type: 'special square-top',
        subtype: 'station',
        text: 'Fenchurch Street Station',
        cost: 200,
        rent: [25, 50, 100, 200],
    },
    26: {
        type: 'property square-top',
        subtype: 'yellow',
        text: 'Leicester Square',
        cost: 260,
        rent: [22, 44, 110, 330, 800, 975, 1150],
        houseCost: 150,
        houses: 0
    }, 
    27: {
        type: 'property square-top',
        subtype: 'yellow',
        text: 'Coventry Street',
        cost: 260,
        rent: [22, 44, 110, 330, 800, 975, 1150],
        houseCost: 150,
        houses: 0
    }, 
    28: {
        type: 'special square-top',
        subtype: 'utility',
        text: 'Water Works',
        cost: 150,
        rent: [4, 10],
    }, 
    29: {
        type: 'property square-top',
        subtype: 'yellow',
        text: 'Piccadilly',
        cost: 280,
        rent: [24, 48, 120, 360, 850, 1025, 1200],
        houseCost: 150,
        houses: 0
    }, 
    30: {
        type: 'corner square-top',
        subtype: 'go-jail',
        text: 'GO TO JAIL',
        cost: 0,
    }, 
    19: {
        type: 'property square-left',
        subtype: 'orange',
        text: 'Vine Street',
        cost: 200,
        rent: [16, 32, 80, 220, 600, 800, 1000],
        houseCost: 100,
        houses: 0
    }, 
    'middle': {
        type: 'middle'
    }, 
    31: {
        type: 'property square-right',
        subtype: 'green',
        id: 'regent-street',
        text: 'Regent Street',
        cost: 300,
        rent: [26, 52, 130, 390, 900, 1100, 1275],
        houseCost: 200,
        houses: 0
    }, 
    18: {
        type: 'property square-left',
        subtype: 'orange',
        id: 'great-malborough-street',
        text: 'Great Malborough Street',
        cost: 180,
        rent: [14, 28, 70, 200, 550, 8750, 950],
        houseCost: 100,
        houses: 0
    }, 
    32: {
        type: 'property square-right',
        subtype: 'green',
        id: 'oxford-street',
        text: 'Oxford Street',
        cost: 300,
        rent: [26, 52, 130, 390, 900, 1100, 1275],
        houseCost: 200,
        houses: 0
    }, 
    17: {
        type: 'special square-left',
        subtype: 'chest',
        text: 'Community Chest',
        cost: 0,
    }, 
    33: {
        type: 'special square-right',
        subtype: 'chest',
        text: 'Community Chest',
        cost: 0,
    }, 
    16: {
        type: 'property square-left',
        subtype: 'orange',
        text: 'Bow Street',
        cost: 180,
        rent: [14, 28, 70, 200, 550, 8750, 950],
        houseCost: 100,
        houses: 0
    }, 
    34: {
        type: 'property square-right',
        subtype: 'green',
        text: 'Bond Street',
        cost: 320,
        rent: [28, 56, 150, 450, 1000, 1200, 1400],
        houseCost: 200,
        houses: 0
    }, 
    15: {
        type: 'special square-left',
        subtype: 'station',
        text: 'Marylebone Station',
        cost: 200,
        rent: [25, 50, 100, 200],
    }, 
    35: {
        type: 'special square-right',
        subtype: 'station',
        text: 'Liverpool Street Station',
        cost: 200,
        rent: [25, 50, 100, 200],
    }, 
    14: {
        type: 'property square-left',
        subtype: 'purple',
        text: 'Northumberland Avenue',
        cost: 160,
        rent: [12, 24, 60, 180, 500, 700, 900],
        houseCost: 100,
        houses: 0
    }, 
    36: {
        type: 'special square-right',
        subtype: 'chance',
        text: 'CHANCE',
        cost: 0,
    }, 
    13: {
        type: 'property square-left',
        subtype: 'purple',
        text: 'Whitehall',
        cost: 140,
        rent: [10, 20, 50, 150, 450, 625, 750],
        houseCost: 100,
        houses: 0
    }, 
    37: {
        type: 'property square-right',
        subtype: 'blue',
        text: 'Park Lane',
        cost: 350,
        rent: [35, 70, 175, 500, 1100, 1300, 1500],
        houseCost: 200,
        houses: 0
    },
    12: {
        type: 'special square-left',
        subtype: 'utility',
        text: 'Electric Company',
        cost: 150,
        rent: [4, 10],
    }, 
    38: {
        type: 'special square-right',
        subtype: 'tax',
        text: 'SUPER TAX',
        cost: 100,
    }, 
    11: {
        type: 'property square-left',
        subtype: 'purple',
        text: 'Pall Mall',
        cost: 140,
        rent: [10, 20, 50, 150, 450, 625, 750],
        houseCost: 100,
        houses: 0
    }, 
    39: {
        type: 'property square-right',
        subtype: 'blue',
        text: 'Mayfair',
        cost: 400,
        rent: [50, 100, 200, 600, 1400, 1700, 2000],
        houseCost: 200,
        houses: 0
    }, 
    10: {
        type: 'corner square-bottom',
        subtype: 'jail',
        text: 'IN JAIL/JUST VISITING',
        cost: 50,
    }, 
    9: {
        type: 'property square-bottom',
        subtype: 'lightBlue',
        text: 'Pentonville Road',
        cost: 120,
        rent: [8, 16, 40, 100, 300, 450, 600],
        houseCost: 50,
        houses: 0
    }, 
    8: {
        type: 'property square-bottom',
        subtype: 'lightBlue',
        text: 'Euston Road',
        cost: 100,
        rent: [6, 12, 30, 90, 270, 400, 550],
        houseCost: 50,
        houses: 0
    }, 
    7: {
        type: 'special square-bottom',
        subtype: 'chance',
        text: 'CHANCE',
        cost: 0,
    },  
    6: {
        type: 'property square-bottom',
        subtype: 'lightBlue',
        text: 'The Angel, Islington',
        cost: 100,
        rent: [6, 12, 30, 90, 270, 400, 550],
        houseCost: 50,
        houses: 0
    }, 
    5: {
        type: 'special square-bottom',
        subtype: 'station',
        text: 'Kings Cross Station',
        cost: 200,
        rent: [25, 50, 100, 200],
    }, 
    4: {
        type: 'special square-bottom',
        subtype: 'tax',
        text: 'INCOME TAX',
        cost: 200,
    }, 
    3: {
        type: 'property square-bottom',
        subtype: 'brown',
        text: 'Whitechapel Road',
        cost: 60,
        rent: [4, 8, 20, 60, 180, 320, 450],
        houseCost: 50,
        houses: 0
    }, 
    2: {
        type: 'special square-bottom',
        subtype: 'chest',
        text: 'Community Chest',
        cost: 0,
    }, 
    1: {
        type: 'property square-bottom',
        subtype: 'brown',
        text: 'Old Kent Road',
        cost: 60,
        rent: [2, 4, 10, 30, 90, 160, 250],
        houseCost: 50,
        houses: 0
    }, 
    0: {
        type: 'corner square-bottom',
        subtype: 'start',
        text: 'COLLECT $200 SALARY AS YOU PASS GO',
        cost: 200
    }
}

let propertyInfo = {
    red: 3,
    brown: 2,
    lightBlue: 3,
    purple: 3,
    orange: 3,
    yellow: 3,
    green: 3,
    blue: 2,
    station: 4,
    utility: 2
}

export {
    squares,
    propertyInfo
};