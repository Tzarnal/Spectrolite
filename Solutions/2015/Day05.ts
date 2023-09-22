import type { AoCSolution } from '../SpectroLib';
import * as fs from 'fs';
//import * as fsPromise from 'fs/promises';

export class Solution implements AoCSolution {
    Solve(): void {
        const exampletData = this.ReadInput('Problems/2015/05/example.txt');
        //this.Part1(exampletData);
        //this.Part2(exampletData);

        const data = this.ReadInput('Problems/2015/05/input.txt');
        //this.Part1(data);
        this.Part2(data);
    }

    Part1(input: string[]): void {

        let nice = 0;
        let naughty = 0;

        let vowels = ["a", "e", "i", "o", "u"];
        let badStrings = ["ab", "cd", "pq", "xy"];

        input.forEach((line) => {
            if (!this.HasDouble(line)) {
                naughty++;
                return;
            }

            for (let i = 0; i < badStrings.length; i++) {
                if (line.includes(badStrings[i])) {
                    naughty++;
                    return;
                }
            }

            let vowelCount = 0;
            vowels.forEach((vowel) => {
                let r = new RegExp(vowel, 'g');
                let match = line.match(r);
                vowelCount += (match || []).length;
            })

            if (vowelCount < 3) {
                naughty++;
                return;
            }

            //Isn't naughty, so its nice
            //console.log(line);
            nice++;
        });

        console.log(`There are ${nice} nice strings.`);
    }

    Part2(input: string[]): void {
        let nice = 0;

        input.forEach((line) => {
            let seperatedChar = false;

            for (let i = 0; i < line.length - 2; i++) {
                if (line[i] == line[i + 2]) {
                    seperatedChar = true;
                    break;
                }
            }

            if (!seperatedChar) {
                return;
            }

            let targetStrings: string[] = [];

            //Look for potential pairs.
            for (let i = 0; i < line.length - 1; i++) {

                let target = `${line[i]}${line[i + 1]}`;
                if (!targetStrings.includes(target)) {
                    targetStrings.push(target);
                }

            }

            let doublePair = false;
            //Check if there are pairs.
            for (let i = 0; i < targetStrings.length; i++) {
                let r = new RegExp(targetStrings[i], 'g');
                let match = line.match(r);

                if ((match || []).length > 1) {
                    doublePair = true;
                    break;
                }
            }

            if (!doublePair) {
                return;
            }

            nice++;
        });


        console.log(`There are ${nice} nice strings.`);
    }

    HasDouble(input: string): boolean {
        for (let i = 0; i < input.length - 1; i++) {
            if (input[i] == input[i + 1]) {
                return true;
            }
        }

        return false;
    }

    ReadInput(file: string): string[] {
        const fileString = fs.readFileSync(file, "utf-8").trim();
        const data = fileString.split(/[\r\n]+/);

        return data;
    }
}
