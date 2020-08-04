import { COMPLEXITY, URGENCY } from '@types';

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
  architect_review: 'Соответсвие',
  assigning_performer: 'Исполнитель',
  assigning_responsible: 'Ответственный',
  'back-log': 'Резерв',
  checking: 'Тестирование',
  'code-review': 'Обзор кода',
  creating: 'Резерв',
  deployed_architect_estimation: 'Архи. оценка',
  deployed_community_estimation: 'Финал. оценка',
  deployed_prof_estimation: 'Проф. оценка',
  developing: 'Разработка',
  done: 'Готово',
  estimating_before_PERFORMER: 'Сложность',
  estimation_before_assigning: 'Оценка важности',
  estimation_before_to_do: 'Оценка времени',
  finishing: 'Готово',
  'in-progress': 'В процессе',
  in_progress: 'В процессе',
  'post-estimation': 'Пост-оценка',
  preparing: 'Подготовка',
  prof_review: 'Обзор',
  publishing: 'Публикация',
  ready_to_deploy: 'Публикация',
  ready_to_do: 'Сделать',
  reviewing: 'Обзор',
  testing: 'Тестирование',
  'to-do': 'Сделать',
};
