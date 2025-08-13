import type { TPomodoroStage } from '../types/pomodoro'

export const stages: TPomodoroStage[] = ['focus', 'longbreak', 'shortbreak']

export const displayedStages: Record<TPomodoroStage, string> = {
  focus: 'Pomodoro',
  longbreak: 'Long break',
  shortbreak: 'Short break',
}

/**
 * in seconds
 */
export const defaultTimePerStages: Record<TPomodoroStage, number> = {
  focus: 50 * 60,
  shortbreak: 5 * 60,
  longbreak: 20 * 60,
}
