import { connect } from 'react-redux'
import { setCondition } from 'store/filterConditions'
import { getInstrument } from 'store/serverData'
import { getAccount } from 'store/localData/accounts'
import { getPopulatedTag } from 'store/localData/tags'
import Transaction from './Transaction'
import { getTransaction } from 'store/localData/transactions'
import { getType } from 'store/localData/transactions/helpers'

const mapStateToProps = (state, { id }) => {
  const tr = getTransaction(state, id)

  const incomeInstrument = getInstrument(state, tr.incomeInstrument)
  const incomeAccount = getAccount(state, tr.incomeAccount)
  const opIncomeInstrument = getInstrument(state, tr.opIncomeInstrument)
  const outcomeInstrument = getInstrument(state, tr.outcomeInstrument)
  const outcomeAccount = getAccount(state, tr.outcomeAccount)
  const opOutcomeInstrument = getInstrument(state, tr.opOutcomeInstrument)

  return {
    id: tr.id,
    changed: tr.changed,
    qrCode: tr.qrCode,
    type: getType(tr),

    incomeAccountTitle: incomeAccount && incomeAccount.title,
    outcomeAccountTitle: outcomeAccount && outcomeAccount.title,
    deleted: tr.deleted,
    payee: tr.payee,
    comment: tr.comment,
    income: tr.income,
    incomeCurrency: incomeInstrument && incomeInstrument.shortTitle,
    opIncome: tr.opIncome,
    opIncomeCurrency: opIncomeInstrument && opIncomeInstrument.shortTitle,
    outcome: tr.outcome,
    outcomeCurrency: outcomeInstrument && outcomeInstrument.shortTitle,
    opOutcome: tr.opOutcome,
    opOutcomeCurrency: opOutcomeInstrument && opOutcomeInstrument.shortTitle,

    // TODO: вызывает постоянные ререндеры, т.к. каждый раз новый объект.
    //       можно попробовать подключать теги уже на месте в <MainLine/>
    tag:
      tr.tag && tr.tag.length
        ? tr.tag.map(id => getPopulatedTag(state, id))
        : null,
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  onFilterByPayee: payee => dispatch(setCondition({ search: payee })),
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
