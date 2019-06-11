import {countWords, computeWpm} from "../../src/readtest/textanalysis.js";

describe("countWords", function() {    

    it("should correctly count words", function() {       
        const cases = [
            ["", 0],
            [" ", 0],
            ["   \r\n", 0],
            ["!@#$%^&*()<>:'.,/[]{}-=_+|", 0],
            ["Hi", 1],
            ["Hello world!", 2],
            ["well-intentioned", 2],
            ["W Strzebrzeszynie chrząszcz brzmi w trzcinie.", 6],
            ["13 -224 1995 20,5 20.5", 7], // , and . are regarded as word separators.
        ];
        cases.forEach(([text, count], idx) =>
            expect(countWords(text)).toEqual(count, "case idx: " + idx));
    });
});

describe("computeWpm", function() {
    
    it("should correctly compute wpm", function() {
        const cases = [
            [200, 30000, 400],
            [200, 60000, 200],
            [200, 120000, 100],
            [200, 160000, 75]
        ];
        cases.forEach(([wc, ts, wpm]) => 
            expect(computeWpm(wc, ts)).toEqual(wpm));
    });

    it("should throw on illegal argument type", function() {
        expect(() => computeWpm("", 10))
            .toThrowError("Illegal argument: wordsCount has to be a number.");
        expect(() => computeWpm(10, ""))
            .toThrowError("Illegal argument: timespan has to be a number.");
    });

    it("should throw if a wordCount is negative", function() {
        expect(() => computeWpm(-1, 10))
            .toThrowError();
    });

    it("should throw if a timespan is less than or equal to 0", function() {
        expect(() => computeWpm(5, 0))
            .toThrowError();
    });
});