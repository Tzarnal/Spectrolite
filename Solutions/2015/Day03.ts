import type { AoCSolution } from '../SpectroLib';
import * as fs from 'fs';
//import * as fsPromise from 'fs/promises';

export class Solution implements AoCSolution {
    Solve(): void {
        const exampletData = this.ReadInput('Problems/2015/03/example.txt');
        //this.Part1(exampletData);
        //this.Part2(exampletData);

        const data = this.ReadInput('Problems/2015/03/input.txt');
        this.Part1(data);
        this.Part2(data);
    }

    Part1(input: string): void {


        let x = 0;
        let y = 0;

        let roboX = 0;
        let roboY = 0;

        let houses = new Map<string, number>();
        let house = `$0:0`;
        houses.set("0:0", 1);


        for (let i = 0; i < input.length; i++) {
            if (i % 2 == 0) {

            } else {
                switch (input[i]) {
                    case "<":
                        x--;
                        break;
                    case ">":
                        x++;
                        break;
                    case "^":
                        y--;
                        break;
                    case "v":
                        y++;
                        break;
                }
            }




            let presents = houses.get(house) || 0;
            houses.set(house, presents + 1);

        }

        console.log(`Santa visited ${houses.size} houses.`);
    }

    Part2(input: string): void {
        let x = 0;
        let y = 0;
        let roboX = 0;
        let roboY = 0;
        let houses = new Map<string, number>();
        let house = "0:0";

        houses.set(house, 1);

        for (let i = 0; i < input.length; i++) {

            if (i % 2 == 0) {
                switch (input[i]) {
                    case "<":
                        x--;
                        break;
                    case ">":
                        x++;
                        break;
                    case "^":
                        y--;
                        break;
                    case "v":
                        y++;
                        break;
                }
                house = `${x}:${y}`;
            } else {

                switch (input[i]) {
                    case "<":
                        roboX--;
                        break;
                    case ">":
                        roboX++;
                        break;
                    case "^":
                        roboY--;
                        break;
                    case "v":
                        roboY++;
                        break;
                }

                house = `${roboX}:${roboY}`;

            }
            let presents = houses.get(house) || 0;
            houses.set(house, presents + 1);
        }
        console.log(`Santa and Robo-Santa visited ${houses.size} houses.`);
    }

    ReadInput(file: string): string {
        const data = fs.readFileSync(file, 'utf-8');
        return data;
    }
}
