import React from "react";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { codeLanguage, formatData, statusTranslate } from "../utils";

describe("CodeLanguage function", () => {
  it('should return "---" when cod is undefined', () => {
    const { getByText } = render(<Text>{codeLanguage(undefined)}</Text>);
    expect(getByText("---")).toBeTruthy();
  });
  it("should return the correct language", () => {
    const code = "pt";
    const { getByText } = render(<Text>{codeLanguage(code)}</Text>);
    expect(getByText("Português")).toBeTruthy();
  });
});

describe("statusTranslate function", () => {
  it('should return "---" when cod is undefined', () => {
    const result = statusTranslate(undefined);
    expect(result).toBe("---");
  });
  it("should return the correct status", () => {
    const status = "Released";
    const result = statusTranslate(status);
    expect(result).toBe("Lançado");
  });
});

describe("formatData function", () => {
  it('should return "00 de Janeiro de 0000" when data is less than 10 characters', () => {
    const inputDate = "em breve"; // Adjust this to be a date with less than 10 characters
    const result = formatData(inputDate);
    expect(result).toBe("00 de Janeiro de 0000");
  });

  it("should format the date correctly", () => {
    const inputDate = "2023-01-05"; // Adjust this to a valid date string
    const result = formatData(inputDate);
    // Adjust this to the expected formatted date
    expect(result).toBe("05 de janeiro 2023");
  });

  it("should throw an error for an invalid date format", () => {
    const inputDate = "invalid-date-format"; // Adjust this to an invalid date string
    expect(() => formatData(inputDate)).toThrow("Invalid date format");
  });
});
