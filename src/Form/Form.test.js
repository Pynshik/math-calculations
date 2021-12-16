import Form from './Form'
import {fireEvent, render} from '@testing-library/react'

describe('Form', () => {
  let component
  const handleMockClick = jest.fn()

  beforeEach(() => {
    component = render(<Form changeResults={handleMockClick} />)
  })

  it('clears form after clicking on the Run button', () => {
    fireEvent.change(component.queryByTestId("firstValue"), { target: { value: 5 } });
    fireEvent.change(component.queryByTestId("secondValue"), { target: { value: 3 } });
    fireEvent.change(component.queryByTestId("select"), { target: { value: "%" } });

    expect(component.queryAllByTestId("select-option")[0].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeTruthy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeFalsy();

    fireEvent.click(component.queryByRole("button", { name: "Run" }));

    expect(handleMockClick).toHaveBeenCalledTimes(1)

    expect(component.queryAllByTestId("select-option")[0].selected).toBeTruthy();
    expect(component.queryAllByTestId("select-option")[1].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[2].selected).toBeFalsy();
    expect(component.queryAllByTestId("select-option")[3].selected).toBeFalsy();

    expect(component.queryByTestId("firstValue").value).toEqual('');
    expect(component.queryByTestId("secondValue").value).toEqual('');
  })
})