import React from "react";
import { render } from "@testing-library/react-native";
import Watch from "../index";

describe("Watch", () => {
  it("render is correct", () => {
    const data = {
      logo_path:
        "https://callstack.github.io/react-native-testing-library/img/owl.png",
      provider_id: 123,
      provider_name: "provider name",
      display_priority: 1,
    };
    const { debug, getByTestId } = render(<Watch data={data} />);
    debug();
    expect(getByTestId("watch-image")).toBeTruthy();
  });
});
