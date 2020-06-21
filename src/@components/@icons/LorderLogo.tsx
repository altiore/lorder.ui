import React from 'react';

import SvgIcon from '@material-ui/core/SvgIcon';

export default function LorderLogo(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 48 48">
      <title>Lorder</title>
      <defs>
        <linearGradient id="linear-gradient" x1="40.89" y1="16.25" x2="29.47" y2="27.67" gradientUnits="userSpaceOnUse">
          <stop offset="0.63" stopColor="#f1dd97" />
          <stop offset="1" stopColor="#cbad59" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="17.92"
          y1="30.08"
          x2="38.65"
          y2="-5.82"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f1dd97" />
          <stop offset="1" stopColor="#cbad59" />
        </linearGradient>
        <linearGradient id="linear-gradient-3" x1="34.9" y1="15.66" x2="28.4" y2="22.16" xlinkHref="#linear-gradient" />
        <linearGradient
          id="linear-gradient-4"
          x1="30.98"
          y1="16.81"
          x2="13.83"
          y2="33.96"
          xlinkHref="#linear-gradient"
        />
      </defs>
      <title>48x48</title>
      <path
        fill="url(#linear-gradient)"
        fillRule="evenodd"
        d="M43.3,21.6H28c-1.71,0-2-.54-1.83-1.44h0a15.27,15.27,0,0,0-1.3,5c.06,1.54,1.22,2,2.74,2.17h13Z"
      />
      <path
        fill="url(#linear-gradient-2)"
        fillRule="evenodd"
        d="M27.62,27.36H22.93c-3.17,0-3.83-2.33-3.11-5.06.94-3.54,4.61-10.16,6.22-13.68a10.35,10.35,0,0,0-3.85,0C27.43,5.53,35.89.07,35.89.07s-6.18,12-9.19,18.71a8.46,8.46,0,0,0-.52,1.38,15.33,15.33,0,0,0-1.3,5C24.94,26.73,26.1,27.16,27.62,27.36Z"
      />
      <path
        fill="#29292b"
        strokeMiterlimit={10}
        strokeWidth="0.25px"
        stroke="url(#linear-gradient-3)"
        d="M33.5,14.44a13.74,13.74,0,0,0-2.76-2.11c-1.13,2.26-2.25,4.53-3.27,6.77A7.74,7.74,0,0,0,27,20.34h0a.33.33,0,0,0,.27.41,4.67,4.67,0,0,0,.81.06h9.09a13.44,13.44,0,0,0-.68-2A13.77,13.77,0,0,0,33.5,14.44Z"
      />
      <path
        fill="#29292b"
        strokeMiterlimit={10}
        strokeWidth="0.25px"
        stroke="url(#linear-gradient-4)"
        d="M27.68,28.14H22.92a4.07,4.07,0,0,1-3.42-1.41c-.84-1.08-1-2.67-.5-4.61.58-2.59,2.61-6.5,4.41-10l.89-1.73h-.63a13.85,13.85,0,0,0-5.4,1.08A13.57,13.57,0,0,0,13.85,33.8a14,14,0,0,0,15.23,2.93,13.83,13.83,0,0,0,7.4-7.28c.18-.43.34-.87.48-1.31Z"
      />
    </SvgIcon>
  );
}
