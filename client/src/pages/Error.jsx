import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import notFoundImg from '../assets/images/not-found.svg';

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFoundImg} alt='not found' />
          <h3>Page not found</h3>
          <p>we can&apos;t seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div>
        <h3>something went wrong</h3>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
