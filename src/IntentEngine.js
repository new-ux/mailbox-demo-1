// todo: remove checked-unchecked pairs
// todo: ignore automatic actions (intentEngine: don't analyze himself)
// HARDCODE: from attr

const actions = {
  items: [],
}
window.actions = actions

const LAST_N = 3
export const intentEngine = {
  signal({ actionType, actionObject, actionArgs }, { onItemSelect, storeItems }) {
    const newAction = { actionType, actionObject, actionArgs }
    const actions_ = withNewAction(actions, newAction)
    console.log('✨', actionType, actionObject, actionArgs, { actions, actions_ })
    Object.assign(actions, actions_)

    if (actionObject.ui.checked) {
      setTimeout(() => {
        if (!hasNSimilar(LAST_N)(actions_)) return
        const otherSimilarUnchecked = getOtherSimilarAsLastN(LAST_N)(actions_, storeItems)
        if (otherSimilarUnchecked.length) {
          if (window.confirm(generateSuggestText(actions_, LAST_N))) {
            otherSimilarUnchecked.forEach(item => onItemSelect(item.id))
          }
        }
      })
    }
  },
}

function getLastNSimilar(n) {
  return actions => {
    const checkedItems = actions.items.filter(item => item.actionObject.ui.checked)
    if (checkedItems.length < n) return []
    const lastNItems = checkedItems.slice(-1 * n)
    const { from } = last(checkedItems).actionObject
    if (lastNItems.every(item => item.actionObject.from === from)) return lastNItems
    return []
  }
}

function hasNSimilar(n) {
  return actions => {
    return getLastNSimilar(n)(actions).length
  }
}

function getOtherSimilarAsLastN(n) {
  return (actions, storeItems) => {
    const lastNItems = getLastNSimilar(n)(actions).map(item => item.actionObject)

    const otherItems = storeItems.filter(storeItem => !lastNItems.map(i => i.id).includes(storeItem.id))

    return otherItems.filter(item => item.from === lastNItems[0].from && !item.ui.checked)
  }
}

function withNewAction(actions, action) {
  return action.actionObject.ui.checked
    ? { ...actions, items: [...actions.items, action] }
    : { ...actions, items: actions.items.filter(item => item.actionObject.id !== action.actionObject.id) }
}

function generateSuggestText(actions) {
  const { from } = last(actions.items).actionObject
  return `💡 Select all messages from ${from}?` // todo: inflector
}

function last(array) {
  return array.slice(-1)[0]
}
