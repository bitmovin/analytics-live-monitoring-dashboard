import React, { Component } from 'react';
import queryString from 'query-string';
import Bitmovin from 'bitmovin-javascript';
import { Panel, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import './Authenticated.css';

export default class Authenticated extends Component {
  state = {
    signingIn: true,
    signedIn: false,
    licenses: [],
  }

  constructor() {
    super();
    this.signIn();
  }

  apiKey = () => queryString.parse(window.location.search).apiKey;

  signIn = async () => {
    const bitmovin = new Bitmovin({ apiKey: this.apiKey() });
    try {
      const licensesList = await bitmovin.analytics.licenses.list();
      const licenses = licensesList.items;
      this.setState({ licenses, signedIn: true, signingIn: false });
    } catch (e) {
      this.setState({ signedIn: false, signingIn: false });
    }
  }

  render() {
    const { signedIn, signingIn, licenses } = this.state;

    if (signedIn) {
      return React.Children.map(this.props.children, (child) =>
        React.cloneElement(child, { licenses, apiKey: this.apiKey() })
      );
    }

    if (signingIn) {
      return (
        <div className="Authenticated-loading">
          Loading …
        </div>
      );
    }

    // remaining case: not logged in
    const apiKey = this.apiKey();
    const loginFailed = apiKey && apiKey.length > 0;
    const validationState = loginFailed ? 'error' : null;
    const error = loginFailed ? "Please check your API key." : null;

    return (
      <Panel header="Sign in" className="Authenticated-login">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={validationState}
          >
            <ControlLabel>Your API key</ControlLabel>
            <FormControl
              type="text"
              placeholder="Bitmovin API key"
              name="apiKey"
            />
            <FormControl.Feedback />
            {error && <HelpBlock>{error}</HelpBlock>}
          </FormGroup>
          <Button bsStyle="primary" type="submit">Sign in</Button>
        </form>
      </Panel>
    );
  }
}
