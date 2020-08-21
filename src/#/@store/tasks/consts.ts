import { COMPLEXITY, STATUS_NAME, URGENCY } from '@types';

export const EDIT_TASK_FORM = 'EditTaskForm';

export interface ITaskFormData {
  id?: number;

  sequenceNumber: number;
  projectId: number;

  isDetailsLoaded: boolean;
  title: string;
  description?: string;
  value: number;
  typeId?: number;
  status: number;
  performerId?: number;
  statusTypeName: string;
  source?: string;
  projectParts?: number[];

  complexity?: COMPLEXITY;
  urgency?: URGENCY;
  userValue?: number;
  userValueFinal?: number;
}

// TODO: перенести в переводы
export const STATUS_NAMES = {
  [STATUS_NAME.architect_review]: 'Соответсвие',
  [STATUS_NAME.assigning_performer]: 'Исполнитель',
  [STATUS_NAME.assigning_responsible]: 'Ответственный',
  [STATUS_NAME['back-log']]: 'Резерв',
  [STATUS_NAME.checking]: 'Тестирование',
  [STATUS_NAME['code-review']]: 'Обзор кода',
  [STATUS_NAME.creating]: 'Резерв',
  [STATUS_NAME.deployed_architect_estimation]: 'Архи. оценка',
  [STATUS_NAME.deployed_community_estimation]: 'Финал. оценка',
  [STATUS_NAME.deployed_prof_estimation]: 'Проф. оценка',
  [STATUS_NAME.developing]: 'Разработка',
  [STATUS_NAME.done]: 'Готово',
  [STATUS_NAME.estimating_before_PERFORMER]: 'Сложность',
  [STATUS_NAME.estimation_before_assigning]: 'Оценка важности',
  [STATUS_NAME.estimation_before_to_do]: 'Оценка времени',
  [STATUS_NAME.finishing]: 'Готово',
  [STATUS_NAME['in-progress']]: 'В процессе',
  [STATUS_NAME.in_progress]: 'В процессе',
  [STATUS_NAME['post-estimation']]: 'Пост-оценка',
  [STATUS_NAME.preparing]: 'Подготовка',
  [STATUS_NAME.prof_review]: 'Обзор',
  [STATUS_NAME.publishing]: 'Публикация',
  [STATUS_NAME.ready_to_deploy]: 'Публикация',
  [STATUS_NAME.ready_to_do]: 'Сделать',
  [STATUS_NAME.reviewing]: 'Обзор',
  [STATUS_NAME.testing]: 'Тестирование',
  [STATUS_NAME['to-do']]: 'Сделать',
};
