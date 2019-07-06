export default {
    enableRotation:false, //enable rotation
    enableSunkNumMode: false, //have to sunk all to destroy a battle ship
    enableMachinePlayer: false,
    enableMoreThanTwoPlayer: false,
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
            total: 5,
            sunkNum: 3
        },
        'SQ': {
            shape: [
                ['*', '*'],
                ['*', '*']
            ],
            total: 4,
            sunkNum: 2
        },
        'I': {
            shape: [
                ['*', '*', '*', '*']
            ],
            total: 4,
            sunkNum: 2
        }
    }
}
