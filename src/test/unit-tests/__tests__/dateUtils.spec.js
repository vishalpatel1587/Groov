import { formatDate } from "../../../utils/dateUtils";

describe("formatDate", () => {

  it("should return an empty string when passed a null value", () => {
    const formattedDate = formatDate(null);

    expect(formattedDate).toEqual("");
  });

  it("should return a formatted string when passed a date value", () => {
    const date = new Date(2022, 11, 25);
    const secondDate = new Date(2024, 1, 29);

    const formattedDate = formatDate(date);
    const secondFormattedDate = formatDate(secondDate);

    expect(formattedDate).toEqual("25 Dec 2022");
    expect(secondFormattedDate).toEqual("29 Feb 2024");
  });
});
