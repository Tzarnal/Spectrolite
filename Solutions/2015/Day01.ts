import type { AoCSolution } from "../SpectroLib"
import * as fs from 'fs';

export class Y2015_Day01 implements AoCSolution {
    Solve(): void {
        //const exampletData = this.ReadInput("Problems/2015/01/example.txt");
        //this.Part1(exampletData);
        //this.Part2(exampletData);
                
        const data = this.ReadInput("Problems/2015/01/input.txt");
        this.Part1(data);
        this.Part2(data);
    }
    
    Part1(input: string): void {        
        let floor:number = 0;
        
        for(let i:number = 0; i <  input.length; i++)
        {
            const instruction = input[i];

            if(instruction == '(')
            {
                floor++;
            }else{
                floor--;
            }
        }
        
        console.log("The instructions take santa to floor : " + floor)
    }
    
    Part2(input: string): void {
        let floor:number = 0;
        let position = 1;

        for(let i:number = 0; i <  input.length; i++)
        {
            const instruction = input[i];

            if(instruction == '(')
            {
                floor++;
            }else{
                floor--;
            }

            if(floor < 0)
            {
                console.log("Santa first enters the basement at position : " + position)
                return;
            }

            position++;
        }
        
        console.log("Santa never entered the basement.");
    }    

    ReadInput(file: string): string{
        const data = fs.readFileSync(file, 'utf-8');        
        return data;
    }
}