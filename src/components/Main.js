import React, { Component } from 'react';
import Bitmovin from 'bitmovin-javascript';
import { Panel } from 'react-bootstrap';
import LicenseKeySelect from './LicenseKeySelect.js';
import VideoSelect from './VideoSelect.js';
import VideoStats from './VideoStats.js';
import UserChart from './UserChart.js';
import ErrorChart from './ErrorChart.js';
import BufferingChart from './BufferingChart.js';
import ErrorTable from './ErrorTable.js';
import PeriodSelect from './PeriodSelect.js';
import calcDate, { minutes, seconds } from '../calcDate.js';
import './Main.css';

const currentTimeInterval = (period) => {
  const to = new Date();
  to.setSeconds(0);
  to.setMilliseconds(0);

  return { from: calcDate(to, - period), to }
};

const defaultPeriod = 15 * minutes;

export default class Main extends Component {
  state = {
    queryBuilder: new Bitmovin({ apiKey: this.props.apiKey }).analytics.queries.builder,
    userCounts: [],
    errorCounts: [],
    currentVideoId: '',
    currentPeriod: defaultPeriod,
    ...currentTimeInterval(defaultPeriod),
  };

  componentDidMount() {
    setInterval(this.tickData, 30 * seconds);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPeriod !== this.state.currentPeriod) {
      this.tickData();
    }
  }

  tickData = () => this.setState(currentTimeInterval(this.state.currentPeriod));

  currentLicenseKey = () => {
    const currentLicenseKey = localStorage.getItem('licenseKey');
    const { licenses } = this.props;
    const { licenseKey } = licenses.find(l => l.licenseKey === currentLicenseKey) || licenses[0];

    if (licenseKey !== currentLicenseKey) {
      this.setLicenseKey(licenseKey);
    }

    return licenseKey;
  }

  setLicenseKey = (licenseKey) => {
    localStorage.setItem('licenseKey', licenseKey);
    this.forceUpdate();
  }

  handleLicenseChange = (event) => this.setLicenseKey(event.currentTarget.value)

  handleVideoIdChange = (event) =>
    this.setState({ currentVideoId: event.currentTarget.value });

  handlePeriodChange = (event) => this.setState({ currentPeriod: event.currentTarget.value });

  render() {
    const { licenses } = this.props;
    const { queryBuilder, currentVideoId, currentPeriod, videoIds, from, to } = this.state;
    const currentLicenseKey = this.currentLicenseKey();

    return (
      <div className="Main">
        {licenses.length > 1 && <LicenseKeySelect
          currentLicenseKey={currentLicenseKey}
          handleLicenseChange={this.handleLicenseChange}
          licenses={licenses}
        />}
        <Panel>
          <form>
            <div className="Main-titleRow">
              <h1>Livestream monitoring</h1>
              <div className="Main-selects">
                <PeriodSelect
                  currentPeriod={currentPeriod}
                  handlePeriodChange={this.handlePeriodChange}
                />
                <VideoSelect
                  queryBuilder={queryBuilder}
                  licenseKey={currentLicenseKey}
                  currentVideoId={currentVideoId}
                  handleVideoIdChange={this.handleVideoIdChange}
                  videoIds={videoIds}
                  from={from}
                  to={to}
                />
              </div>
            </div>
            <VideoStats
              queryBuilder={queryBuilder}
              licenseKey={currentLicenseKey}
              videoId={currentVideoId}
              from={from}
              to={to}
              count="USER_ID"
            >
              <UserChart />
            </VideoStats>
            <VideoStats
              queryBuilder={queryBuilder}
              licenseKey={currentLicenseKey}
              videoId={currentVideoId}
              from={from}
              to={to}
              count="USER_ID"
              queryExtension={(query) => query.filter('BUFFERED', 'GT', 0)}
            >
              <BufferingChart />
            </VideoStats>
            <VideoStats
              queryBuilder={queryBuilder}
              licenseKey={currentLicenseKey}
              videoId={currentVideoId}
              from={from}
              to={to}
              count="IMPRESSION_ID"
              queryExtension={(query) => query.groupBy('ERROR_CODE').filter('ERROR_CODE', 'GT', 0)}
            >
              <ErrorChart />
              <ErrorTable />
            </VideoStats>
          </form>
        </Panel>
      </div>
    );
  }
}
