import type { AoCSolution } from '../SpectroLib';
import * as fs from 'fs';
//import * as fsPromise from 'fs/promises';

export class Solution implements AoCSolution {
    Solve(): void {
        const exampletData = this.ReadInput('Problems/2015/06/example.txt');
        //this.Part1(exampletData);
        //this.Part2(exampletData);

        const data = this.ReadInput('Problems/2015/06/input.txt');
        this.Part1(data);
        this.Part2(data);
    }

    Part1(input: Command[]): void {
        let lights: boolean[][] = [];

        for (let x = 0; x < 1000; x++) {
            lights[x] = [];
            for (let y = 0; y < 1000; y++) {
                lights[x][y] = false;

            }
        }

        input.forEach((command) => {
            for (let x = command.start[0]; x <= command.end[0]; x++) {
                for (let y = command.start[1]; y <= command.end[1]; y++) {

                    if (command.operation == "on") {
                        lights[x][y] = true;
                    } else if (command.operation == "off") {
                        lights[x][y] = false;
                    }
                    else {
                        lights[x][y] = !lights[x][y];
                    }
                }
            }
        });

        let lightcount = 0
        for (let x = 0; x < 1000; x++) {
            for (let y = 0; y < 1000; y++) {
                if (lights[x][y]) {
                    lightcount++;
                }

            }
        }

        console.log(`In total ${lightcount} lights have been lit.`);
    }

    Part2(input: Command[]): void {
        let lights: number[][] = [];

        for (let x = 0; x < 1000; x++) {
            lights[x] = [];
            for (let y = 0; y < 1000; y++) {
                lights[x][y] = 0;

            }
        }

        input.forEach((command) => {
            for (let x = command.start[0]; x <= command.end[0]; x++) {
                for (let y = command.start[1]; y <= command.end[1]; y++) {

                    if (command.operation == "on") {
                        lights[x][y] += 1;
                    } else if (command.operation == "off") {
                        lights[x][y] -= 1;
                        if (lights[x][y] < 0) {
                            lights[x][y] = 0;
                        }
                    }
                    else {
                        lights[x][y] += 2;
                    }
                }
            }
        });

        let lightcount = 0
        for (let x = 0; x < 1000; x++) {
            for (let y = 0; y < 1000; y++) {
                lightcount += lights[x][y];

            }
        }

        console.log(`The grid has ${lightcount} total brightness.`);
    }

    ReadInput(file: string): Command[] {
        const data = fs.readFileSync(file, 'utf-8').trim();
        const lines = data.split(/[\r\n]+/);

        let Commands: Command[] = [];

        lines.forEach((line) => {
            line = line.replace("turn", "").trim();

            let match = line.matchAll(/(.+) (\d+),(\d+) through (\d+),(\d+)/g);
            let matches = [...match][0];

            let command: Command = {
                operation: matches[1],
                start: [+matches[2], +matches[3]],
                end: [+matches[4], +matches[5]],
            }

            Commands.push(command);
        })

        return Commands;
    }
}

type Command = {
    operation: string;
    start: [x: number, y: number];
    end: [x: number, y: number];
};