import { useDispatch } from 'react-redux';
import s from './TransactionTable.module.css';
import { removeTransaction } from 'redux/Transaction/transactionOperations';
import { PropTypes } from 'prop-types';
import DeleteButton from 'components/common/button-delete/button-delete';
import { Translator } from 'components/Translator/Translator';
export const TransactionTable = ({ tablePage, transactionData }) => {
  const dispatch = useDispatch();
  console.log(tablePage);

  return (

    <div className={s.TableScroll}>



      <table>
        <thead className={s.Thead}>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
      </table>
      <div className={s.TableScrollBody}>
        <table>
          <tbody className={s.Tbody} >
            {transactionData?.map(item => (
              <tr className={s.Tr} key={item._id} colspan='4'>
                <td className={s.Td} > {item.date}</td>
                <td className={s.Description}>{item.description}</td>
                <td className={s.Td}>{Translator(item.category)}</td>
                {
                  tablePage === '/main/expenses' || tablePage === '/expenses' || tablePage === '/Main/expenses' ? (
                    <td className={s.ExpensesSum}>{`- ${item.amount} грн.`}</td>
                  ) : (
                    <td className={s.IncomeSum}>{`${item.amount} грн.`}</td>
                  )
                }
                <td className={s.Td}>
                  <DeleteButton onClick={() => dispatch(removeTransaction(item._id))} />
                </td>
              </tr >
            ))}
          </tbody >


        </table >
      </div >
    </div >
  );
};

TransactionTable.propTypes = {
  tablePage: PropTypes.string,
  transactionData: PropTypes.arrayOf(PropTypes.object),
};
