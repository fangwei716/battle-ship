export default {
    enableRotation: true, //enable rotation
    enableSunkNumMode: false, //have to sunk all to destroy a battle ship
    enableMachinePlayer: false,
    enableMoreThanTwoPlayer: false,
    defaultPlayerNum: 2,
    maxPlayerNum: 8,
    defaultGridX: 8,
    defaultGridY: 8,
    defaultBattleShips:['L'],
    battleShipTypes: {
        'L': {
            shape: [
                ['*', 'o'],
                ['*', 'o'],
                ['*', '*']
            ],
            total: 4,
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
