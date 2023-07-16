import type { AoCSolution } from "../SpectroLib";
import * as fs from "fs";

export class Solution implements AoCSolution {
    Solve(): void {
        //const exampletData = this.ReadInput("Problems/2015/02/example.txt");
        //this.Part1(exampletData);
        //this.Part2(exampletData);

        const data = this.ReadInput("Problems/2015/02/input.txt");
        this.Part1(data);
        this.Part2(data);
    }

    Part1(input: string[]): void {
        let totalPaper = 0;

        input.forEach(function (gift) {
            const sides = gift.split("x");
            const l = Number(sides[0]);
            const w = Number(sides[1]);
            const h = Number(sides[2]);

            const extra = Math.min(l * w, w * h, h * l);

            let paper = extra;
            paper += 2 * l * w;
            paper += 2 * w * h;
            paper += 2 * h * l;

            totalPaper += paper;
        });

        console.log("Total square feet of wrapping paper: " + totalPaper);
    }

    Part2(input: string[]): void {
        let totalRibbon = 0;

        input.forEach(function (gift) {
            let ribbon = 0;

            const sides = gift.split("x");
            const l = Number(sides[0]);
            const w = Number(sides[1]);
            const h = Number(sides[2]);

            //the bow
            ribbon += l * w * h;

            //Find smallest two faces
            const sidesNumbers = [l, w, h];
            const smallestSides = sidesNumbers
                .sort((a, b) => a - b)
                .slice(0, 2);

            ribbon +=
                smallestSides[0] +
                smallestSides[0] +
                smallestSides[1] +
                smallestSides[1];

            console.log("Feet of ribbon: " + ribbon);

            totalRibbon += ribbon;
        });

        console.log("Total feet of ribbon: " + totalRibbon);
    }

    ReadInput(file: string): string[] {
        const fileString = fs.readFileSync(file, "utf-8");
        const data = fileString.split(/[\r\n]+/);

        return data;
    }
}
