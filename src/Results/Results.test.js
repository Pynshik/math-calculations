import { render } from '@testing-library/react'
import Results from './Results'

describe('Results', () => {
  let component

  it('renders component', () => {
    component = render(<Results results={['2 + 5 = 7']} />);

    expect(component.container.querySelector('.results')).toBeVisible();
    expect(component.queryByTestId('title')).toBeVisible();
    expect(component.queryByTestId('title')).toHaveTextContent('Results');
    expect(component.queryByTestId('result-value')).toHaveTextContent('2 + 5 = 7');
  })

  it('does not render component', () => {
    component = render(<Results results={[]} />);

    expect(component.container.querySelector('.results')).not.toBeInTheDocument();
    expect(component.queryByTestId('title')).not.toBeInTheDocument();
  })
})
