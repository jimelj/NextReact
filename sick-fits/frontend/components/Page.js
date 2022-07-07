import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children, cool }) {
  return (
    <div>
      <Header />
      <h2>I am the page component</h2>
      {children}
      <h1>{cool}</h1>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  cool: PropTypes.any,
};
