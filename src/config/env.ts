export default () => ({
  currEnv: process.env.CURRENT_ENVIRONMENT || 'dev',
  port: parseInt(process.env.PORT, 10) || 3020,
  databaseUrl: process.env.DATABASE_URL,
  setupParametersUrl: process.env.API_INSTALA_PARAM,
  contextPath: process.env.CONTEXT_PATH,
  parametersCronExpression: process.env.PARAMETERS_CRON_EXPRESSION || '0 * * * *',
  cronTimeZone: process.env.CRON_TIME_ZONE || 'America/Sao_Paulo',
})
