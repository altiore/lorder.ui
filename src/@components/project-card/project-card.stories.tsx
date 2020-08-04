import React from 'react';

import { makeStyles, Theme } from '@material-ui/core/styles';

import ProjectCard, { CARD_COLOR } from '.';
import CenterDecorator from '../../../.storybook/decor/Center';
import IntlProvider from '../../../.storybook/decor/IntlProvider';
import RouterDecorator from '../../../.storybook/decor/RouterDecorator';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const useStyles = makeStyles((theme: Theme) => ({
  cards: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  root: {
    alignItems: 'center',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    minHeight: 200,
    padding: theme.spacing(2),
    width: 'calc(100% - 16px)',
  },
}));

storiesOf('ProjectCard', module)
  .addDecorator(CenterDecorator)
  .addDecorator(IntlProvider)
  .addDecorator(RouterDecorator)
  .add('default', () => {
    const { cards, root } = useStyles();
    return (
      <div className={root}>
        <div className={cards}>
          <ProjectCard
            color={CARD_COLOR.BLACK}
            logoSrc={`/logo_patreon.png`}
            membersCount={1}
            projectLink={'/'}
            title="Lorder"
            userInfo={{
              displayName: 'Разван Ломов',
              logoSrc: '/d-avatar.png',
              mainRole: 'Архитектор',
              message: 'Этот проект - это мой действительный шанс проявить себя в той сфере, где я на самом деле хорош',
              shortName: 'RA',
              value: 0,
            }}
            value={0}
          />

          <ProjectCard
            color={CARD_COLOR.BLUE}
            logoVariant="round"
            membersCount={34}
            projectLink={'/'}
            title="Open Broadcaster Software Software"
            value={10}
          />

          <ProjectCard
            color={CARD_COLOR.GREEN}
            membersCount={134}
            projectLink={'/'}
            title="Webpack"
            userInfo={{
              displayName: 'Разван Ломов',
              mainRole: 'Разработчик',
              shortName: 'RA',
              value: 10,
            }}
            value={120}
          />

          <ProjectCard
            color={CARD_COLOR.VIOLET}
            logoVariant="round"
            membersCount={9134}
            projectLink={'/'}
            title="React.JS"
            value={3120}
          />
        </div>

        <div className={cards}>
          <ProjectCard
            color={CARD_COLOR.BLACK}
            logoSrc={`/logo_patreon.png`}
            logoVariant="round"
            membersCount={89134}
            projectLink={'/'}
            title="Lorder"
            userInfo={{
              displayName: 'Марина',
              logoSrc: '/d-avatar.png',
              mainRole: 'Дизайнер',
              shortName: 'MA',
              value: 432,
            }}
            value={43120}
          />

          <ProjectCard
            color={CARD_COLOR.BLUE}
            membersCount={989134}
            projectLink={'/'}
            title="Open Broadcaster Software Software"
            value={543120}
          />

          <ProjectCard
            color={CARD_COLOR.GREEN}
            logoVariant="round"
            membersCount={1989134}
            projectLink={'/'}
            title="Webpack"
            userInfo={{
              displayName: 'Ростислав',
              logoSrc: '/d-avatar.png',
              mainRole: 'Разработчик',
              shortName: 'РО',
              value: 6077,
            }}
            value={543120.45}
          />

          <ProjectCard
            color={CARD_COLOR.VIOLET}
            membersCount={41989134}
            projectLink={'/'}
            title="React.JS"
            value={9543120.45}
          />
        </div>
      </div>
    );
  });
