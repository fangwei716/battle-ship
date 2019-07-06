export default {
    enableRotation:false, //enable rotation
    enableSunkNumMode: false, //have to sunk all to destroy a battle ship
    defaultPlayerNum:2,
    defaultGridX:8,
    defaultGridY:8,
    defaultBattleShips:['L','SQ','I','I'],
    battleShipTypes: {
        'L': {
            shape: [
                ['*', 'o'],
                ['*', 'o'],
                ['*', '*']
            ],
            sunkNum: 3
        },
        'SQ': {
            shape: [
                ['*', '*'],
                ['*', '*']
            ],
            sunkNum: 2
        },
        'I': {
            shape: [
                ['*', '*', '*', '*']
            ],
            sunkNum: 2
        }
    }
}
