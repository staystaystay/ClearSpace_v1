
import { DataCategory } from './types';

export const INITIAL_STORAGE = {
  totalGb: 512,
  usedGb: 412,
  reclaimableGb: 0
};

export const CATEGORIES: DataCategory[] = [
  {
    id: 'sys-cache',
    label: 'System temporary memory',
    sizeGb: 4.2,
    explanation: 'These files help your system load faster in the short term. Over time, they build up and are safe to remove.',
    impact: 'Your system will recreate them automatically when needed.',
    safety: 'safe',
    selected: true
  },
  {
    id: 'app-cache',
    label: 'App leftovers',
    sizeGb: 8.1,
    explanation: 'Files created by apps you use daily. They’re no longer needed and often take up a lot of space.',
    impact: 'Clears out cached media and temporary data from apps like Chrome, Spotify, or Slack.',
    safety: 'safe',
    selected: true
  },
  {
    id: 'sys-logs',
    label: 'Old activity records',
    sizeGb: 1.5,
    explanation: 'Notes your computer keeps about past activity. They’re already used and don’t affect how your laptop runs now.',
    impact: 'Removes diagnostic logs that are usually only used by technicians.',
    safety: 'optional',
    selected: false
  },
  {
    id: 'unused-sys',
    label: 'Unused system files',
    sizeGb: 12.4,
    explanation: 'Files created during updates or installs that your system no longer relies on.',
    impact: 'Frees up significant space by removing outdated installer files.',
    safety: 'safe',
    selected: true
  }
];

export const SCANNING_MESSAGES = [
  'Checking system data...',
  'Looking for unused files...',
  'Analyzing application cache...',
  'Calculating reclaimable space...',
  'Preparing your safety report...'
];

export const CLEANING_MESSAGES = [
  'Removing temporary files...',
  'Wiping app leftovers...',
  'Clearing activity records...',
  'Finalizing cleanup...',
  'Almost done...'
];
