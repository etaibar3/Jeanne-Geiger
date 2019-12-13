import React, { Component } from 'react'
import './styles.css'
import { render } from 'react-dom'

const COMMUNITY_LIST_URL = 'http://127.0.0.1:8000/api/communities/'
const VICTIM_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTHighRiskVictimInfo/'
const ABUSER_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTHighRiskAbuserInfo/'
const RISK_FACTOR_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTRiskFactorCounts/'
const OUTCOME_INFO_URL = 'http://127.0.0.1:8000/api/DVHRTCriminalJusticeOutcomes/'

class adminViewSite extends React.Component {
  constructor () {
    super()
    this.state = {
      victim_info: [],
      abuser_info: [],
      risk_factor_info: [],
      outcome_info: [],
      community_list: [],
      community_id: []
    }
  }

  componentDidMount () {
    fetch(COMMUNITY_LIST_URL
    ).then(results => {
      return results.json()
    }).then(data => this.setState({ community_list: data }))
  }

  doSetState (tabName, data) {
    if (tabName === 'Victim') {
      this.setState({ victim_info: data })
    } else if (tabName === 'Abuser') {
      this.setState({ abuser_info: data })
    } else if (tabName === 'RiskFactors') {
      this.setState({ risk_factor_info: data })
    } else { // tabName == 'Outcomes'
      this.setState({ outcome_info: data })
    }
  }

  getTabInfo (tabName, url) {
    var i, tabcontent, tablinks

    fetch(
      url, {
        headers: {
          communityid: this.state.community_id
        }
      }
    ).then(results => {
      return results.text()
    }).then(text => {
      this.doSetState(tabName, JSON.parse(text))
    })

    // Get all elements with class='tabcontent' and hide them
    tabcontent = document.getElementsByClassName('tabcontent')
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none'
    }

