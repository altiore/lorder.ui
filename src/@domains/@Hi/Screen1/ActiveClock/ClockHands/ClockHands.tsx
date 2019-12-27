import React from 'react';

export interface IClockHands {
  crazy?: boolean;
}

export const ClockHands: React.FC<IClockHands> = ({ crazy = false }) => {
  const center = {
    x: 250,
    y: 240,
  };

  const duration = crazy
    ? {
        hours: '72s',
        minutes: '6s',
        seconds: '0.5s',
      }
    : {
        hours: '43200s',
        minutes: '3600s',
        seconds: '60s',
      };

  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const minutesTr = 60 * minutes + seconds;
  const hoursTr = 3600 * (hours > 12 ? hours - 12 : hours) + minutesTr;

  return (
    <>
      <linearGradient
        id="hourHandGradient"
        gradientUnits="userSpaceOnUse"
        x1="160.9972"
        y1="243.5813"
        x2="272.3004"
        y2="243.5813"
        gradientTransform="matrix(1 0 0 -1 0 502)"
      >
        <stop offset="0" style={{ stopColor: '#D1BF73' }} />
        <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
        <stop offset="1" style={{ stopColor: '#BFA759' }} />
      </linearGradient>
      <line
        className="iconic-clock-hour-hand"
        id="iconic-anim-clock-hour-hand"
        fill="none"
        stroke="url(#hourHandGradient)"
        strokeLinecap="round"
        strokeWidth="5"
        strokeMiterlimit="10"
        transform={`rotate(${360 * (hoursTr / 43200)},${center.x},${center.y})`}
        x1={center.x}
        y1={center.y}
        x2={center.x}
        y2="167.5"
      />

      <linearGradient
        id="minuteHandGradient"
        gradientUnits="userSpaceOnUse"
        x1="195.0165"
        y1="290.2657"
        x2="266.4018"
        y2="290.2657"
        gradientTransform="matrix(1 0 0 -1 0 502)"
      >
        <stop offset="0" style={{ stopColor: '#D1BF73' }} />
        <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
        <stop offset="1" style={{ stopColor: '#BFA759' }} />
      </linearGradient>
      <line
        className="iconic-clock-minute-hand"
        id="iconic-anim-clock-minute-hand"
        fill="none"
        stroke="url(#minuteHandGradient)"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        transform={`rotate(${360 * (minutesTr / 3600)},${center.x},${center.y})`}
        x1={center.x}
        y1={center.y}
        x2={center.x}
        y2="130"
      />
      <g
        className="iconic-clock-second-hand"
        id="iconic-anim-clock-second-hand"
        transform={`rotate(${360 * (seconds / 60)},${center.x},${center.y})`}
      >
        <line
          className="iconic-clock-second-hand-arm"
          fill="none"
          stroke="#FFB200"
          strokeLinecap="round"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1={center.x}
          y1={center.y}
          x2={center.x}
          y2="100"
        />
        <radialGradient id="centerGradient">
          <stop offset="20%" stopColor="#F9EDAD" />
          <stop offset="85%" stopColor="#D1BF73" />
        </radialGradient>
        <circle
          className="iconic-clock-second-hand-axis"
          fill="url(#centerGradient)"
          cx={center.x}
          cy={center.y}
          r="6"
        />
      </g>

      <defs>
        <animateTransform
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-hour-hand"
          repeatCount="indefinite"
          dur={duration.hours}
          to={`360 ${center.x} ${center.y}`}
          from={`0 ${center.x} ${center.y}`}
          attributeName="transform"
          attributeType="xml"
        />

        <animateTransform
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-minute-hand"
          repeatCount="indefinite"
          dur={duration.minutes}
          to={`360 ${center.x} ${center.y}`}
          from={`0 ${center.x} ${center.y}`}
          attributeName="transform"
          attributeType="xml"
        />

        <animateTransform
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-second-hand"
          repeatCount="indefinite"
          dur={duration.seconds}
          to={`360 ${center.x} ${center.y}`}
          from={`0 ${center.x} ${center.y}`}
          attributeName="transform"
          attributeType="xml"
        />
      </defs>
    </>
  );
};
