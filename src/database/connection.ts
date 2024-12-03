import sequelize from './data-source';

/**
 * Initialize the database connection.
 */
export const initializeDatabase = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ alter: true, force: false });
    console.log('🟢 Database connection established');
  } catch (error) {
    console.error(`🔴 Error during Data Source initialization`);
    throw error;
  }
};
