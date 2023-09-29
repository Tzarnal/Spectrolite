import type { AoCSolution } from '../SpectroLib';
import * as fs from 'fs';
//import * as fsPromise from 'fs/promises';

export class Solution implements AoCSolution {
    Solve(): void {
        //const exampletData = this.ReadInput('Problems/2015/07/example.txt');
        //this.Part1(exampletData);
        //this.Part2(exampletData);

        const data = this.ReadInput('Problems/2015/07/input.txt');
        this.Part1(data);
        this.Part2(data);
    }

    Part1(input: Instruction[]): void {
        let finished = false;
        let wireValues = new Map<string, number>();
        let iterations = 0;

        while (!finished) {
            iterations++;
            input.forEach((instruction) => {
                if (!instruction.completed) {
                    //NOT  
                    if (instruction.operation.includes("NOT")) {
                        let wireSplit = instruction.operation.split("NOT");
                        let [resolved, wire] = this.ResolveValue(wireSplit[1].trim(), wireValues);

                        if (resolved) {
                            let value = 65535 - wire; //Easier than actually doing bitwise not without a uint16
                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                    //AND  
                    else if (instruction.operation.includes("AND")) {
                        let wireSplit = instruction.operation.split("AND");
                        let [fResolved, fistWire] = this.ResolveValue(wireSplit[0].trim(), wireValues);
                        let [sResolved, secondWire] = this.ResolveValue(wireSplit[1].trim(), wireValues);

                        if (fResolved && sResolved) {
                            let value = fistWire & secondWire;

                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                    //OR  
                    else if (instruction.operation.includes("OR")) {
                        let wireSplit = instruction.operation.split("OR");
                        let [fResolved, fistWire] = this.ResolveValue(wireSplit[0].trim(), wireValues);
                        let [sResolved, secondWire] = this.ResolveValue(wireSplit[1].trim(), wireValues);

                        if (fResolved && sResolved) {
                            let value = fistWire | secondWire;

                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                    //LSHIFT  
                    else if (instruction.operation.includes("LSHIFT")) {
                        let wireSplit = instruction.operation.split("LSHIFT");
                        let [wireResolved, wire] = this.ResolveValue(wireSplit[0].trim(), wireValues);
                        let [shiftResolved, shiftValue] = this.ResolveValue(wireSplit[1].trim(), wireValues);

                        if (wireResolved && shiftResolved) {
                            let value = wire << shiftValue;

                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                    //RSHIFT  
                    else if (instruction.operation.includes("RSHIFT")) {
                        let wireSplit = instruction.operation.split("RSHIFT");
                        let [wireResolved, wire] = this.ResolveValue(wireSplit[0].trim(), wireValues);
                        let [shiftResolved, shiftValue] = this.ResolveValue(wireSplit[1].trim(), wireValues);

                        if (wireResolved && shiftResolved) {
                            let value = wire >> shiftValue;

                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                    //Asignments
                    else {
                        let [resolved, value] = this.ResolveValue(instruction.operation, wireValues);

                        if (resolved) {
                            wireValues.set(instruction.wire, value);
                            instruction.completed = true;
                        }
                    }
                }

                if (wireValues.has("a")) {
                    finished = true;
                }
            })
        }

        console.log(`After ${iterations} iterations the value on wire a is ${wireValues.get("a")}.`);
    }

    Part2(input: Instruction[]): void {
        let bInstruction = input.find(i => i.wire == "b")!;
        bInstruction.operation = "3176";

        this.Part1(input);
    }

    ResolveValue(input: string, values: Map<string, number>): [boolean, number] {
        let resolved = false;
        let value = 0;
        let tinput = input.trim();

        value = Number.parseInt(tinput)
        if (!Number.isNaN(value)) {
            resolved = true;
        }
        else if (values.has(tinput)) {
            value = values.get(tinput)!;
            resolved = true;
        }

        return [resolved, value];
    }

    ReadInput(file: string): Instruction[] {
        const data = fs.readFileSync(file, 'utf-8').trim();

        const lines = data.split(/[\r\n]+/);

        let Commands: Instruction[] = [];

        lines.forEach((line) => {
            let splitLine = line.split("->");
            let operation = splitLine[0].trim();
            let wire = splitLine[1].trim();

            let c: Instruction = {
                operation: operation,
                completed: false,
                wire: wire,
            };

            Commands.push(c);

        });

        return Commands;
    }
}

type Instruction = {
    operation: string;
    completed: boolean;
    wire: string;
};
