import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {avatarUrl, forksCount, issuesCount, starsCount, name} = item
  return (
    <li className="reposListItem">
      <img src={avatarUrl} alt={name} className="avatar" />
      <h1 className="name">{name}</h1>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
          className="smallImg"
        />
        <p className="values">{starsCount} stars</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="smallImg"
        />
        <p className="values">{forksCount} forks</p>
      </div>
      <div className="counts">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
          className="smallImg"
        />
        <p className="values">{issuesCount} issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
