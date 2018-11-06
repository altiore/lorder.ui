import { handleActions } from 'redux-actions';

import { VersionHistory } from './VersionHistory';

type S = VersionHistory;
type P = any;

export const versionHistory = handleActions<S, P>({}, new VersionHistory());
