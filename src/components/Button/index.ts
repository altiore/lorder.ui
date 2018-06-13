import * as CSSModules from 'react-css-modules';

import { Button as ButtonJsx } from 'liw-components';
import * as s from './style.module.scss';

export const Button = CSSModules(ButtonJsx, s);
