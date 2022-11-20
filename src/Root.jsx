import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Static assets
// import VerticalLogo from '@assets/static/vertical-logo.svg';

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate('login'), 2000);
  }, []);

  return (
    <main className={'flex items-center justify-center h-screen'}>
      <img
        src={'https://taily.b-cdn.net/taily-vertical-logo.svg'}
        width={181}
        height={241}
        alt="Taily vertical logo"
        decoding={'sync'}
        loading={'eager'}
      />
    </main>
  );
}

export default Root;
