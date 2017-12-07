import React, { PureComponent } from 'react';

const apiLimit = 150;

export default class VideoStats extends PureComponent {
  state = {
    data: [],
    loading: true,
    selectedTimestamp: null,
    selectedSeriesName: null,
  }

  handleTimestampSelect = (selectedTimestamp) => this.setState({ selectedTimestamp });

  handleSeriesNameSelect = (selectedSeriesName) => this.setState({ selectedSeriesName });

  componentDidMount() {
    this.loadData(this.props);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.videoId !== newProps.videoId) {
      this.setState({ loading: true });
    }
    if (newProps !== this.props) {
      this.loadData(newProps);

      const { from } = newProps;
      const { selectedTimestamp } = this.state;
      if (selectedTimestamp && from > selectedTimestamp) {
        this.setState({ selectedTimestamp: from.getTime() });
      }
    }
  }

  loadData = async ({ queryBuilder, videoId, from, to, licenseKey, queryExtension, dataProcessor, count }) => {
    const filters = [['IS_LIVE', 'EQ', true]];

    let query = queryBuilder.count(count)
      .licenseKey(licenseKey)
      .between(from, to)
      .interval('MINUTE')
      .orderBy('FUNCTION', 'DESC')
      .orderBy('MINUTE', 'DESC')

    if (queryExtension) {
      query = queryExtension(query);
    }

    if (videoId) {
      filters.push(['VIDEO_ID', 'EQ', videoId]);
    }

    const filteredQuery = filters.reduce((q, params) => q.filter(...params), query)

    const fetchRows = async (offset = 0) => {
      const { rows } = await filteredQuery
        .limit(apiLimit)
        .offset(offset)
        .query();

      return rows.length === apiLimit ? [...rows, ...await fetchRows(offset + apiLimit)] : rows;
    };

    const rows = await fetchRows();
    const data = rows.sort((a, b) => a[0] - b[0]);

    this.setState({ data, loading: false });
  }

  render() {
    const { data, loading, selectedTimestamp, selectedSeriesName } = this.state;
    const { from, to, children } = this.props;

    return React.Children.map(children, child =>
      React.cloneElement(child, {
        loading,
        data,
        from,
        to,
        selectedTimestamp,
        selectedSeriesName,
        onSelectTimestamp: this.handleTimestampSelect,
        onSelectSeriesName: this.handleSeriesNameSelect,
      })
    );
  }
}
