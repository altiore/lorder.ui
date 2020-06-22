import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function LorderLogo(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 48 48">
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="40.89"
          y1="33.73"
          x2="29.44"
          y2="22.28"
          gradientTransform="matrix(1, 0, 0, -1, 0, 50)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.63" stopColor="#f1dd97" />
          <stop offset="1" stopColor="#cbad59" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="17.92"
          y1="19.92"
          x2="38.65"
          y2="55.82"
          gradientTransform="matrix(1, 0, 0, -1, 0, 50)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f1dd97" />
          <stop offset="1" stopColor="#cbad59" />
        </linearGradient>
        <linearGradient id="linear-gradient-3" x1="34.9" y1="34.34" x2="28.4" y2="27.84" xlinkHref="#linear-gradient" />
        <linearGradient
          id="linear-gradient-4"
          x1="30.96"
          y1="33.21"
          x2="13.81"
          y2="16.06"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <title>Lorder Logo</title>
      <path
        fill="url(#linear-gradient)"
        d="M43.3,21.62H28c-1.71,0-2-.54-1.83-1.44h0a15.56,15.56,0,0,0-1.37,5c.06,1.54,1.21,2.06,2.81,2.17h13Z"
      />
      <path
        fill="url(#linear-gradient-2)"
        d="M27.62,27.36H22.93c-3.17,0-3.83-2.33-3.11-5.06.94-3.54,4.61-10.16,6.22-13.68a10.38,10.38,0,0,0-3.85,0C27.43,5.53,35.89.07,35.89.07s-6.18,12-9.19,18.71a35,35,0,0,0-1.82,6.38C24.94,26.73,26.1,27.16,27.62,27.36Z"
      />
      <path
        fill="#29292b"
        stroke="url(#linear-gradient-3)"
        strokeMiterlimit={10}
        strokeWidth="0.25px"
        d="M33.5,14.44a13.47,13.47,0,0,0-2.76-2.11c-1.13,2.26-3.62,7.58-3.74,8h0a.32.32,0,0,0,.24.4h0c.27,0,9.9.06,9.9.06a13.09,13.09,0,0,0-.68-2A13.66,13.66,0,0,0,33.5,14.44Z"
      />
      <path
        fill="#29292b"
        stroke="url(#linear-gradient-4)"
        strokeMiterlimit={10}
        strokeWidth="0.25px"
        d="M22.92,28.14a4.17,4.17,0,0,1-3.42-1.41c-.84-1.08-1-2.67-.5-4.61.58-2.59,2.61-6.5,4.41-10l.89-1.73h-.63a13.74,13.74,0,0,0-5.4,1.08A13.57,13.57,0,0,0,13.85,33.8a14,14,0,0,0,15.23,2.93,13.8,13.8,0,0,0,7.4-7.28c.18-.43.34-.87.48-1.31Z"
      />
    </SvgIcon>
  );
}
