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
}

// TODO: перенести в переводы
export const STATUS_NAMES = {
  assigning_responsible: 'Пред-оценка (ответственный)',
  'back-log': 'Резерв',
  creating: 'Резерв',
  developing: 'Разработка',
  done: 'Готово',
  estimation_before_assigning: 'Пред-оценка (назначение)',
  'in-progress': 'В процессе',
  in_progress: 'В процессе',
  'post-estimation': 'Пост-оценка',
  preparing: 'Подготовка',
  prof_review: 'Обзор',
  ready_to_do: 'Сделать',
  reviewing: 'Обзор',
  testing: 'Тестирование',
  'to-do': 'Сделать',
};
