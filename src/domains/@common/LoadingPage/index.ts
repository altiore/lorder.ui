import * as CSSModules from 'react-css-modules';

import { LoadingPage as LoadingPageJsx } from './LoadingPage';
import * as s from './style.m.scss';

export const LoadingPage = CSSModules(LoadingPageJsx, s);