    // Get all elements with class='tablinks' and remove the class 'active'
    tablinks = document.getElementsByClassName('tablinks')
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '')
    }

    // Show the current tab, and add an 'active' class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block'
    // evt.currentTarget.className += ' active';
  }

  getCommunity (comId) {
    document.getElementById('community_list').style.display = 'none'
    document.getElementById('tab').style.display = 'block'
    document.getElementById('back_to_com_list').style.display = 'block'
    this.setState({ community_id: comId })
  }

  render () {
    return (
      <div>
        <h1>Viewing a site</h1>
        <div id='community_list'>
          <ul className="community_list">
            {this.state.community_list.map(listitem => (
              <li key={listitem.community_id}>
                <button type='button' onClick={() => this.getCommunity(listitem.community_id)}>{listitem.community_name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div id='back_to_com_list'>
          <button type='button' onClick={() => window.location.reload()}> View another community</button>
        </div>
        <div id='tab'>
          <button className='tablinks' onClick={() => this.getTabInfo('Victim', VICTIM_INFO_URL)}>Victim</button>
          <button className='tablinks' onClick={() => this.getTabInfo('Abuser', ABUSER_INFO_URL)}>Abuser</button>
          <button className='tablinks' onClick={() => this.getTabInfo('RiskFactors', RISK_FACTOR_INFO_URL)}>Risk Factors</button>
          <button className='tablinks' onClick={() => this.getTabInfo('Outcomes', OUTCOME_INFO_URL)}>Outcomes</button>
        </div>

        <div id='Victim' className='tabcontent'>
          <h2>DVHRT High Risk Abuser Information</h2>
          <h4>Gender</h4>
          <table>
            <thead>
              <tr>
                <th>Female</th>
                <td>{this.state.victim_info.Female}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Male</th>
                <td>{this.state.victim_info.Male}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Other</th>
                <td>{this.state.victim_info.Other}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Total Count</th>
                <td>{this.state.victim_info['Total Gender Count']}</td>
              </tr>
            </thead>
          </table>
          <h4>Race/Ethnicity</h4>
          <table>
            <thead>
              <tr>
                <th>American Indian/Alaska Native</th>
                <td>{this.state.victim_info['American Indian/Alaska Native']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Asian</th>
                <td>{this.state.victim_info.Asian}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Black/African American</th>
                <td>{this.state.victim_info['Black/African American']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Hispanic or Latino</th>
                <td>{this.state.victim_info['Hispanic or Latino']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Native Hawaiian/Pacific Islander</th>
                <td>{this.state.victim_info['Native Hawaiian/Pacific Islander']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>White</th>
                <td>{this.state.victim_info.White}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Unknown</th>
                <td>{this.state.victim_info['Other/Unknown']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Total</th>
                <td>{this.state.victim_info['Total Ethnicity Count']}</td>
              </tr>
            </thead>
          </table>
          <h4>Domestic Violence Service Utilization</h4>
          <table>
            <thead>
              <tr>
                <th>Connection To Domestic Violence Services</th>
                <td>{this.state.victim_info.connection_to_domestic_violence_services}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Engagement In Ongoing Domestic Violence Services</th>
                <td>{this.state.victim_info.engagement_in_ongoing_domestic_violence_services}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div id='Abuser' className='tabcontent'>
          <h2>DVHRT High Risk Victim Information</h2>
          <h4>Gender</h4>
          <table>
            <thead>
              <tr>
                <th>Female</th>
                <td>{this.state.abuser_info.Female}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Male</th>
                <td>{this.state.abuser_info.Male}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Other</th>
                <td>{this.state.abuser_info.Other}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Total Count</th>
                <td>{this.state.abuser_info['Total Gender Count']}</td>
              </tr>
            </thead>
          </table>
          <h4>Race/Ethnicity</h4>
          <table>
            <thead>
              <tr>
                <th>American Indian/Alaska Native</th>
                <td>{this.state.abuser_info['American Indian/Alaska Native']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Asian</th>
                <td>{this.state.abuser_info.Asian}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Black/African American</th>
                <td>{this.state.abuser_info['Black/African American']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Hispanic or Latino</th>
                <td>{this.state.abuser_info['Hispanic or Latino']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Native Hawaiian/Pacific Islander</th>
                <td>{this.state.abuser_info['Native Hawaiian/Pacific Islander']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>White</th>
                <td>{this.state.abuser_info.White}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Unknown</th>
                <td>{this.state.abuser_info['Other/Unknown']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Total</th>
                <td>{this.state.abuser_info['Total Ethnicity Count']}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div id='RiskFactors' className='tabcontent'>
          <h2>Risk Factors Presents In DVHRT Cases</h2>
          <table>
            <thead>
              <tr>
                <th>Has he/she tried to kill you?</th>
                <td>{this.state.risk_factor_info.attempted_murder}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Has he/she ever tried to choke (strangle) you?</th>
                <td>{this.state.risk_factor_info.attempted_choke}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Has he/she choked (strangled) you multiple times?</th>
                <td>{this.state.risk_factor_info.multiple_choked}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Does he/she own a gun?</th>
                <td>{this.state.risk_factor_info.owns_gun}</td>
              </tr>
            </thead>
          </table>
        </div>
        <div id='Outcomes' className='tabcontent'>
          <h2>Criminal Justice Outcomes In DVHRT Cases</h2>
          <h4>Charges Filed At Or After Case Acceptance</h4>
          <table>
            <thead>
              <tr>
                <th>Police Response: Charges Filed</th>
                <td>{this.state.outcome_info['Police Response: Charges Filed']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Police Response: No Charges Filed</th>
                <td>{this.state.outcome_info['Police Response: No Charges Filed']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>No Police Response: Not Applicable</th>
                <td>{this.state.outcome_info['No Police Response: Not Applicable']}</td>
              </tr>
            </thead>
          </table>
          <h4>Pretrial Hearing Outcome In DVHRT Cases</h4>
          <table>
            <thead>
              <tr>
                <th>Released on Bail</th>
                <td>{this.state.outcome_info['Released on Bail']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Released on Personal Recognizance</th>
                <td>{this.state.outcome_info['Released on Personal Recognizance']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Detained/Pretrial Detention Statute</th>
                <td>{this.state.outcome_info['Detained/Pretrial Detention Statute']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Detained/Bail Unmet</th>
                <td>{this.state.outcome_info['Detained/Bail Unmet']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Detained/Other</th>
                <td>{this.state.outcome_info['Detained/Other']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pending Pretrial Hearing</th>
                <td>{this.state.outcome_info['Pending Pretrial Hearing']}</td>
              </tr>
            </thead>
          </table>
          <h4>Disposition Outcomes In DVHRT Cases</h4>
          <table>
            <thead>
              <tr>
                <th>Charges Dismissed</th>
                <td>{this.state.outcome_info['Charges Dismissed']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Not Guilty</th>
                <td>{this.state.outcome_info['Not Guilty']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Deferred Adjudication</th>
                <td>{this.state.outcome_info['Deferred Adjudication']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Plead/Found Guilty</th>
                <td>{this.state.outcome_info['Plead/Found Guilty']}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pending Disposition</th>
                <td>{this.state.outcome_info['Pending Disposition']}</td>
              </tr>
            </thead>
          </table>
          <h4>Sentencing Outcomes In DVHRT Cases</h4>
          <table>
            <thead>
              <tr>
                <th>Incarceration</th>
                <td>{this.state.outcome_info.Incarceration}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Probation</th>
                <td>{this.state.outcome_info.Probation}</td>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Incarceration Followed by Probation</th>
                <td>{this.state.outcome_info['Incarceration Followed by Probation']}</td>
              </tr>
            </thead>
          </table>
        </div>

      </div>
    )
  }
}

export default adminViewSite
