import type { AoCSolution } from '../SpectroLib';
import * as fs from 'fs';
//import * as fsPromise from 'fs/promises';

export class Solution implements AoCSolution {
    Solve(): void {
        const exampletData = this.ReadInput('Problems/2015/00/example.txt');
        this.Part1(exampletData);
        //this.Part2(exampletData);

        //const data = this.ReadInput('Problems/2015/00/input.txt');
        //this.Part1(data);
        //this.Part2(data);
    }

    Part1(input: string): void {
        console.log(`A Solution can be found.`);
    }

    Part2(input: string): void {
        console.log(`A Solution can be found.`);
    }

    ReadInput(file: string): string {
        const data = fs.readFileSync(file, 'utf-8').trim();
        return data;
    }
}
