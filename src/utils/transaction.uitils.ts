import { Transaction } from 'sequelize';
import sequelize from '../database/data-source';
/**
 * Utility to execute functions within a Sequelize transaction.
 * @param operation - The function to execute within the transaction.
 * @returns The result of the operation.
 */
export const executeTransaction = async <T>(
  operation: (transaction: Transaction) => Promise<T>,
): Promise<T> => {
  const transaction = await sequelize.transaction();

  try {
    const result = await operation(transaction);
    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const apiHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
const apiHandlerWithTransaction = async (serviceFn) => {
  const transaction = await dbConnection.transaction()
  try {
    const result = await serviceFn(transaction)
    await transaction.commit()
    return result
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}