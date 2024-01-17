import './index.css'

const LanguageFilterItem = props => {
  const {item, activeTabId, changeActiveTabId} = props
  const {id, language} = item
  let backgroundClassName
  if (activeTabId === id) {
    backgroundClassName = 'active languageButton'
  } else {
    backgroundClassName = 'languageButton'
  }
  const buttonClicked = () => {
    changeActiveTabId(id)
  }
  return (
    <li className="listItem">
      <button
        className={`${backgroundClassName}`}
        type="button"
        onClick={buttonClicked}
      >
        {language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
