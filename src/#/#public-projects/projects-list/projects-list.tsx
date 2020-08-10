import React, { useCallback } from 'react';

import { MenuItem, Select } from '@material-ui/core';

import ProjectCard, { CARD_COLOR } from '@components/project-card';

import { useStyles } from './styles';

export const ProjectsList = (props: any) => {
  const classes = useStyles();
  const handleInput = useCallback((e: any) => {
    // blank for next iteration
    return null;
  }, []);
  return (
    <main>
      <div className={classes.container}>
        <Select value={'default'} style={{ width: 250, marginTop: 30 }} onChange={handleInput}>
          <MenuItem value="default" disabled>
            Популярные
          </MenuItem>
        </Select>
        <div className={classes.cardsWrap}>
          {[1, 2, 3, 4].map(key => (
            <ProjectCard
              key={key}
              color={CARD_COLOR.GREEN}
              membersCount={134}
              projectLink={'/'}
              title="Webpack"
              value={120}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
