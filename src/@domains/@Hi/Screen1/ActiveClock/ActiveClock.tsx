import React from 'react';

import { useStyles } from './styles';
import ActivityG from './ActivityG';
import ClockHands from './ClockHands';
import PeopleG from './PeopleG';
import ProjectsG from './ProjectsG';

interface IActiveClockIcon {
  slowTimeSpeed: number;
  donePercent?: number;
}

const ActiveClockIcon: React.FC<IActiveClockIcon> = ({ donePercent = 12, slowTimeSpeed }) => {
  const classes = useStyles();

  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 500 500"
      style={{ enableBackground: 'new 0 0 500 500' } as any}
      xmlSpace="preserve"
    >
      <title>Altiore Clock</title>
      <g>
        <linearGradient
          id="SVGID_1_"
          gradientUnits="userSpaceOnUse"
          x1="185.97"
          y1="262.07"
          x2="313.39"
          y2="262.07"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st0}
          d="M249.7,303.6c-35.2,0-63.7-28.5-63.7-63.7s28.5-63.7,63.7-63.7s63.7,28.5,63.7,63.7v0
		C313.4,275.1,284.9,303.6,249.7,303.6z M249.7,177.4c-34.5,0-62.5,28-62.5,62.5s28,62.5,62.5,62.5c34.5,0,62.5-28,62.5-62.5
		C312.2,205.4,284.2,177.4,249.7,177.4L249.7,177.4z"
        />
        <g>
          <linearGradient
            id="SVGID_2_"
            gradientUnits="userSpaceOnUse"
            x1="199"
            y1="424.71"
            x2="245.89"
            y2="424.71"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st1}
            d="M199,62.3l9.3,36.1c12.3-3.2,24.9-4.8,37.6-4.9V56.2C230.1,56.3,214.3,58.4,199,62.3z"
          />

          <linearGradient
            id="SVGID_3_"
            gradientUnits="userSpaceOnUse"
            x1="147.54"
            y1="412.33"
            x2="204.79"
            y2="412.33"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st2}
            d="M147.5,83.9l18.8,32.2c12-7.3,25-12.9,38.5-16.7l-9.3-36.1C178.7,67.9,162.5,74.9,147.5,83.9z"
          />

          <linearGradient
            id="SVGID_4_"
            gradientUnits="userSpaceOnUse"
            x1="107.11"
            y1="387.865"
            x2="163.27"
            y2="387.865"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st3}
            d="M107.1,116.2l26.4,26.3c8.9-9.3,18.9-17.6,29.8-24.5l-18.8-32.2C130.8,94.3,118.3,104.5,107.1,116.2z"
          />
        </g>

        <linearGradient
          id="SVGID_5_"
          gradientUnits="userSpaceOnUse"
          x1="205.12"
          y1="262.0921"
          x2="294.3293"
          y2="262.0921"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st4}
          d="M292.5,252.4c0-0.2,0.1-0.3,0.1-0.5c0.1-0.5,0.3-1,0.4-1.5c0-0.2,0.1-0.3,0.1-0.5l0,0c5.6-24-9.4-48-33.4-53.5
		c-3.3-0.8-6.7-1.2-10.1-1.1h-0.6l0,0c-24.3,0-44,19.7-44,44l0,0c0,0.2,0,0.4,0,0.6c0,24.6,20,44.6,44.6,44.6
		c19.1,0,36-12.1,42.2-30.1v-0.1C292.1,253.7,292.3,253,292.5,252.4z M206.3,239.9c0-0.2,0-0.4,0-0.6h4.2
		c0-21.3,17.3-38.5,38.5-38.5v-4.2h0.6c23.9,0,43.3,19.4,43.3,43.3c0,3.3-0.4,6.6-1.1,9.8l-4.2-1c-5,21-26,34-47,29.2l-1,4.2
		C220.2,277.4,206.4,260,206.3,239.9L206.3,239.9z"
        />

        <linearGradient
          id="SVGID_6_"
          gradientUnits="userSpaceOnUse"
          x1="286.6638"
          y1="162.0665"
          x2="424.3255"
          y2="162.0665"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st5}
          d="M287,329.4l37.8,78.2C370.4,386.2,406,348,424,300.9l-82.1-28.6C331.5,297.6,311.9,318,287,329.4z"
        />

        <linearGradient
          id="SVGID_7_"
          gradientUnits="userSpaceOnUse"
          x1="79.8413"
          y1="251.375"
          x2="140.84"
          y2="251.375"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st6}
          d="M113.7,144.3c0.4-0.5,0.8-1,1.2-1.5l-1.6-1.2c-0.4,0.5-0.8,1-1.2,1.5C60,210.4,72.3,307.5,139.6,359.6l1.2-1.6
		C74.4,306.6,62.2,210.8,113.7,144.3z"
        />
        <g>
          <linearGradient
            id="SVGID_8_"
            gradientUnits="userSpaceOnUse"
            x1="377.03"
            y1="421.96"
            x2="445.77"
            y2="421.96"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st7}
            d="M411.4,114.4c-19,0-34.4-15.4-34.4-34.4s15.4-34.4,34.4-34.4c19,0,34.4,15.4,34.4,34.4c0,0,0,0,0,0
			C445.7,99,430.4,114.4,411.4,114.4z M411.4,48.4c-17.5,0-31.7,14.1-31.7,31.6s14.1,31.7,31.6,31.7S443,97.6,443,80.1c0,0,0,0,0,0
			C443,62.6,428.9,48.4,411.4,48.4z"
          />

          <linearGradient
            id="SVGID_9_"
            gradientUnits="userSpaceOnUse"
            x1="385.31"
            y1="421.96"
            x2="437.49"
            y2="421.96"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st8}
            d="M411.4,106.1c-14.4,0-26.1-11.7-26.1-26.1s11.7-26.1,26.1-26.1s26.1,11.7,26.1,26.1c0,0,0,0,0,0
			C437.5,94.5,425.8,106.1,411.4,106.1z M411.4,60.4c-10.9,0-19.7,8.8-19.7,19.7s8.8,19.7,19.7,19.7s19.7-8.8,19.7-19.7
			C431.1,69.2,422.3,60.4,411.4,60.4z"
          />

          <linearGradient
            id="SVGID_10_"
            gradientUnits="userSpaceOnUse"
            x1="398.36"
            y1="448.04"
            x2="398.36"
            y2="421.95"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st9}
            d="M411.4,60.4V54c-14.4,0-26.1,11.7-26.1,26.1h6.4C391.7,69.2,400.5,60.4,411.4,60.4
			C411.4,60.4,411.4,60.4,411.4,60.4z"
          />

          <linearGradient
            id="SVGID_11_"
            gradientUnits="userSpaceOnUse"
            x1="411.4001"
            y1="435.675"
            x2="441.2"
            y2="435.675"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st10}
            d="M439.9,80.5c0,0.5,0,1-0.1,1.5h1.3c0-0.5,0.1-1,0.1-1.5c0-16.4-13.4-29.8-29.8-29.8V52
			C427.1,52,439.9,64.8,439.9,80.5z"
          />
        </g>

        <linearGradient
          id="SVGID_12_"
          gradientUnits="userSpaceOnUse"
          x1="76.004"
          y1="263.5749"
          x2="322.5963"
          y2="263.5749"
          gradientTransform="matrix(0.9003 -0.4352 -0.4352 -0.9003 187.082 552.1785)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st11}
          d="M206.4,113.6l5.2,15c-4.7,1.6-9.3,3.4-13.8,5.6c-57.5,27.8-81.6,97-53.8,154.5
		c26.1,54.1,89.3,79.2,145.5,57.7l-0.4-0.8c-59.2,22.6-125.5-7.1-148.1-66.3s7.1-125.5,66.3-148.1c55.3-21.1,117.5,3.3,143.8,56.3
		c1.7,3.6,3.2,7.3,4.5,11.1l0.2-0.1c9,24.3,9.5,51,1.4,75.6l0.9,0.3c8.2-24.8,7.7-51.7-1.4-76.2l14.2-4.9
		C347.5,125.9,273.7,90.2,206.4,113.6z M305.1,137.7l0.2,0.1L305.1,137.7z"
        />

        <linearGradient
          id="SVGID_13_"
          gradientUnits="userSpaceOnUse"
          x1="239.22"
          y1="262.06"
          x2="260.14"
          y2="262.06"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st12}
          d="M259.9,239.9c0,5.6-4.6,10.2-10.2,10.2c-5.6,0-10.2-4.6-10.2-10.2c0-5.6,4.6-10.2,10.2-10.2c0,0,0,0,0,0
		C255.3,229.7,259.9,234.3,259.9,239.9z"
        />

        <linearGradient
          id="SVGID_14_"
          gradientUnits="userSpaceOnUse"
          x1="170.37"
          y1="107.17"
          x2="237.43"
          y2="107.17"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st13}
          d="M203.9,428.4c-18.5,0-33.5-15-33.5-33.5s15-33.5,33.5-33.5s33.5,15,33.5,33.5l0,0
		C237.4,413.3,222.4,428.3,203.9,428.4z M203.9,364c-17,0-30.9,13.8-30.9,30.9c0,17,13.8,30.9,30.9,30.9s30.9-13.8,30.9-30.9
		c0,0,0,0,0,0C234.7,377.8,220.9,364,203.9,364L203.9,364z"
        />
        <g>
          <linearGradient
            id="SVGID_15_"
            gradientUnits="userSpaceOnUse"
            x1="58.04"
            y1="98.17"
            x2="107.1"
            y2="98.17"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st14}
            d="M82.6,428.4c-13.5,0-24.5-11-24.5-24.5s11-24.5,24.5-24.5s24.5,11,24.5,24.5l0,0
			C107.1,417.4,96.1,428.3,82.6,428.4z M82.6,381.2c-12.5,0-22.6,10.1-22.6,22.6c0,12.5,10.1,22.6,22.6,22.6s22.6-10.1,22.6-22.6
			l0,0C105.1,391.4,95,381.3,82.6,381.2z"
          />

          <linearGradient
            id="SVGID_16_"
            gradientUnits="userSpaceOnUse"
            x1="63.947"
            y1="98.1722"
            x2="100.67"
            y2="98.1722"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st15}
            d="M78.2,385.7c-10,2.4-16.2,12.5-13.7,22.5c2.4,10,12.5,16.2,22.5,13.7l0,0l-1.1-4.5
			c-7.5,1.8-15.1-2.8-16.9-10.4c-1.8-7.5,2.8-15.1,10.4-16.9c7.5-1.8,15,2.8,16.9,10.3l4.5-1.1C98.3,389.5,88.2,383.3,78.2,385.7z
			 M80.5,388c-9.2,1.6-15.3,10.4-13.7,19.6l-0.8,0.1c-1.7-9.6,4.7-18.8,14.3-20.5c0.3,0,0.6-0.1,0.9-0.1l0.1,0.8
			C81.1,387.9,80.8,387.9,80.5,388L80.5,388z"
          />
        </g>

        <linearGradient
          id="SVGID_17_"
          gradientUnits="userSpaceOnUse"
          x1="302.13"
          y1="441.6633"
          x2="379.9748"
          y2="441.6633"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <polyline className={classes.st16} points="379.8,67.1 370.5,53.7 202,53.7 	" />

        <linearGradient
          id="SVGID_18_"
          gradientUnits="userSpaceOnUse"
          x1="106.8952"
          y1="109.3733"
          x2="161.67"
          y2="109.3733"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <polyline className={classes.st17} points="107.1,399.3 116.4,386 165.7,386 	" />
        <g>
          <linearGradient
            id="SVGID_19_"
            gradientUnits="userSpaceOnUse"
            x1="122.14"
            y1="82.0217"
            x2="176.9148"
            y2="82.0217"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polyline className={classes.st18} points="176.7,413.3 167.4,426.6 106.1,426.6 		" />
        </g>

        <linearGradient
          id="SVGID_20_"
          gradientUnits="userSpaceOnUse"
          x1="176.37"
          y1="120.9298"
          x2="231.43"
          y2="120.9298"
          gradientTransform="matrix(1 0 0 -1 0 502)"
        >
          <stop offset="0" style={{ stopColor: '#D1BF73' }} />
          <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
          <stop offset="1" style={{ stopColor: '#BFA759' }} />
        </linearGradient>
        <path
          className={classes.st19}
          d="M178.6,394.8L178.6,394.8c0-14,11.4-25.3,25.4-25.3c14,0,25.3,11.3,25.3,25.3h2.2c0-15.2-12.3-27.5-27.5-27.5
		c-15.2,0-27.5,12.3-27.5,27.5H178.6z"
        />
        <g>
          <linearGradient
            id="SVGID_21_"
            gradientUnits="userSpaceOnUse"
            x1="379.64"
            y1="199.685"
            x2="389.22"
            y2="199.685"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st20}
            d="M381.9,298.1l7.3,3.2c-0.8,1.7-1.6,3.5-2.4,5.2l-7.2-3.5C380.4,301.4,381.2,299.8,381.9,298.1z"
          />

          <linearGradient
            id="SVGID_22_"
            gradientUnits="userSpaceOnUse"
            x1="383.97"
            y1="209.9"
            x2="393.41"
            y2="209.9"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st21}
            d="M385.9,288.1l7.5,2.7c-0.6,1.8-1.3,3.6-2,5.3l-7.4-2.9C384.6,291.5,385.3,289.8,385.9,288.1z"
          />

          <linearGradient
            id="SVGID_23_"
            gradientUnits="userSpaceOnUse"
            x1="362.38"
            y1="171.36"
            x2="372.1"
            y2="171.36"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st22}
            d="M365.7,326l6.4,4.8c-1.1,1.5-2.3,3-3.5,4.5l-6.2-5C363.5,328.9,364.6,327.5,365.7,326z"
          />

          <linearGradient
            id="SVGID_24_"
            gradientUnits="userSpaceOnUse"
            x1="387.56"
            y1="220.42"
            x2="396.79"
            y2="220.42"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st23}
            d="M389.1,277.8l7.7,2.1c-0.5,1.8-1,3.6-1.6,5.5l-7.6-2.4C388.1,281.3,388.6,279.5,389.1,277.8z"
          />

          <linearGradient
            id="SVGID_25_"
            gradientUnits="userSpaceOnUse"
            x1="368.81"
            y1="180.365"
            x2="378.54"
            y2="180.365"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st24}
            d="M371.8,317.1l6.8,4.3c-1,1.6-2.1,3.2-3.1,4.8l-6.6-4.5C369.8,320.1,370.8,318.6,371.8,317.1z"
          />

          <linearGradient
            id="SVGID_26_"
            gradientUnits="userSpaceOnUse"
            x1="374.57"
            y1="189.81"
            x2="384.26"
            y2="189.81"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st25}
            d="M377.2,307.8l7.1,3.8c-0.9,1.6-1.8,3.3-2.8,5l-6.9-4C375.5,311,376.4,309.4,377.2,307.8z"
          />

          <linearGradient
            id="SVGID_27_"
            gradientUnits="userSpaceOnUse"
            x1="393.63"
            y1="253.15"
            x2="401.94"
            y2="253.15"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st26}
            d="M393.9,245.9l8,0.3c-0.1,1.9-0.2,3.8-0.3,5.7l-8-0.6C393.8,249.5,393.9,247.6,393.9,245.9z"
          />

          <linearGradient
            id="SVGID_28_"
            gradientUnits="userSpaceOnUse"
            x1="390.38"
            y1="231.175"
            x2="399.35"
            y2="231.175"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st27}
            d="M391.5,267.3l7.9,1.5c-0.4,1.9-0.8,3.7-1.2,5.6l-7.8-1.8C390.8,270.8,391.1,269,391.5,267.3z"
          />

          <linearGradient
            id="SVGID_29_"
            gradientUnits="userSpaceOnUse"
            x1="394.06"
            y1="261.75"
            x2="402.06"
            y2="261.75"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <rect x="394.1" y="240" className={classes.st28} width="8" height="0.4" />

          <linearGradient
            id="SVGID_30_"
            gradientUnits="userSpaceOnUse"
            x1="355.32"
            y1="162.835"
            x2="364.98"
            y2="162.835"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st29}
            d="M358.9,334.4l6,5.2c-1.2,1.4-2.5,2.9-3.8,4.2l-5.9-5.5C356.5,337.1,357.8,335.8,358.9,334.4z"
          />

          <linearGradient
            id="SVGID_31_"
            gradientUnits="userSpaceOnUse"
            x1="392.41"
            y1="242.105"
            x2="401.07"
            y2="242.105"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st30}
            d="M393.1,256.6l8,0.9c-0.2,1.9-0.5,3.8-0.8,5.6l-7.9-1.2C392.7,260.2,392.9,258.4,393.1,256.6z"
          />

          <linearGradient
            id="SVGID_32_"
            gradientUnits="userSpaceOnUse"
            x1="281.49"
            y1="117.835"
            x2="288.78"
            y2="117.835"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st31}
            d="M288.8,387.4c-1.8,0.5-3.7,0.9-5.5,1.4l-1.8-7.8c1.8-0.4,3.5-0.8,5.2-1.3L288.8,387.4z"
          />

          <linearGradient
            id="SVGID_33_"
            gradientUnits="userSpaceOnUse"
            x1="347.67"
            y1="154.87"
            x2="357.22"
            y2="154.87"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st32}
            d="M351.6,342.3l5.6,5.7c-1.4,1.3-2.7,2.7-4.1,4l-5.4-5.9C349,344.9,350.3,343.6,351.6,342.3z"
          />

          <linearGradient
            id="SVGID_34_"
            gradientUnits="userSpaceOnUse"
            x1="270.88"
            y1="115.61"
            x2="277.66"
            y2="115.61"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st33}
            d="M277.7,389.9c-1.9,0.4-3.8,0.7-5.6,0.9l-1.2-7.9c1.8-0.3,3.6-0.6,5.3-0.9L277.7,389.9z"
          />

          <linearGradient
            id="SVGID_35_"
            gradientUnits="userSpaceOnUse"
            x1="302.14"
            y1="124.715"
            x2="310.33"
            y2="124.715"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st34}
            d="M310.3,379.9c-1.7,0.8-3.5,1.5-5.3,2.2l-2.9-7.5c1.7-0.6,3.4-1.4,5-2.1L310.3,379.9z"
          />

          <linearGradient
            id="SVGID_36_"
            gradientUnits="userSpaceOnUse"
            x1="260.15"
            y1="114.22"
            x2="266.39"
            y2="114.22"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st35}
            d="M266.4,391.5c-1.9,0.2-3.8,0.4-5.7,0.5l-0.6-8c1.8-0.1,3.6-0.3,5.4-0.5L266.4,391.5z"
          />

          <linearGradient
            id="SVGID_37_"
            gradientUnits="userSpaceOnUse"
            x1="249.67"
            y1="113.62"
            x2="255.03"
            y2="113.62"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path className={classes.st36} d="M249.7,384.4c1.7,0,3.4,0,5.1-0.1l0.3,8c-1.8,0.1-3.6,0.1-5.4,0.1V384.4z" />

          <linearGradient
            id="SVGID_38_"
            gradientUnits="userSpaceOnUse"
            x1="291.92"
            y1="120.895"
            x2="299.69"
            y2="120.895"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st37}
            d="M299.7,384c-1.8,0.6-3.6,1.2-5.4,1.8l-2.3-7.6c1.7-0.5,3.5-1.1,5.1-1.7L299.7,384z"
          />

          <linearGradient
            id="SVGID_39_"
            gradientUnits="userSpaceOnUse"
            x1="312.06"
            y1="129.33"
            x2="320.62"
            y2="129.33"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st38}
            d="M320.6,374.9c-1.7,0.9-3.4,1.8-5.1,2.6l-3.5-7.2c1.6-0.8,3.2-1.6,4.8-2.4L320.6,374.9z"
          />

          <linearGradient
            id="SVGID_40_"
            gradientUnits="userSpaceOnUse"
            x1="330.78"
            y1="140.755"
            x2="339.93"
            y2="140.755"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st39}
            d="M339.9,362.8c-1.5,1.1-3.1,2.2-4.6,3.3l-4.5-6.6c1.5-1,3-2.1,4.4-3.1L339.9,362.8z"
          />

          <linearGradient
            id="SVGID_41_"
            gradientUnits="userSpaceOnUse"
            x1="339.48"
            y1="147.49"
            x2="348.85"
            y2="147.49"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st40}
            d="M343.6,349.7l5.2,6.1c-1.4,1.2-2.9,2.5-4.4,3.6l-5-6.3C340.9,352,342.3,350.8,343.6,349.7z"
          />

          <linearGradient
            id="SVGID_42_"
            gradientUnits="userSpaceOnUse"
            x1="321.63"
            y1="134.685"
            x2="330.51"
            y2="134.685"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <path
            className={classes.st41}
            d="M330.5,369.2c-1.6,1-3.2,2-4.9,2.9l-4-6.9c1.5-0.9,3.1-1.8,4.6-2.8L330.5,369.2z"
          />
        </g>
        <g>
          <linearGradient
            id="SVGID_43_"
            gradientUnits="userSpaceOnUse"
            x1="248.57"
            y1="142.105"
            x2="250.62"
            y2="142.105"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st42} points="248.6,338.5 248.6,381.3 250.6,381.3 250.6,338.5 248.6,338.5 		" />

          <linearGradient
            id="SVGID_44_"
            gradientUnits="userSpaceOnUse"
            x1="248.57"
            y1="388.2"
            x2="250.73"
            y2="388.2"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <rect x="248.6" y="92.4" className={classes.st43} width="2.2" height="42.8" />

          <linearGradient
            id="SVGID_45_"
            gradientUnits="userSpaceOnUse"
            x1="309.96"
            y1="149.545"
            x2="322.79"
            y2="149.545"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st44} points="310,343.5 321,362.4 322.8,361.4 311.9,342.5 310,343.5 		" />

          <linearGradient
            id="SVGID_46_"
            gradientUnits="userSpaceOnUse"
            x1="176.52"
            y1="380.85"
            x2="189.19"
            y2="380.85"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st45} points="176.5,112.3 187.4,131.1 189.2,130.1 178.2,111.2 		" />

          <linearGradient
            id="SVGID_47_"
            gradientUnits="userSpaceOnUse"
            x1="355.23"
            y1="198.385"
            x2="375.35"
            y2="198.385"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st46} points="355.2,299.1 374.2,310 375.4,308.2 356.3,297.2 355.2,299.1 		" />

          <linearGradient
            id="SVGID_48_"
            gradientUnits="userSpaceOnUse"
            x1="124"
            y1="331.935"
            x2="144.05"
            y2="331.935"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st47} points="124,165.5 142.9,176.4 144.1,174.7 125.1,163.7 		" />

          <linearGradient
            id="SVGID_49_"
            gradientUnits="userSpaceOnUse"
            x1="351.38"
            y1="265.18"
            x2="394.19"
            y2="265.18"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <rect x="351.4" y="235.8" className={classes.st48} width="42.8" height="2.1" />

          <linearGradient
            id="SVGID_50_"
            gradientUnits="userSpaceOnUse"
            x1="105.17"
            y1="265.18"
            x2="148.03"
            y2="265.18"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <rect x="105.2" y="235.8" className={classes.st49} width="42.9" height="2.1" />

          <linearGradient
            id="SVGID_51_"
            gradientUnits="userSpaceOnUse"
            x1="355.23"
            y1="331.935"
            x2="375.35"
            y2="331.935"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st50} points="356.3,176.4 375.4,165.5 374.2,163.7 355.2,174.7 		" />

          <linearGradient
            id="SVGID_52_"
            gradientUnits="userSpaceOnUse"
            x1="124"
            y1="198.385"
            x2="144.05"
            y2="198.385"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st51} points="125.1,310 144.1,299.1 142.9,297.2 124,308.2 125.1,310 		" />

          <linearGradient
            id="SVGID_53_"
            gradientUnits="userSpaceOnUse"
            x1="309.96"
            y1="380.85"
            x2="322.79"
            y2="380.85"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st52} points="311.9,131.1 322.8,112.3 321,111.2 310,130.1 		" />

          <linearGradient
            id="SVGID_54_"
            gradientUnits="userSpaceOnUse"
            x1="176.52"
            y1="149.545"
            x2="189.19"
            y2="149.545"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st53} points="178.2,362.4 189.2,343.5 187.4,342.5 176.5,361.4 178.2,362.4 		" />

          <linearGradient
            id="SVGID_55_"
            gradientUnits="userSpaceOnUse"
            x1="248.57"
            y1="142.105"
            x2="250.62"
            y2="142.105"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st54} points="248.6,381.3 250.6,381.3 250.6,338.5 248.6,338.5 248.6,381.3 		" />

          <linearGradient
            id="SVGID_56_"
            gradientUnits="userSpaceOnUse"
            x1="309.96"
            y1="149.545"
            x2="322.79"
            y2="149.545"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st55} points="321,362.4 322.8,361.4 311.9,342.5 310,343.5 321,362.4 		" />

          <linearGradient
            id="SVGID_57_"
            gradientUnits="userSpaceOnUse"
            x1="355.23"
            y1="198.385"
            x2="375.35"
            y2="198.385"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st56} points="374.2,310 375.4,308.2 356.3,297.2 355.2,299.1 374.2,310 		" />

          <linearGradient
            id="SVGID_58_"
            gradientUnits="userSpaceOnUse"
            x1="176.52"
            y1="149.545"
            x2="189.19"
            y2="149.545"
            gradientTransform="matrix(1 0 0 -1 0 502)"
          >
            <stop offset="0" style={{ stopColor: '#D1BF73' }} />
            <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
            <stop offset="1" style={{ stopColor: '#BFA759' }} />
          </linearGradient>
          <polygon className={classes.st57} points="178.2,362.4 189.2,343.5 187.4,342.5 176.5,361.4 178.2,362.4 		" />

          <g>
            <g>
              <linearGradient
                id="SVGID_62_"
                gradientUnits="userSpaceOnUse"
                x1="236.41"
                y1="350.81"
                x2="245.88"
                y2="350.81"
                gradientTransform="matrix(1 0 0 -1 0 502)"
              >
                <stop offset="0" style={{ stopColor: '#D1BF73' }} />
                <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
                <stop offset="1" style={{ stopColor: '#BFA759' }} />
              </linearGradient>
              <path
                className={classes.st61}
                d="M245.9,162h-4.1v-15.6c-1.5,1.4-3.4,2.5-5.4,3.1v-3.7c1.2-0.5,2.4-1.2,3.4-2c1.2-0.9,2.2-2.1,2.7-3.4h3.3
					V162z"
              />

              <linearGradient
                id="SVGID_63_"
                gradientUnits="userSpaceOnUse"
                x1="247.38"
                y1="350.841"
                x2="261.8"
                y2="350.841"
                gradientTransform="matrix(1 0 0 -1 0 502)"
              >
                <stop offset="0" style={{ stopColor: '#D1BF73' }} />
                <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
                <stop offset="1" style={{ stopColor: '#BFA759' }} />
              </linearGradient>
              <path
                className={classes.st62}
                d="M261.8,158.2v3.8h-14.4c0.1-1.5,0.6-2.9,1.4-4.1c1.3-1.9,2.8-3.7,4.6-5.2c1.3-1.1,2.4-2.3,3.4-3.6
					c0.5-0.7,0.8-1.6,0.9-2.5c0.1-0.8-0.2-1.5-0.8-2.1c-0.5-0.5-1.3-0.8-2-0.8c-0.8-0.1-1.5,0.2-2.1,0.8c-0.6,0.7-0.9,1.6-0.8,2.6
					l-4.2-0.4c0-1.9,0.9-3.7,2.4-4.9c1.4-1.1,3.1-1.6,4.8-1.5c1.8-0.1,3.6,0.5,5,1.7c1.1,1.1,1.8,2.6,1.8,4.2c0,1-0.2,1.9-0.5,2.8
					c-0.4,1-0.9,1.9-1.6,2.7c-0.8,1-1.8,1.9-2.7,2.8c-0.9,0.7-1.7,1.5-2.5,2.3c-0.3,0.5-0.7,0.8-0.8,1.2L261.8,158.2z"
              />
            </g>

            <linearGradient
              id="SVGID_64_"
              gradientUnits="userSpaceOnUse"
              x1="336.81"
              y1="264.0495"
              x2="351.04"
              y2="264.0495"
              gradientTransform="matrix(1 0 0 -1 0 502)"
            >
              <stop offset="0" style={{ stopColor: '#D1BF73' }} />
              <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
              <stop offset="1" style={{ stopColor: '#BFA759' }} />
            </linearGradient>
            <path
              className={classes.st63}
              d="M336.8,242.9l3.9-0.5c0.1,0.9,0.5,1.6,1.1,2.2c0.5,0.6,1.3,0.9,2,0.9c0.8,0,1.6-0.4,2.2-1
				c0.6-0.7,0.9-1.7,0.9-2.6c0.1-0.9-0.2-1.8-0.9-2.4c-0.5-0.6-1.2-1-2-1c-0.7,0-1.4,0.2-2,0.4l0.5-3.5c0.9,0.1,1.8-0.2,2.5-0.7
				c0.6-0.5,0.9-1.2,0.9-1.9c0-0.7-0.2-1.3-0.6-1.8c-0.5-0.4-1.1-0.7-1.8-0.6c-0.7,0-1.3,0.2-1.8,0.7c-0.6,0.6-0.9,1.4-1,2.2
				l-3.8-0.8c0.2-1.1,0.6-2.1,1.3-3c0.5-0.8,1.2-1.5,2.1-1.8c1-0.5,2.1-0.7,3.2-0.7c1.9-0.1,3.6,0.7,4.9,2c0.9,1,1.4,2.2,1.4,3.5
				c0,1.9-1.1,3.4-3.1,4.6c1.2,0.2,2.2,0.8,3,1.8c0.7,0.9,1.1,2.1,1,3.3c0.1,1.8-0.7,3.6-2,4.9c-1.4,1.3-3.2,2.1-5.1,2
				c-1.8,0-3.5-0.5-4.9-1.6C337.7,246.2,336.9,244.6,336.8,242.9z"
            />

            <linearGradient
              id="SVGID_65_"
              gradientUnits="userSpaceOnUse"
              x1="243.1"
              y1="177.8253"
              x2="257.36"
              y2="177.8253"
              gradientTransform="matrix(1 0 0 -1 0 502)"
            >
              <stop offset="0" style={{ stopColor: '#D1BF73' }} />
              <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
              <stop offset="1" style={{ stopColor: '#BFA759' }} />
            </linearGradient>
            <path
              className={classes.st64}
              d="M257,318.5l-4,0.5c0-0.7-0.3-1.3-0.7-1.8c-0.4-0.5-1-0.7-1.6-0.6c-0.9,0-1.7,0.4-2.2,1.2
				c-0.6,0.8-1,2.4-1.1,4.9c0.9-1.2,2.3-1.9,3.8-1.8c1.7,0,3.3,0.7,4.5,2c1.2,1.4,1.9,3.2,1.8,5.1c0.1,1.9-0.6,3.9-1.9,5.3
				c-1.3,1.3-3.1,2.1-5,2c-2.1,0-4.1-0.9-5.3-2.6c-1.4-1.6-2-4.4-2-8.3s0.6-6.9,2.1-8.5c1.3-1.7,3.4-2.7,5.6-2.6
				c1.5-0.1,2.9,0.4,4.1,1.4C256.2,315.5,257,317,257,318.5z M247.7,327.5c-0.1,1.1,0.3,2.2,0.9,3.1c0.5,0.7,1.3,1.1,2.2,1.1
				c0.7,0,1.4-0.3,1.9-0.9c1.1-1.9,1.1-4.2-0.1-6c-0.5-0.6-1.3-1-2.1-1c-0.8,0-1.5,0.3-2,0.9C247.9,325.6,247.6,326.6,247.7,327.5
				L247.7,327.5z"
            />

            <linearGradient
              id="SVGID_66_"
              gradientUnits="userSpaceOnUse"
              x1="149.33"
              y1="266.5838"
              x2="163.7286"
              y2="266.5838"
              gradientTransform="matrix(1 0 0 -1 0 502)"
            >
              <stop offset="0" style={{ stopColor: '#D1BF73' }} />
              <stop offset="0.55" style={{ stopColor: '#F9EDAD' }} />
              <stop offset="1" style={{ stopColor: '#BFA759' }} />
            </linearGradient>
            <path
              className={classes.st65}
              d="M149.7,241l4-0.4c0,1.3,1,2.4,2.3,2.5c0,0,0,0,0.1,0c0.8,0,1.6-0.5,2.1-1.2c0.7-0.9,1.1-2.4,1.2-5
				c-0.9,1.2-2.4,1.8-3.9,1.8c-1.7,0-3.3-0.7-4.4-1.9c-1.2-1.4-1.9-3.2-1.8-5.1c-0.1-1.9,0.6-3.8,1.9-5.2c1.3-1.3,3.1-2.1,4.9-2
				c2.1-0.1,4.1,0.9,5.4,2.5c1.4,1.7,2.1,4.5,2.1,8.3s-0.8,6.9-2.2,8.6c-1.4,1.7-3.5,2.6-5.7,2.6c-1.5,0.1-2.9-0.4-4-1.3
				C150.6,244,149.9,242.6,149.7,241z M159,232c0.1-1.1-0.2-2.2-0.9-3.1c-0.5-0.7-1.3-1.1-2.2-1.1c-0.7,0-1.4,0.4-1.8,1
				c-0.6,0.6-0.7,1.6-0.7,2.9c-0.1,1.1,0.1,2.2,0.7,3.1c0.5,0.6,1.3,1,2.1,1c0.8,0,1.5-0.4,2-1C158.8,234,159,233,159,232L159,232z"
            />
            <PeopleG />
            <ProjectsG />
            <ActivityG />
          </g>
        </g>
      </g>
      {slowTimeSpeed ? (
        <ClockHands key={`notCrazySpeed${slowTimeSpeed}`} crazy={false} />
      ) : (
        <ClockHands key="crazySpeed" crazy={true} />
      )}
    </svg>
  );
};

export default ActiveClockIcon;
