import {formatTime} from "../../src/readtest/utils.js";

describe("formatTime", function() {

    it("should correctly format time", function() {
        const cases = [
            [1000, "0:01"],
            [600, "0:00"],
            [0, "0:00"],
            [60000.3243, "1:00"]
        ];
        cases.forEach(([t, f]) => 
            expect(formatTime(t)).toEqual(f));
    });

    it("should throw on illegal argument", function() {
        expect(() => formatTime(-1000))
            .toThrowError("Illegal argument: ms has to be greater or equal to 0.");
        expect(() => formatTime("abc"))
            .toThrowError("Illegal argument: ms has to be a number.");
    });
});