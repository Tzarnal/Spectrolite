import type { AoCSolution } from "../SpectroLib"
import * as fs from 'fs';

export class Solution implements AoCSolution {
    Solve(): void {
        const exampletData = this.ReadInput("Problems/2015/01/example.txt");
        this.Part1(exampletData);
        //this.Part2(exampletData);
                
        //const data = this.ReadInput("..");
        //this.Part1(data);
        //this.Part2(data);
    }
    
    Part1(input: string): void {        
        console.log("A Solution can be found." + input)
    }
    
    Part2(input: string): void {
        console.log("A Solution can be found." + input)
    }    
    
    ReadInput(file: string): string{
        const data = fs.readFileSync(file, 'utf-8');        
        return data;
    }
}

