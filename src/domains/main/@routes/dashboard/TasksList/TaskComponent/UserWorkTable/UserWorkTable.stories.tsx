// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

// import {routeContext} from '.storybook/helpers';
// import {IUserWork} from "@types";
// import {DownloadList} from "store/@common/entities";
// import {UserWork} from "store/tasks/user-works/UserWork";
// import { UserWorkTableJsx } from './UserWorkTable';
// import { variant1 } from './_mock'

storiesOf('UserWorkTable', module).add('default', () => <div>test</div>);
// .add('default', () => (
//   <UserWorkTableJsx
//     currentUserWorkId={1}
//     deleteUserWork={action('deleteUserWork')}
//     userWorks={new DownloadList<IUserWork>(UserWork, variant1 as any)}
//     projectId={53}
//     stopUserWork={action('stopUserWork')}
//     taskId={418}
//     {...routeContext}
//   />
// ));
