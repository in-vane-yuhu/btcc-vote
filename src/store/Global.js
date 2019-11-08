import { observable, action } from 'mobx'
import { query, mutation } from '../api/apollo'
import { message } from 'antd'

import formatErrorMessage from '../api/error'

export default class GlobalStore {
  /**
   * observable
   */
  @observable isModalVisibal = false
  @observable isResultsVisibal = false
  @observable isShareVisibal = false
  @observable isVotedVisibal = false
  @observable isAwardsVisibal = false
  @observable tokens = []
  @observable checkedTokens = []
  @observable results = []
  @observable awards = []
  @observable submitLoading = false
  @observable awardLoading = false
  @observable UID = ''

  /**
   * action
   */
  @action getUID = () => {
    this.UID = localStorage['UID']
  }

  @action resetUID = () => {
    localStorage.clear()
    this.UID = ''
    this.resetAwards()
  }

  @action resetAwards = () => {
    this.awards = []
  }

  @action showModal = () => {
    this.isModalVisibal = true
  }

  @action hideModal = () => {
    this.isModalVisibal = false
  }

  @action showResults = () => {
    this.isResultsVisibal = true
  }

  @action hideResults = () => {
    this.isResultsVisibal = false
  }

  @action showShare = () => {
    this.isShareVisibal = true
  }

  @action hideShare = () => {
    this.isShareVisibal = false
  }

  @action showVoted = () => {
    this.isVotedVisibal = true
  }

  @action hideVoted = () => {
    this.isVotedVisibal = false
  }

  @action showAwards = () => {
    this.isAwardsVisibal = true
  }

  @action hideAwards = () => {
    this.isAwardsVisibal = false
  }

  @action checkTokens = checkedValue => {
    this.checkedTokens = checkedValue
  }

  @action getTokens = async (limit, offset) => {
    const variables = {
      limit,
      offset
    }
    const body = `
      query getTokens(
        $limit: Int
        $offset: Int
      ){
        tokens(
          limit:$limit
          offset:$offset
        ){
          tokenID
          tokenName
          tokenIntroduction
          tokenAvatar
        }
      }
    `
    let res = await query(body, variables)
    this.tokens = res.tokens
  }

  @action getResults = async () => {
    const variables = {}
    const body = `
      query getResults{
        results{
          tokenID
          tokenName
          tokenIntroduction
          tokenAvatar
          percentage
        }
      }
    `
    let res = await query(body, variables)
    this.results = res.results
  }

  @action doVote = async ({ UID, inviter = 'self', tokenID = [] }) => {
    this.submitLoading = true

    const variables = {
      UID,
      inviter,
      tokenID
    }
    const body = `
      mutation doVote(
        $UID: String!
        $inviter: String
        $tokenID: [ID]
      ){
        vote(
          UID:$UID
          inviter:$inviter
          tokenID:$tokenID
        ){
          voteSuccess
          voteMessage
        }
      }
    `
    let res = await mutation(body, variables)
    const vote = res.vote

    if (vote.voteSuccess) {
      localStorage['UID'] = UID
      this.UID = UID
      this.getResults()
      this.showResults()
      this.getAward(UID)
    }
    if (
      vote.voteMessage ===
      'A unique constraint would be violated on User. Details: Field name = UID'
    ) {
      this.showVoted()
      this.getAward(UID)
    }

    this.submitLoading = false
    this.hideModal()
  }

  @action getAward = async UID => {
    this.awardLoading = true

    const variables = {
      UID
    }
    const body = `
      query getAward(
        $UID: String!
      ){
        myAwards(
          UID:$UID
        ){
          type
          awards
        }
      }
    `
    let res = await query(body, variables)
    const myAwards = Array.isArray(res.myAwards) ? res.myAwards : []

    if (myAwards.length === 0) {
      message.warn('您的UID还没有投票，请先投票')
    } else {
      this.awards = res.myAwards
      this.getResults()
      localStorage['UID'] = UID
      this.UID = UID
    }

    this.hideAwards()
    this.awardLoading = false
  }
}
