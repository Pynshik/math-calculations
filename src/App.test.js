import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  let component;

  beforeEach(() => {
    component = render(<App />);
  });

  it('renders component', () => {
    expect(component.asFragment()).toMatchSnapshot()
  })

  it("calculates sum of 3 and 5 equal to 8", () => {
    fireEvent.change(component.queryByTestId("firstValue"), { target: { value: 5 } });
    fireEvent.change(component.queryByTestId("secondValue"), { target: { value: 3 } });
    fireEvent.change(component.queryByTestId("select"), { target: { value: "+" } });

    expect(component.queryAllByTestId("select-option")[0].selected).toBeTruthy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeFalsy();

    fireEvent.click(component.queryByRole("button", { name: "Run" }));

    waitFor(() => {
        expect(screen.getByText(/Results table/i)).toBeInTheDocument()
        expect(component.queryByTestId("result-value")).toBeEqual("5 + 3 = 8")
    });
  });

  it("calculates division of 6 and 3 equal to 2", () => {
    fireEvent.change(component.queryByTestId("firstValue"), { target: { value: 6 } });
    fireEvent.change(component.queryByTestId("secondValue"), { target: { value: 3 } });
    fireEvent.change(component.queryByTestId("select"), { target: { value: "/" } });

    expect(component.queryAllByTestId("select-option")[0].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeTruthy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeFalsy();

    fireEvent.click(component.queryByRole("button", { name: "Run" }));

    waitFor(() => {
      expect(screen.getByText(/Results table/i)).toBeInTheDocument();
      expect(component.queryAllByTestId("result-value")[0]).toBeEqual("6 / 3 = 2");
    });
  });

  it("calculates remainder of the division of 10 and 3 equal to 1", () => {
    fireEvent.change(component.queryByTestId("firstValue"), { target: { value: 10 } });
    fireEvent.change(component.queryByTestId("secondValue"), { target: { value: 3 } });
    fireEvent.change(component.queryByTestId("select"), { target: { value: "%" } });

    expect(component.queryAllByTestId("select-option")[0].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeTruthy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeFalsy();

    fireEvent.click(component.queryByRole("button", { name: "Run" }));

    waitFor(() => {
      expect(screen.getByText(/Results table/i)).toBeInTheDocument();
      expect(component.queryAllByTestId("result-value")[0]).toBeEqual("10 % 3 = 1");
    });
  });

  it("calculates the largest of 10 and 3 equal to 10", () => {
    fireEvent.change(component.queryByTestId("firstValue"), { target: { value: 10 } });
    fireEvent.change(component.queryByTestId("secondValue"), { target: { value: 3 } });
    fireEvent.change(component.queryByTestId("select"), { target: { value: ">" } });

    expect(component.queryAllByTestId("select-option")[0].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeTruthy();

    fireEvent.click(component.queryByRole("button", { name: "Run" }));

    waitFor(() => {
      expect(screen.getByText(/Results table/i)).toBeInTheDocument();
      expect(component.queryAllByTestId("result-value")[0]).toBeEqual("the larger of 10 and 3 is 10");
    });
  });
});
