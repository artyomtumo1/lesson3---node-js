class Gishatich extends Default {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
    }


    die() {

        matrix[this.y][this.x] = 0;

        for (var i in GishArr) {
            if (this.x == GishArr[i].x && this.y == GishArr[i].y) {
                GishArr.splice(i, 1);
            }
        }
    }

    move() {
        var newCel = this.chooseCell(0, 1, 6);
        var randCel = random(newCel);
        if (randCel) {
            var x = randCel[0];
            var y = randCel[1];

            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
                matrix[y][x] = 3;
            }
            else if (matrix[y][x] == 1) {

                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
                matrix[y][x] = 3;

                matrix[this.y][this.x] = 1;
                var nGrass = new Grass(this.x, this.y, 1);
                grassArr.push(nGrass);

            }



            this.x = x;
            this.y = y;
            this.energy--;


            if (matrix[y][x] == 6) {

                matrix[y][x] = 0;
                matrix[this.y][this.x] = this.index;

                for (var i in bombArr) {

                    if (x == bombArr[i].x && y == bombArr[i].y) {
                        bombArr[i].deploy();
                        bombArr[i].die();
                    }
                }
            }
        }
        if (this.energy < 1) {
            this.die();
        }
    }
    mul() {

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            var Gish1 = new Gishatich(newX, newY, this.index);
            GishArr.push(Gish1);
            this.multiply = 0;
        }
    }




    eat() {
        var gishatich = this.chooseCell(2, 5, 6);
        var randgishatich = random(gishatich);
        if (randgishatich) {
            var x = randgishatich[0];
            var y = randgishatich[1];
            if (matrix[y][x] == 2 || matrix[y][x] == 5) {
                matrix[y][x] = this.index;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;

                this.multiply++;
                this.energy += 10;

                for (var i in GrassEaters) {
                    if (x == GrassEaters[i].x && y == GrassEaters[i].y) {
                        GrassEaters.splice(i, 1);
                    }
                }
                for (var i in zavodArr) {
                    if (x == zavodArr[i].x && y == zavodArr[i].y) {
                        zavodArr.splice(i, 1);
                    }
                }

                if (this.multiply >= 18) {
                    this.mul();

                }


            }

            else if (matrix[y][x] == 6) {
                matrix[y][x] = 0;
                matrix[this.y][this.x] = this.index;

                for (var i in bombArr) {

                    if (x == bombArr[i].x && y == bombArr[i].y) {
                        bombArr[i].deploy();
                        bombArr[i].die();
                    }
                }
            }
        }
        else {
            this.move();

        }
    }
}