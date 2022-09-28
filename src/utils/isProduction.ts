export const isProduction = (): boolean => process.env.NODE_ENV === 'production' && !process.env.IS_CYPRESS;
