import sql from 'mssql';

const orderTable = new sql.Table();

orderTable.columns.add('BookerCode', sql.VarChar(15));
orderTable.columns.add('CustomerCode', sql.VarChar(15));
orderTable.columns.add('customerLocation', sql.VarChar(50));
orderTable.columns.add('ItemCode', sql.VarChar(15));
orderTable.columns.add('Quantity', sql.Decimal(16, 2));
orderTable.columns.add('ItemRate', sql.Decimal(16, 2));
orderTable.columns.add('ItemDisc', sql.Decimal(16, 2));
orderTable.columns.add('ItemSTax', sql.Decimal(16, 2));
orderTable.columns.add('Amount', sql.Decimal(16, 2));

export default orderTable;
