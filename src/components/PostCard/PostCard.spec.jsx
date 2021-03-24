import { render, screen } from '@testing-library/react';
import { Postcard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard>', () => {
  it('should render PostCard correctly', () => {
    render(<Postcard {...props} />);
    expect(screen.getByRole('img', { name: /title 1/i })).toHaveAttribute('src', 'img/img.png');
    expect(screen.getByRole('heading', { name: /title 1 1/i })).toBeInTheDocument();
    expect(screen.getByText('body 1')).toBeInTheDocument();
  });
  it('should match snapshot', () => {
    const { container } = render(<Postcard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
