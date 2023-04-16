import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CardCast, { arePropsEqualCardCast } from "../index";
import { ThemeProvider } from "styled-components/native";
import { dark } from "../../../theme/dark";
import { CrewProps } from "../../../interfaces";

describe("CardCast", () => {
  const mockCrewProps: CrewProps = {
    id: 1,
    name: "John Doe",
    profile_path: "/path/to/image.jpg",
    character: "Some Character",
    job: "Director",
    adult: false,
    gender: 1,
    known_for_department: "known for department",
    original_name: "original name",
    popularity: 4,
    cast_id: 56,
    order: 6,
    department: "department",
    credit_id: "credit id",
  };
  it("renders correctly with given props", () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardCast
          data={mockCrewProps}
          deviceType="phone"
          onPress={(id) => {}}
        />
      </ThemeProvider>
    );
    expect(getByText(mockCrewProps.name)).not.toBeNull();
    expect(getByText(/Director/i)).toBeTruthy();
    expect(getByText(mockCrewProps.job)).not.toBeNull();
    expect(getByTestId("profile_path")).not.toBeNull();
  });

  it("calls onPress prop function when clicked", () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={dark}>
        <CardCast
          data={mockCrewProps}
          deviceType="phone"
          onPress={onPressMock}
        />
      </ThemeProvider>
    );
    fireEvent.press(getByTestId("profile_path"));
    expect(onPressMock).toHaveBeenCalledWith(mockCrewProps.id);
  });
  it("arePropsEqual returns true for identical props and false for non-identical props", () => {
    const props1 = {
      data: mockCrewProps,
      deviceType: "phone",
      onPress: jest.fn(),
    };
    const props2 = {
      data: mockCrewProps,
      deviceType: "phone",
      onPress: jest.fn(),
    };
    const props3 = {
      data: { ...mockCrewProps, id: 2 },
      deviceType: "phone",
      onPress: jest.fn(),
    };
    expect(arePropsEqualCardCast(props1, props2)).toBe(true);
    expect(arePropsEqualCardCast(props1, props3)).toBe(false);
  });

  it("renders correctly with given props when job is null", () => {
    //@ts-ignore
    mockCrewProps.job = null;
    const { getByText } = render(
      <ThemeProvider theme={dark}>
        <CardCast
          data={mockCrewProps}
          deviceType="phone"
          onPress={(id) => {}}
        />
      </ThemeProvider>
    );
    expect(getByText(mockCrewProps.name)).not.toBeNull();
    expect(getByText(mockCrewProps.character)).not.toBeNull();
  });
});
