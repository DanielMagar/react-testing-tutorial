import { render, screen } from '@testing-library/react';
import App from './App';

test('react App components Snapshots', () => {
  render(<App />);
  const output = render(<App/>);
  expect (output).toMatchSnapshot();
});
