import React, { useEffect, useMemo, useRef } from 'react';

export interface IClockHands {
  slowTimeSpeed: number;
}

const CENTER = {
  x: 250,
  y: 240,
};

interface TTime {
  hours: number;
  seconds: number;
  minutes: number;
}

export const ClockHands: React.FC<IClockHands> = ({ slowTimeSpeed }) => {
  const hourRef = useRef<any>(null);
  const minuteRef = useRef<any>(null);
  const secondRef = useRef<any>(null);

  useEffect(() => {
    if (slowTimeSpeed) {
      if (hourRef && hourRef.current) {
        hourRef.current.beginElement();
      }
      if (minuteRef && minuteRef.current) {
        minuteRef.current.beginElement();
      }
      if (secondRef && secondRef.current) {
        secondRef.current.beginElement();
      }
    }
  }, [slowTimeSpeed]);

  const duration = useMemo(() => {
    return slowTimeSpeed
      ? {
          hours: '43200s',
          minutes: '3600s',
          seconds: '60s',
        }
      : {
          hours: '72s',
          minutes: '6s',
          seconds: '0.5s',
        };
  }, [slowTimeSpeed]);

  const time = useMemo<TTime>(() => {
    const date = slowTimeSpeed ? new Date() : new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const minutesTr = 60 * minutes + seconds;
    const hoursTr = 3600 * (hours > 12 ? hours - 12 : hours) + minutesTr;
    return {
      hours: hoursTr,
      minutes: minutesTr,
      seconds,
    };
    // NOTE: must be related on slowTimeSpeed value due to restart animation work
  }, [slowTimeSpeed]);

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
        transform={`rotate(${360 * (time.hours / 43200)},${CENTER.x},${CENTER.y})`}
        x1={CENTER.x}
        y1={CENTER.y}
        x2={CENTER.x}
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
        transform={`rotate(${360 * (time.minutes / 3600)}, ${CENTER.x},${CENTER.y})`}
        x1={CENTER.x}
        y1={CENTER.y}
        x2={CENTER.x}
        y2="130"
      />
      <g
        className="iconic-clock-second-hand"
        id="iconic-anim-clock-second-hand"
        transform={`rotate(${360 * (time.seconds / 60)},${CENTER.x},${CENTER.y})`}
      >
        <line
          className="iconic-clock-second-hand-arm"
          fill="none"
          stroke="#FFB200"
          strokeLinecap="round"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1={CENTER.x}
          y1={CENTER.y}
          x2={CENTER.x}
          y2="100"
        />
        <radialGradient id="centerGradient">
          <stop offset="20%" stopColor="#F9EDAD" />
          <stop offset="85%" stopColor="#D1BF73" />
        </radialGradient>
        <circle
          className="iconic-clock-second-hand-axis"
          fill="url(#centerGradient)"
          cx={CENTER.x}
          cy={CENTER.y}
          r="6"
        />
      </g>

      <defs>
        <animateTransform
          ref={hourRef}
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-hour-hand"
          repeatCount="indefinite"
          dur={duration.hours}
          to={`360 ${CENTER.x} ${CENTER.y}`}
          from={`0 ${CENTER.x} ${CENTER.y}`}
          attributeName="transform"
          attributeType="xml"
        />

        <animateTransform
          ref={minuteRef}
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-minute-hand"
          repeatCount="indefinite"
          dur={duration.minutes}
          to={`360 ${CENTER.x} ${CENTER.y}`}
          from={`0 ${CENTER.x} ${CENTER.y}`}
          attributeName="transform"
          attributeType="xml"
        />

        <animateTransform
          ref={secondRef}
          type="rotate"
          fill="remove"
          restart="always"
          calcMode="linear"
          accumulate="none"
          additive="sum"
          xlinkHref="#iconic-anim-clock-second-hand"
          repeatCount="indefinite"
          dur={duration.seconds}
          to={`360 ${CENTER.x} ${CENTER.y}`}
          from={`0 ${CENTER.x} ${CENTER.y}`}
          attributeName="transform"
          attributeType="xml"
        />
      </defs>
    </>
  );
};
