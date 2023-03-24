import Spinner from 'react-bootstrap/Spinner';

function PyboLodingBar() {
  return (
    <Spinner animation="border" role="status">
      <span>Loading...</span>
    </Spinner>
  );
}

export default PyboLodingBar;