export const LOG_LEVELS = {
  FATAL: 'fatal',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
  TRACE: 'trace',
};

export const LOG_COLORS = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
  trace: 'magenta',
};

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ORGANIZER: 'organizer',
}
export const ROLES_ARRAY = [ROLES.SUPER_ADMIN, ROLES.ORGANIZER]
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ALL: 'all',
}
export const LANGUAGE_CODE= {
  EN: "en",
  IT:"it"
}

export const MODULE_IDENTIFIRES = {
  USER: 'user',
  EVENT: 'event',
  EVENT_CATEGORY: 'event_category',
  NEWS: 'news',
  NEWS_CATEGORY: 'news_category',
}