import React, { PureComponent} from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class VideoSelect extends PureComponent {
  state = {
    videoIds: [],
  }

  componentDidMount() {
    this.loadVideos();
  }

  componentDidUpdate(prevProps, prevState) {
    const stateChanged = (attr) => prevState[attr] !== this.state[attr];

    if (stateChanged('from') || stateChanged('to')) {
      this.loadVideos();
    }
  }

  loadVideos = async () => {
    const { queryBuilder, from, to, licenseKey } = this.props;
    const { rows } = await queryBuilder.count('USER_ID')
      .licenseKey(licenseKey)
      .between(from, to)
      .filter('IS_LIVE', 'EQ', true)
      .groupBy('VIDEO_ID')
      .query();

    const videoIds = rows.map(row => row[0]);

    this.setState({ videoIds });
  }

  render () {
    const { videoIds } = this.state;
    const { currentVideoId, handleVideoIdChange, disabled } = this.props
    const videoIdOptions = [
      { key: '', value: 'All' },
      ...videoIds.map(id => ({ key: id, value: id }))
    ]

    return (
      <FormGroup controlId="videoIdSelectGroup">
        <ControlLabel>Video</ControlLabel>
        <FormControl
          componentClass="select"
          placeholder="select"
          value={currentVideoId}
          onChange={handleVideoIdChange}
          disabled={disabled}
        >
          {videoIdOptions.map(({ key, value }) =>
            <option value={key} key={key}>
              {value}
            </option>)}
        </FormControl>
      </FormGroup>
    );
  }
}
