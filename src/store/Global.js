import { observable, action } from 'mobx'
import axios from 'axios'
import { concat } from 'lodash'

export default class GlobalStore {
  /**
   * observable
   */
  @observable isVote = false
  @observable isModalVisibal = false
  @observable isResVisibal = false
  @observable submitLoading = false
  @observable tokens = []
  @observable awards = []
  @observable awardLoading = false

  /**
   * action
   */
  @action getTokens = () => {
    this.tokens = [
      {
        percent: 30
      },
      {
        percent: 25
      },
      {
        percent: 20
      },
      {
        percent: 15
      },
      {
        percent: 10
      }
    ]
  }

  @action showModal = () => {
    this.isModalVisibal = true
  }

  @action hideModal = () => {
    this.isModalVisibal = false
  }

  @action setIsVote = () => {
    this.isVote = true
  }

  @action showRes = () => {
    this.isResVisibal = true
  }

  @action hideRes = () => {
    this.isResVisibal = false
  }

  @action doVote = () => {
    this.submitLoading = true
    /* api */
    this.setIsVote()
    this.getAward()
    this.hideModal()
    this.submitLoading = false
    this.showRes()
  }

  @action getAward = () => {
    this.awardLoading = true
    axios
      .get('https://randomuser.me/api/?results=10&inc=name,gender,email,nat&noinfo')
      .then(res => {
        this.awards = concat(this.awards, res.data.results)
        this.awardLoading = false
      })
      .catch(err => {
        this.awardLoading = false
      })
  }
}
