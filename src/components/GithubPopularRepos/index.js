import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const views = {
  initial: 'Initial',
  success: 'Success',
  failure: 'failure',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    isLoading: true,
    repos: {},
    apiStatus: views.success,
  }

  componentDidMount = () => {
    this.getItems()
  }

  getItems = async () => {
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    const data = await response.json()
    const updatedData = data.popular_repos.map(each => ({
      avatarUrl: each.avatar_url,
      forksCount: each.forks_count,
      id: each.id,
      issuesCount: each.issues_count,
      starsCount: each.stars_count,
      name: each.name,
    }))
    if (response.ok === true) {
      this.setState({
        repos: updatedData,
        isLoading: false,
        apiStatus: views.success,
      })
    } else {
      this.setState({apiStatus: views.failure})
    }
  }

  changeActiveTabId = id => {
    this.setState({activeTabId: id, isLoading: true}, this.getItems)
  }

  items = () => {
    const {repos} = this.state
    return (
      <ul className="itemsUnordered">
        {repos.map(each => (
          <RepositoryItem key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="failureHeading">Something Went Wrong</h1>
    </>
  )

  renderSuccess = () => {
    const {activeTabId, isLoading} = this.state
    return (
      <div className="mainContainer">
        <h1 className="heading">Popular</h1>
        <ul className="unordered">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              item={each}
              key={each.id}
              activeTabId={activeTabId}
              changeActiveTabId={this.changeActiveTabId}
            />
          ))}
        </ul>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        ) : (
          this.items()
        )}
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case views.success:
        return this.renderSuccess()
      case views.failure:
        return this.renderFailure()
      default:
        return null
    }
  }
}
export default GithubPopularRepos
