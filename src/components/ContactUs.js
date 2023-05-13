import React, { Component } from 'react';
export default class ContactUs extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="contact">
          <div className="row section-head">
            <div className="ten columns">
              <p className="lead">
              Feel Free to Contact me Using Any of the Provided Information and Links
              </p>
            </div>
          </div>
          <div className="row">
            <aside className="eigth columns footer-widgets">
              <div className="widget">
                <h4>Email:
                  {resumeData.linkedinId}
                </h4>
                <h4>Phone Number:
                  {resumeData.phoneNumber}
                </h4>
              </div>
            </aside>
          </div>
        </section>
        );
  }
}