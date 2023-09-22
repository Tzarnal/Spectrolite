import type { AoCSolution } from '../SpectroLib';
import { Md5 } from 'ts-md5'


export class Solution implements AoCSolution {
    Solve(): void {
        //this.Part1("abcdef");
        //this.Part2("abcdef");

        this.Part1("bgvyzdsv");
        this.Part2("bgvyzdsv");
    }

    Part1(input: string): void {
        let hash = "";
        let i = 0;
        let success = false;

        while (!success) {
            i++;

            let md5 = new Md5();
            md5.appendStr(input)
                .appendStr(i.toString());

            hash = md5.end() as string;

            if (hash.startsWith("00000")) {
                success = true;
            }
        }

        console.log(`The hash addition is ${i}`);
    }

    Part2(input: string): void {
        let hash = "";
        let i = 0;
        let success = false;

        while (!success) {
            i++;

            let md5 = new Md5();
            md5.appendStr(input)
                .appendStr(i.toString());

            hash = md5.end() as string;

            if (hash.startsWith("000000")) {
                success = true;
            }
        }

        console.log(`The hash addition is ${i}`);
    }

}
