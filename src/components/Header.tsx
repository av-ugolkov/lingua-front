import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import refreshToken from './../scripts/middleware/auth';
import require from './../scripts/require';
import './Header.css';

export default function Header() {
  const [accountName, setAccountName] = useState('');
  function loadPage() {
    require('/current_language', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((error) => {
      console.error(error);
      //notification.value.ErrorNotification(error.message);
    });

    refreshToken(function (bearerToken, fingerprint) {
      if (bearerToken == null || fingerprint == null) {
        return;
      }
      require('/user/id', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Fingerprint: fingerprint,
          Authorization: bearerToken,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.code == 200) {
            setAccountName(data['data']['name']);
          } else {
            console.error(data['data']['msg']);
            //notification.value.ErrorNotification(data['data']['msg']);
          }
        })
        .catch((error) => {
          console.error(error);
          //notification.value.ErrorNotification(error.message);
        });
    });
  }

  useEffect(loadPage);

  return (
    <header>
      <nav className='navbar page_min_width'>
        <div className='left-side'>
          <a href='/'>
            <img
              src='/src/assets/icons/logo.png'
              alt='Lingua Evo logo'
              className='logo'
            />
            <span className='brand'>Lingua Evo</span>
          </a>
        </div>
        <div
          id='right-side'
          className='right-side'>
          <div className='border'>
            <Link
              to='/contact'
              className='panelBtn'>
              Contact
            </Link>
            |
            <Link
              to='/about'
              className='panelBtn'>
              About
            </Link>
          </div>
          {localStorage.getItem('access_token') == null ? (
            <div className='border'>
              <Link
                to='/signup'
                className='panelBtn'>
                Sign Up
              </Link>
              |
              <Link
                to='/signin'
                className='panelBtn'>
                Sign In
              </Link>
            </div>
          ) : (
            <div className='border'>
              <Link
                to='/vocabularies'
                className='panelBtn'>
                My vocabularies
              </Link>
              |
              <Link
                to='/account'
                className='panelBtn'>
                {accountName}
              </Link>
              |
              <Link
                to='/'
                onClick={() => {
                  logout();
                  //logout(() => navigate('/'));
                }}
                className='panelBtn'>
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

function logout() {
  const token = localStorage.getItem('access_token');
  if (token == null) {
    location.reload();
    return;
  }

  refreshToken(function (bearerToken, fingerprint) {
    if (bearerToken == null || fingerprint == null) {
      return;
    }
    require('/auth/sign_out', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Fingerprint: fingerprint,
        Authorization: bearerToken,
      },
    })
      .catch((error) => {
        console.error(error);
        //notification.value.ErrorNotification(error.message);
      })
      .finally(() => {
        localStorage.removeItem('access_token');
        location.reload();
      });
  });
}
